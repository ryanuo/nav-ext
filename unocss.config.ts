import { defineConfig } from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      cdn: 'https://esm.sh/',
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  content: {
    pipeline: {
      include: [
        '**/*.html',
        '**/*.ts',
        '**/*.vue',
        '**/*.js',
        '**/*.jsx',
      ],
    },
  },
})
