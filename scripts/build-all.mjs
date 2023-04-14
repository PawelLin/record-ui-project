import path from 'path'
import { fileURLToPath, URL } from 'node:url'
import { build } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const resolve = dir => path.resolve(__dirname, dir)

;(async () => {
    await build({
        publicDir: false,
        build: {
            outDir: resolve('../dist'),
            sourcemap: true,
            lib: {
                entry: resolve('../lib/index.js'),
                name: 'RecordUI',
                fileName: 'index'
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    globals: {
                        vue: 'Vue'
                    }
                }
            }
        }
    })
})()
