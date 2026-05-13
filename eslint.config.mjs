import nextConfig from 'eslint-config-next/core-web-vitals'

const config = [
  {
    ignores: [
      '.tmp/**',
      '**/.git/**',
      '**/.hg/**',
      '**/.pnp.*',
      '**/.svn/**',
      '**/.yarn/**',
      '**/build/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/temp/**',
      'playwright.config.ts',
      'jest.config.js',
    ],
  },
  ...nextConfig,
  {
    rules: {
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default config
