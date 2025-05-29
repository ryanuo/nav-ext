// seoConfig.ts

import type { HtmlTagDescriptor } from 'vite'

export const seoConfig: HtmlTagDescriptor[] = [
  { // 仅开发环境注入模拟脚本
    tag: 'script',
    injectTo: 'body-prepend',
    children: 'if(!window.chrome?.runtime)(()=>{window.chrome={runtime:{id:\'development-mode\',getURL:path=>path,onMessage:{addListener:()=>{},removeListener:()=>{}}},storage:{local:{get:keys=>Promise.resolve({}),set:items=>Promise.resolve()}}}})();',
  },
  {
    tag: 'link',
    injectTo: 'head-prepend', // 插入到 <head> 开始位置
    attrs: {
      rel: 'icon',
      href: '/favicon.ico', // 确保文件存在于 public 目录
    },
  },
  {
    tag: 'meta',
    injectTo: 'head-prepend',
    attrs: {
      name: 'description',
      content: 'N-Tab is a lightweight browser tab extension that offers time display, search suggestions, search engine switching, quick translation, and customizable themes.',
    },
  },
  {
    tag: 'meta',
    injectTo: 'head-prepend',
    attrs: {
      name: 'keywords',
      content: 'browser extension, tab manager, time display, search suggestions, search engine switcher, quick translation, theme configuration, productivity tools',
    },
  },
  {
    tag: 'meta',
    injectTo: 'head-prepend',
    attrs: {
      name: 'author',
      content: 'ryanuo',
    },
  },
  {
    tag: 'meta',
    injectTo: 'head-prepend',
    attrs: {
      property: 'og:title',
      content: 'N-Tab | Fast, Simple & Smart',
    },
  },
  {
    tag: 'meta',
    injectTo: 'head-prepend',
    attrs: {
      property: 'og:description',
      content: 'N-Tab is a lightweight browser tab extension that offers time display, search suggestions, search engine switching, quick translation, and customizable themes.',
    },
  },
  {
    tag: 'meta',
    injectTo: 'head-prepend',
    attrs: {
      property: 'og:image',
      content: '/path_to_your_image.png', // 图像路径
    },
  },
  {
    tag: 'meta',
    injectTo: 'head-prepend',
    attrs: {
      property: 'og:url',
      content: 'https://tab.ryanuo.cc',
    },
  },
  {
    tag: 'meta',
    injectTo: 'head-prepend',
    attrs: {
      name: 'twitter:title',
      content: 'N-Tab | Fast, Simple & Smart',
    },
  },
  {
    tag: 'meta',
    injectTo: 'head-prepend',
    attrs: {
      name: 'twitter:description',
      content: 'N-Tab is a lightweight browser tab extension that offers time display, search suggestions, search engine switching, quick translation, and customizable themes.',
    },
  },
  {
    tag: 'meta',
    injectTo: 'head-prepend',
    attrs: {
      name: 'twitter:image',
      content: '/preview.png', // 图像路径
    },
  },
  {
    tag: 'meta',
    injectTo: 'head-prepend',
    attrs: {
      name: 'twitter:card',
      content: 'summary_large_image', // Twitter 卡片样式
    },
  },
]
