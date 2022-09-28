import { defineConfig } from 'vite'
import { rmSync } from 'fs'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'
import electron, { onstart } from 'vite-plugin-electron'

rmSync('dist', { recursive: true, force: true })

export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron/main/index.js',
        vite: {
          build: {
            sourcemap: true,
            outDir: 'dist/electron/main'
          },
          plugins: [process.env.VSCODE_DEBUG ? onstart() : null]
        }
      },
      preload: {
        input: {
          index: join(__dirname, 'electron/preload/index.js')
        },
        vite: {
          build: {
            sourcemap: 'inline',
            outDir: 'dist/electron/preload'
          }
        }
      },
      renderer: {}
    })
  ],
  server: {
    host: '127.0.0.1',
    port: 5173
  }
})
