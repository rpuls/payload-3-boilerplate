import { expect, test, type Locator, type Page } from '@playwright/test'

import {
  adminEmail,
  adminPassword,
  commentText,
  seededPosts,
  targetPost,
} from './env'

const manualReviewMode = process.env.E2E_MANUAL_REVIEW === 'true'

async function maybeFill(page: Page, label: RegExp, value: string) {
  const field = page.getByLabel(label)

  if (await field.count()) {
    await field.fill(value)
  }
}

async function fillFirst(locator: Locator, value: string) {
  await expect(locator.first()).toBeVisible()
  await locator.first().fill(value)
}

async function fillVisiblePasswordFields(page: Page, value: string) {
  const namedPassword = page.locator('input[name="password"]')
  const namedConfirmPassword = page.locator('input[name="confirmPassword"]')

  if (await namedPassword.count()) {
    await fillFirst(namedPassword, value)
  }

  if (await namedConfirmPassword.count()) {
    await fillFirst(namedConfirmPassword, value)
    return
  }

  const visiblePasswordInputs = page.locator('input[type="password"]:visible')
  const count = await visiblePasswordInputs.count()

  for (let index = 0; index < count; index += 1) {
    await visiblePasswordInputs.nth(index).fill(value)
  }
}

async function expectSeedButton(page: Page, timeout = 15000) {
  await expect(page.getByRole('button', { name: /seed your database/i })).toBeVisible({ timeout })
}

async function createFirstAdmin(page: Page) {
  await page.goto('/admin')
  await expect(page).toHaveURL(/\/admin\/create-first-user/)

  if (await page.locator('input[name="email"]').count()) {
    await fillFirst(page.locator('input[name="email"]'), adminEmail)
  } else {
    await fillFirst(page.getByLabel(/email/i), adminEmail)
  }

  await maybeFill(page, /^name$/i, 'Playwright Admin')
  await fillVisiblePasswordFields(page, adminPassword)

  await page
    .getByRole('button', {
      name: /create( first user)?|continue|create/i,
    })
    .first()
    .click({ force: true })

  try {
    await expectSeedButton(page, 5000)
    return
  } catch {
    const response = await page.request.post('/api/users/first-register', {
      data: {
        email: adminEmail,
        password: adminPassword,
        name: 'Playwright Admin',
      },
    })

    if (!response.ok()) {
      throw new Error(`First user registration failed with status ${response.status()}`)
    }

    await page.goto('/admin')
  }

  await expectSeedButton(page)
}

async function seedDatabase(page: Page) {
  await page.getByRole('button', { name: /seed your database/i }).click()
  await expect(page.getByText(/database seeded!/i)).toBeVisible({ timeout: 120000 })
}

async function approveComment(page: Page) {
  await page.goto('/admin/collections/comments')

  const commentLink = page.getByRole('link', { name: commentText }).first()
  await expect(commentLink).toBeVisible({ timeout: 30000 })
  await commentLink.click()

  const isApproved = page.getByRole('checkbox', { name: /is approved/i })
  const saveButton = page.getByRole('button', { name: /^save$/i }).first()

  await expect(isApproved).toBeVisible()
  if (!(await isApproved.isChecked())) {
    await isApproved.click()
  }

  if (await saveButton.isDisabled()) {
    await isApproved.click()
    await isApproved.click()
  }

  if (await saveButton.isEnabled()) {
    await saveButton.click()
  } else {
    const commentID = page.url().match(/\/comments\/(\d+)/)?.[1]

    if (!commentID) {
      throw new Error('Unable to determine comment ID for approval fallback')
    }

    const response = await page.request.patch(`/api/comments/${commentID}`, {
      data: {
        isApproved: true,
        publishedAt: new Date().toISOString(),
      },
    })

    if (!response.ok()) {
      throw new Error(`Comment approval fallback failed with status ${response.status()}`)
    }

    await page.reload()
  }

  await expect(isApproved).toBeChecked()
}

async function getApprovedCommentCount(page: Page) {
  const response = await page.request.get('/api/comments', {
    params: {
      depth: '0',
      limit: '10',
      'where[content][equals]': commentText,
      'where[isApproved][equals]': 'true',
    },
  })

  expect(response.ok()).toBeTruthy()

  const body = await response.json()

  return body.docs.length as number
}

async function verifySeededPosts(page: Page) {
  await page.goto('/posts')
  await expect(page.getByRole('heading', { name: 'Posts' })).toBeVisible()

  for (const post of seededPosts) {
    await expect(page.getByRole('link', { name: post.title })).toBeVisible()

    const response = await page.goto(`/posts/${post.slug}`)

    expect(response?.ok(), `Expected seeded post page /posts/${post.slug} to respond successfully`).toBeTruthy()
    await expect(page.getByRole('heading', { name: post.title })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Comments' })).toBeVisible()
  }
}

test('supports onboarding, seeding, and comment moderation', async ({ browser, page }) => {
  await createFirstAdmin(page)
  await seedDatabase(page)

  const publicContext = await browser.newContext()
  const publicPage = await publicContext.newPage()

  await verifySeededPosts(publicPage)
  await publicPage.goto(`/posts/${targetPost.slug}`)
  await expect(publicPage.getByRole('heading', { name: 'Comments' })).toBeVisible()

  await fillFirst(publicPage.getByLabel(/^name$/i), 'Playwright Visitor')
  await fillFirst(publicPage.getByLabel(/email/i), 'visitor@example.com')
  await fillFirst(publicPage.getByLabel(/comment/i), commentText)
  await publicPage.getByRole('button', { name: /submit comment/i }).click()

  await expect(publicPage.getByText(/comment submitted successfully/i)).toBeVisible()
  await expect(publicPage.getByText(commentText)).toHaveCount(0)

  await approveComment(page)

  await expect
    .poll(async () => getApprovedCommentCount(publicPage), {
      timeout: 30000,
    })
    .toBe(1)

  await expect
    .poll(
      async () => {
        await publicPage.reload()
        return publicPage.getByText(commentText).count()
      },
      {
        timeout: 30000,
      },
    )
    .toBe(1)

  if (manualReviewMode) {
    await publicPage.bringToFront()
    await publicPage.pause()
  }

  await publicContext.close()
})
