# AGENTS.md

This file defines the working rules for automated agents in this repository.

## Core Principles

- Prefer maintainable fixes over shortcuts.
- Do not use broad or heavy dependency overrides as a primary solution.
- Keep the project on properly updated direct dependencies whenever possible.
- Treat end-to-end verification as mandatory for meaningful changes.

## Dependency Rules

- Use `pnpm` for package management.
- Prefer updating direct dependencies in `package.json` over forcing transitive versions with `pnpm.overrides`.
- Only use `pnpm.overrides` as a last resort when there is no reasonable upstream or direct-dependency fix.
- If an override is truly unavoidable, keep it narrowly scoped, document why, and remove it as soon as upstream allows.
- When updating Payload packages, keep the Payload package family aligned on the same version.
- When updating `payload`, also update the documented version in `README.md` in the `Version Info` section during the same change.
- Do not leave misleading version notes in the README. Documentation must match the actual dependency state.

## Branching And Release Rules

- Never push directly to `master`.
- Push agent work to `staging` only.
- A human is responsible for merging to `master`.
- If asked to publish work, prefer `staging` unless the human explicitly instructs otherwise.
- Do not rewrite `master` history.

## Testing Rules

- Run relevant tests after changes.
- For changes that affect app behavior, dependency upgrades, build tooling, auth, admin flows, seeding, comments, routing, or rendering, run the Playwright end-to-end suite.
- Use `corepack pnpm test:e2e` as the default verification command for those changes.
- If the task affects the visible browser flow and manual inspection is useful, use `corepack pnpm test:e2e:headed` or `corepack pnpm test:e2e:manual`.
- Do not claim success without stating what was actually run.

## E2E And App Workflow Rules

- Keep the Docker-based PostgreSQL flow working for e2e tests.
- Do not break the admin onboarding flow.
- Preserve the seeded-content workflow and the comment approval flow unless the task explicitly changes them.
- Seed behavior for e2e must stay deterministic.
- Production seeding must not be silently changed to test-only behavior.

## Audit And Security Rules

- When addressing audit warnings, first try proper dependency upgrades.
- Prefer upstream-supported versions over local workaround pinning.
- If warnings remain after proper upgrades, identify whether they are upstream transitives and report that clearly.
- Do not hide unresolved advisories with sloppy shortcuts.

## Documentation Rules

- Update `README.md` when setup, test commands, version info, or important workflow expectations change.
- When changing Payload versions, update the README version entry immediately.
- Keep command examples aligned with the actual recommended workflow, especially `pnpm` usage and e2e commands.

## Change Safety Rules

- Avoid destructive git operations unless explicitly requested.
- Do not revert unrelated user changes.
- Keep fixes minimal, intentional, and project-specific.
- If a framework or dependency upgrade requires code changes, make the compatibility changes explicitly instead of papering over the problem.

## Preferred Verification Commands

- Install dependencies: `corepack pnpm install`
- Rebuild native dependencies if needed: `corepack pnpm deps:native`
- Run e2e: `corepack pnpm test:e2e`
- Run headed e2e: `corepack pnpm test:e2e:headed`
- Run manual-review e2e: `corepack pnpm test:e2e:manual`
- Check audit state: `corepack pnpm audit --json`

## Final Reminder

- Keep the repo maintainable.
- Keep the README honest.
- Push to `staging`.
- Let the human merge to `master`.
