<script setup lang="ts">
import { useTimeStore } from '~/store/option/settings'
import logo from '~/assets/logo.png?url'
import { useDateTime } from '~/composables/useDateTime'
import { createComputed } from '~/composables/useSettingsModels'
import { useReactiveStorage } from '~/composables/useReactiveStorage'

const { data } = useReactiveStorage<boolean>('enableWebMode', false)

const newTabUrl = computed(() => {
  if (data.value)
    return 'https://tab.ryanuo.cc'
  else
    return 'chrome://newtab'
})

const appVersion = __APP_VERSION__

const timeStore = useTimeStore()
const { currentDateTime } = useDateTime()
// Declare chrome as a global variable for TypeScript
declare const chrome: any

function openNewTab() {
  if (chrome?.tabs?.create) {
    chrome.tabs.create({ url: newTabUrl.value })
  }
}

const enableWebMode = createComputed(
  () => data.value,
  (val: boolean) => data.value = val,
)
</script>

<template>
  <main class="relative w-[200px] bg-white px-4 py-5 text-center text-gray-700 transition-colors duration-300 dark:bg-[#181a20] dark:text-gray-100">
    <!-- 右上角 Logo -->
    <div class="absolute right-3 top-2 cursor-pointer" @click="openNewTab">
      <img class="h-5 w-5 transition-all hover:scale-105" :src="logo">
    </div>

    <!-- 原有内容保持不变 -->
    <Logo class="mx-auto mb-2" />
    <div class="mb-3">
      <span class="text-2xl font-bold">{{ currentDateTime }}</span>
      <span class="ml-2 text-xs text-gray-400 dark:text-gray-500">{{ timeStore.timezone || '本地' }}</span>
    </div>

    <div class="my-2 flex items-center justify-between gap-2">
      <span>{{ $t('popup.openWebMode') }}</span>
      <Toggle v-model="enableWebMode as any" label="" />
    </div>

    <div class="mt-1 text-xs text-gray-400 dark:text-gray-500">
      <a href="https://github.com/ryanuo/nav-ext" target="_blank" rel="noopener">
        v{{ appVersion }}
        <span class="i-cib-github ml-1" />
        ryanuo
      </a>
    </div>
  </main>
</template>
