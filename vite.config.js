import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'

const kebabCase = key => {
    const result = key.replace(/([A-Z])/g, ' $1').trim()
    return result.split(' ').join('-').toLowerCase()
}

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: true
    },
    plugins: [
        vue(),
        vueJsx(),
        // Components({
        //     resolvers: [
        //         name => {
        //             if (name.startsWith('Record')) {
        //                 const partialName = name.slice(6)
        //                 return {
        //                     name: partialName,
        //                     from: '../dist',
        //                     sideEffects: `../dist/${kebabCase(partialName)}/style.css`
        //                 }
        //             }
        //         }
        //     ]
        // })
    ],
})
