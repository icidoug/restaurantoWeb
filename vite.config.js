import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
    server: { https: true },
    plugins: [mkcert(), vue()],
    resolve: {
        alias: [
            {
                find: /@\/components\/((?!.*[.](ts|js|tsx|jsx|vue)$).*$)/,
                replacement: fileURLToPath(
                    new URL("./src/components/$1/index.vue", import.meta.url)
                ),
            },
            {
                find: /@\/views\/((?!.*[.](ts|js|tsx|jsx|vue)$).*$)/,
                replacement: fileURLToPath(
                    new URL("./src/views/$1/index.vue", import.meta.url)
                ),
            },
            {
                find: "@",
                replacement: fileURLToPath(new URL("./src", import.meta.url)),
            },
        ]
    }
})
