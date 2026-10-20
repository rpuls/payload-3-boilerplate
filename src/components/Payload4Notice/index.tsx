import { Button } from '@payloadcms/ui'
import React from 'react'

import './index.scss'

const baseClass = 'payload-4-notice'

const deployURL = 'https://railway.com/deploy/payload-cms-4-website-beta?referralCode=-Yg50p'
const repoURL = 'https://github.com/rpuls/payload-4-boilerplate'
const migrationGuideURL = 'https://payloadcms.com/docs/beta/migration-guide/v4'

/**
 * Tells new users that this Payload 3 template has a Payload 4 successor, before they invest
 * in Payload 3. Remove it from `admin.components.beforeDashboard` in payload.config.ts once
 * you have read it.
 */
const Payload4Notice: React.FC = () => {
  return (
    <section aria-labelledby={`${baseClass}-title`} className={baseClass}>
      <span className={`${baseClass}__badge`}>New</span>
      <h3 className={`${baseClass}__title`} id={`${baseClass}-title`}>
        Payload 4 is out. Starting a new project? Start there.
      </h3>
      <p>
        Before you dig deep into Payload 3, take a look at the <strong>Payload 4 template</strong>.
        It has the same one-click Railway setup, plus the redesigned Payload 4 admin, a modular
        dashboard, MCP access for AI agents, nested categories, tags and uploads stored in a Railway
        Bucket.
      </p>
      <p>
        This Payload 3 template still gets updates for now, but it will stop being maintained once
        Payload 4 matures. Starting on Payload 4 today saves you a migration later.
      </p>
      <div className={`${baseClass}__actions`}>
        <Button
          buttonStyle="primary"
          el="anchor"
          margin={false}
          newTab
          size="large"
          url={deployURL}
        >
          Deploy the Payload 4 template ↗
        </Button>
        <Button
          buttonStyle="secondary"
          el="anchor"
          margin={false}
          newTab
          size="large"
          url={repoURL}
        >
          View it on GitHub ↗
        </Button>
      </div>
      <p className={`${baseClass}__note`}>
        Already building on Payload 3? No rush. Keep going, and read the{' '}
        <a href={migrationGuideURL} rel="noopener noreferrer" target="_blank">
          Payload 3 to 4 migration guide
        </a>{' '}
        when you are ready to move.
      </p>
    </section>
  )
}

export default Payload4Notice
