<script setup lang="ts">
import { dayjs } from '@ryanuo/utils'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useSettingsStore } from '~/store/option/settings'

const appVersion = __APP_VERSION__

dayjs.extend(utc)
dayjs.extend(timezone)

const settingsStore = useSettingsStore()
const currentTime = computed(() =>
  settingsStore.timezone
    ? dayjs.tz(new Date(), settingsStore.timezone).format('HH:mm')
    : dayjs().format('HH:mm'),
)

// Declare chrome as a global variable for TypeScript
declare const chrome: any

function openNewTab() {
  if (chrome?.tabs?.create) {
    chrome.tabs.create({ url: 'chrome://newtab' })
  }
}
</script>

<template>
  <main class="w-[200px] px-4 py-5 text-center text-gray-700">
    <Logo class="mx-auto mb-2" />
    <div class="mb-3">
      <span class="text-2xl font-bold">{{ currentTime }}</span>
      <span class="ml-2 text-xs text-gray-400">{{ settingsStore.timezone || '本地' }}</span>
    </div>
    <button class="btn mt-2 w-full" @click="openNewTab">
      打开新标签页
    </button>
    <div class="mt-2 text-xs text-gray-400" />
    <div class="mt-1 text-xs text-gray-400">
      <a
        href="https://github.com/ryanuo/nav-ext"
        target="_blank"
        rel="noopener"
      >
        v{{ appVersion }}
        <span class="i-cib-github ml-1" />
        ryanuo
      </a>
    </div>
  </main>
</template>
