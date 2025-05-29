// vite.config.browser.mts
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { seoConfig } from './scripts/seoConfig'
import { r } from './scripts/utils'
import { sharedConfig } from './vite.config.mjs'

export default defineConfig(() => {
  return {
    ...sharedConfig,
    root: r('src/options'),
    publicDir: r('public'),
    define: {
      ...sharedConfig.define,
      __USEEXTENSION__: false,
    },
    build: {
      outDir: '../../dist',
      emptyOutDir: true,
      external: ['useWebExtensionStorage', 'webextension-polyfill'],
      minify: true,
      sourcemap: false,
    },
    plugins: [
      ...(sharedConfig.plugins ?? []),
      // 为了解决webextension-polyfill报错问题
      createHtmlPlugin({
        inject: {
          tags: seoConfig,
        },
      }) as any,
    ],
  }
})
