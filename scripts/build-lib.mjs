import path from 'path'
import { fileURLToPath, URL } from 'node:url'
import { build } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const resolve = dir => path.resolve(__dirname, dir)

;(async () => {
    await build({
        publicDir: false,
        build: {
            outDir: resolve('../dist/circular-progress'),
            sourcemap: true,
            lib: {
                entry: resolve('../lib/circular-progress/index.js'),
                name: 'CircularProgress',
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
    await build({
        publicDir: false,
        build: {
            outDir: resolve('../dist/dandelion-clock'),
            sourcemap: true,
            lib: {
                entry: resolve('../lib/dandelion-clock/index.js'),
                name: 'DandelionClock',
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
    await build({
        publicDir: false,
        build: {
            outDir: resolve('../dist/pie-chart'),
            sourcemap: true,
            lib: {
                entry: resolve('../lib/pie-chart/index.js'),
                name: 'PieChart',
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
