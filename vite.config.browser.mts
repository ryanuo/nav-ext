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
              children: 'if(!window.chrome?.runtime)(()=>{window.chrome={runtime:{id:\'development-mode\',getURL:path=>path,onMessage:{addListener:()=>{},removeListener:()=>{}}},storage:{local:{get:keys=>Promise.resolve({}),set:items=>Promise.resolve()}}}})();',
            } as any,
            {
              tag: 'link',
              injectTo: 'head-prepend', // 插入到 <head> 开始位置
              attrs: {
                rel: 'icon',
                href: '/logo.png', // 确保文件存在于 public 目录
              },
            },
          ],
        },
      }) as any,
    ],
  }
})
