import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import path from 'node:path'
import Config from '../src/Config.json' with { type: 'json' }

const rootDir = path.resolve(import.meta.dirname, '..')
const outDir = path.resolve(rootDir, 'dist')
const srcDir = path.resolve(rootDir, 'src')

export default defineConfig({
    root: srcDir,

    build: {
        sourcemap: false,
        outDir: outDir,
        emptyOutDir: true,
    },

    server: {
        port: 8080,
    },

    plugins: [
        handlebars({
            context: Config,
        }),
    ],
})
