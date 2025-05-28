// vite.config.browser.mts
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
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
    },
    plugins: [
      ...(sharedConfig.plugins ?? []),
      // 为了解决webextension-polyfill报错问题
      createHtmlPlugin({
        inject: {
          tags: [
            { // 仅开发环境注入模拟脚本
              tag: 'script',
              injectTo: 'body-prepend',
              children: `
  if (!window.chrome?.runtime) {
    (function () {
      // 仅在非扩展环境中模拟 chrome
      console.log('模拟 Chrome API 环境')
      window.chrome = {
        runtime: {
          id: 'development-mode', // 模拟ID（不影响实际扩展）
          getURL: (path) => path,
          onMessage: {
            addListener: () => { },
            removeListener: () => { },
          },
          // 其他需要的方法...
        },
        storage: {
          local: {
            get: keys => Promise.resolve({}),
            set: items => Promise.resolve(),
            // 其他需要的方法...
          },
        },
      }
    })()
  }
              `,
            } as any,
            {
              tag: 'link',
              injectTo: 'head-prepend', // 插入到 <head> 开始位置
              attrs: {
                rel: 'icon',
                href: '/logo.svg', // 确保文件存在于 public 目录
              },
            },
          ],
        },
      }) as any,
    ],
  }
})
