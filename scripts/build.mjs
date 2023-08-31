import path from 'path'
import fs from 'fs'
import { fileURLToPath, URL } from 'node:url'
import { build } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const resolve = dir => path.resolve(__dirname, dir)
const distDir = resolve('../dist')
const libDir = resolve('../lib')
;(async () => {
    await build({
        publicDir: false,
        build: {
            outDir: distDir,
            sourcemap: false,
            lib: {
                entry: path.join(libDir, 'index.js'),
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
    fs.readdirSync(libDir).forEach(async name => {
        const componentDir = path.join(libDir, name)
        const isDir = fs.lstatSync(componentDir).isDirectory()
        if (isDir && fs.readdirSync(componentDir).includes('index.js')) {
            const outDir = path.join(distDir, name)
            await build({
                publicDir: false,
                build: {
                    outDir,
                    sourcemap: false,
                    lib: {
                        entry: componentDir,
                        name: name.replace(/([A-Z])/g, '-$1-').slice(1).toLowerCase(),
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
        }
    })
})()
