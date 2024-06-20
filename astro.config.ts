import { defineConfig, type AstroUserConfig } from 'astro/config'
import dotenv from 'dotenv'

import { env } from './util/env'

dotenv.config()

const config: AstroUserConfig = defineConfig({
  server: {
    port: 3002,
    host: true,
    headers: {
      'content-security-policy': env('CSP')
    }
  },
  vite: {
    build: {
      minify: 'esbuild',
      chunkSizeWarningLimit: 2000
    }
  }
})

export default config // eslint-disable-line
