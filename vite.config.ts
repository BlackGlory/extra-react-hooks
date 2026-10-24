import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ]
, resolve: {
    tsconfigPaths: true
  }
, test: {
    globals: true // `@testing-library/react`所必需.
  , browser: {
      enabled: true
    , headless: true
    , provider: playwright()
    , instances: [
        { browser: 'chromium' }
      ]
    }
  }
})
