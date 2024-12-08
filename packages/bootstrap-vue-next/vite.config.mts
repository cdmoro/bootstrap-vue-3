/// <reference types="vitest" />

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import dts from 'vite-plugin-dts'
import Components from 'unplugin-vue-components/vite'

import {readdirSync} from 'node:fs'
import {basename, dirname, extname, join, relative} from 'node:path'
import {copyFile} from 'fs/promises'
import vueDevTools from 'vite-plugin-vue-devtools'

const readFilesInDirectory = (
  dir: string,
  currentDepth: number = 0,
  options: {
    minDepth?: number
    maxDepth?: number
  } = {}
): string[] => {
  const {minDepth = 0, maxDepth = Infinity} = options

  // If current depth exceeds max depth, stop processing
  if (currentDepth > maxDepth) {
    return []
  }

  let result: string[] = []

  const items = readdirSync(dir, {withFileTypes: true})

  for (const item of items) {
    const itemPath = join(dir, item.name)

    if (item.isDirectory()) {
      // Recursively process subdirectories
      if (currentDepth + 1 >= minDepth) {
        result = result.concat(readFilesInDirectory(itemPath, currentDepth + 1, options))
      }
    } else if (item.isFile()) {
      // Collect files if depth is within the range
      if (currentDepth >= minDepth) {
        result.push(itemPath)
      }
    }
  }

  return result
}
const processDirectory = (dirPath: string, baseDir: string): Record<string, string> =>
  readFilesInDirectory(dirPath, undefined, {
    maxDepth: 2,
    minDepth: 1,
  }).reduce(
    (acc, file) => {
      const ext = extname(file)
      const baseName = basename(file, ext)
      const relativePath = relative(__dirname, file)
      const dirPart = relative(dirPath, dirname(file))

      if (
        ext === '.ts' &&
        !file.endsWith('.spec.ts') &&
        !file.includes('/node_modules/') &&
        baseName === 'index'
      ) {
        const key = dirPart ? `${baseDir}/${dirPart}/index` : `${baseDir}/index`
        acc[key] = resolve(__dirname, relativePath)
      }

      return acc
    },
    {} as Record<string, string>
  )

const components = {
  ...processDirectory(resolve(__dirname, 'src/components'), 'src/components'),
  'src/components/index': resolve(__dirname, 'src/components/index.ts'),
}
const plugins = {
  ...processDirectory(resolve(__dirname, 'src/plugins'), 'src/plugins'),
  'src/plugins/index': resolve(__dirname, 'src/plugins/index.ts'),
}
const directives = {
  ...processDirectory(resolve(__dirname, 'src/directives'), 'src/directives'),
  'src/directives/index': resolve(__dirname, 'src/directives/index.ts'),
}
const composables = {
  ...processDirectory(resolve(__dirname, 'src/composables'), 'src/composables'),
  'src/composables/index': resolve(__dirname, 'src/composables/index.ts'),
}

export default defineConfig({
  build: {
    sourcemap: true,
    minify: 'terser',
    lib: {
      entry: {
        'bootstrap-vue-next': resolve(__dirname, 'src/index.ts'),
        'src/resolvers/index': resolve(__dirname, 'src/resolvers/index.ts'),
        'src/utils/index': resolve(__dirname, 'src/utils/index.ts'),
        ...components,
        ...plugins,
        ...directives,
        ...composables,
      },
      name: 'bootstrap-vue-next',
      fileName: (format, entryName) => {
        if (format === 'es') {
          return `${entryName}.mjs`
        } else if (format === 'cjs') {
          return `${entryName}.umd.js`
        }
        return `${entryName}.js`
      },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        exports: 'named',
        assetFileNames: `bootstrap-vue-next.[ext]`, //without this, it generates build/styles.css
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        charset: false,
        silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
      },
    },
  },

  plugins: [
    vueDevTools(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Components({
      dts: false,
    }),
    dts({
      tsconfigPath: './tsconfig.app.json',
      outDir: './dist',
      afterBuild: async () => {
        await Promise.all(
          readFilesInDirectory('./dist/src/')
            .filter((file) => file.endsWith('.d.ts'))
            .map((file) => copyFile(file, file.replace('.d.ts', '.d.mts')))
        )
      },
    }),
  ],

  server: {
    host: true,
  },

  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
