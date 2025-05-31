<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useMarkStore } from '~/store/option/mark'
import { useSettingsStore } from '~/store/option/settings'

const props = defineProps<{
  settingFunction?: () => void
}>()
const markStore = useMarkStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const dockingId = ref<DockingID>('all')
const settingStore = useSettingsStore()

function handleIconClick(item: DockingItem) {
  const { id: idx, link } = item
  if (['all', 'photo'].includes(idx)) {
    markStore.setShowWidget(true)
    dockingId.value = idx
  }

  if (idx === 'theme') {
    toggleDark()
  }

  if (link) {
    window.open(link, '_blank')
  }

  if (idx === 'settings') {
    props.settingFunction?.()
  }
}

const dockingData = computed<DockingItem[]>(() => {
  const themeIcon = !isDark.value ? 'i-twemoji:sun' : 'i-twemoji:first-quarter-moon-face'
  return [
    { id: 'all', name: '所有', icon: 'i-skill-icons-ros-light' },
    { id: 'translate', name: '翻译', icon: 'i-ic-sharp-translate', link: 'https://www.bing.com/translator' },
    { id: 'music', name: '音乐', icon: 'i-twemoji:musical-note', link: 'https://music.163.com/' },
    { id: 'camera', name: '照片', icon: 'i-twemoji:camera' },
    { id: 'settings', name: '设置', icon: 'i-twemoji:gear' },
    { id: 'mail', name: '邮件', icon: 'i-twemoji:e-mail', link: 'https://mail.aliyun.com/' },
    { id: 'video', name: '视频', icon: 'i-logos-youtube-icon', link: 'https://www.bilibili.com/' },
    { id: 'note', name: '笔记', icon: 'i-twemoji-notebook', link: 'https://www.yuque.com/' },
    { id: 'github', name: 'Github', icon: 'i-skill-icons:github-dark', link: 'https://github.com/ryanuo/tab-ext' },
    { id: 'theme', name: '主题', icon: themeIcon },
  ]
})
</script>

<template>
  <div v-if="settingStore.showDocking" class="docking">
    <div
      v-for="(item, index) in dockingData" :key="index"
      class="icon h-10 w-10 flex cursor-pointer items-center justify-center rounded-xl bg-white/80 shadow transition-all duration-200 dark:bg-black/60 hover:bg-white hover:scale-105! dark:hover:bg-black/80"
      @click.stop="handleIconClick(item)"
    >
      <span class="m-2 text-2xl" :class="item.icon" />
    </div>
  </div>
  <Widget :show="markStore.isShowWidget" :idx="dockingId" />
</template>

<style scoped>
.docking {
  @apply fixed bottom-4 left-1/2 z-130 max-w-[calc(100%-40px)] flex translate-x-[-50%] gap-3 rounded-2xl bg-white/30 p-2 shadow-lg backdrop-blur-lg backdrop-brightness-125 backdrop-saturate-150 transition-all duration-250;
  @apply dark:border-white/1 dark:bg-[#23272f]/50 dark:shadow-black/40;
}

.icon {
  animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
