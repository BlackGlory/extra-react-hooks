import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths()
  , react()
  ]
, test: {
    globals: true
  , browser: {
      enabled: true
    , headless: true
    , provider: 'playwright'
    , instances: [
        { browser: 'chromium' }
      ]
    }
  }
})
