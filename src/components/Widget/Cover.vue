<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getUuid } from '@ryanuo/utils'
import { useI18n } from 'vue-i18n'
import { fileStorage } from '~/composables/indexedDB'
import { useCoverStore } from '~/store/option/settings'

defineProps<{
  className?: string
}>()
// 类型定义
type FileType = 'image' | 'video'
interface LocalFile {
  id: string
  name: string
  type: string
  url: string
  file: File
}
const { t } = useI18n()
const localFiles = ref<LocalFile[]>([])
const coverStore = useCoverStore()
const { cover, coverType: tab, coverCustomKey } = storeToRefs(coverStore)
const { setCoverMethod, setCoverType, setCoverCustomKey } = coverStore

const coverUrl = computed({
  get: () => cover.value,
  set: (value: string) => coverStore.setCover(value),
})

// 上传文件
async function handleUpload(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files || !files.length)
    return
  const file = files[0]
  await fileStorage.saveFile(getUuid(), file)
  await loadFiles()
}

// 加载本地文件
async function loadFiles() {
  const all = (await fileStorage.getAllFiles()) as any[]
  localFiles.value = all
    .filter(f => tab.value === 'image'
      ? f.type.startsWith('image/')
      : f.type.startsWith('video/'))
    .map(f => ({
      id: f.id,
      name: f.name,
      type: f.type,
      url: URL.createObjectURL(f.data),
      file: f.data,
    }))
}

// 删除本地文件
async function handleDelete(id: string) {
  await fileStorage.deleteFile(id)
  await loadFiles()
}

onMounted(loadFiles)
watch(tab, loadFiles)

function handleSelected(file: LocalFile) {
  cover.value = file.url
  setCoverMethod('custom')
  setCoverCustomKey(file.id.toString())
  setCoverType(tab.value as FileType)
}
</script>

<template>
  <div :class="className" class="mx-auto h-[60vh] max-w-[80vw] overflow-auto rounded-xl p-6 space-y-6">
    <div class="mb-4 flex gap-4">
      <button
        class="rounded-lg px-4 py-2 font-medium transition dark:border-gray-700"
        :class="tab === 'image' ? 'bg-[--c-600] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'"
        @click="tab = 'image'"
      >
        {{ t('settings.cover.image') }}
      </button>
      <button
        class="rounded-lg px-4 py-2 font-medium transition dark:border-gray-700"
        :class="tab === 'video' ? 'bg-[--c-600] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'"
        @click="tab = 'video'"
      >
        {{ t('settings.cover.video') }}
      </button>
    </div>

    <div>
      <label class="mb-2 block text-sm text-gray-700 font-medium dark:text-gray-200">
        {{ t('settings.cover.current') }}
      </label>
      <div class="relative">
        <input
          id="cover" v-model="coverUrl" type="url"
          class="w-full flex-1 border border-gray-200 rounded-lg bg-white px-3 py-2 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          :placeholder="t('settings.cover.placeholder')"
        >
        <button
          v-if="coverUrl"
          class="absolute right-3 top-1/2 rounded bg-[--c-600] px-2 py-1 text-xs text-white -translate-y-1/2"
          @click="coverUrl = ''"
        >
          {{ t('common.clear') }}
        </button>
      </div>
    </div>

    <!-- 本地上传 -->
    <div>
      <label class="mb-2 block text-sm text-gray-700 font-medium dark:text-gray-200">
        {{ t('settings.cover.uploadLocal', { type: t(tab === 'image' ? 'settings.cover.image' : 'settings.cover.video') }) }}
      </label>
      <input
        type="file"
        :accept="tab === 'image' ? 'image/*' : 'video/*'"
        class="block w-full text-sm file:mr-4 file:border-0 file:rounded-lg file:bg-[--c-50] file:px-4 file:py-2 file:text-[--c-700] hover:file:bg-[--c-100]"
        @change="handleUpload"
      >
    </div>

    <!-- 本地文件预览 -->
    <div v-if="localFiles.length" class="grid grid-cols-5 mt-4 gap-4">
      <div
        v-for="file in localFiles"
        :key="file.id"
        class="group relative overflow-hidden rounded-lg bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
        @click="handleSelected(file)"
      >
        <button
          class="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1 text-red-500 dark:bg-gray-900/80 hover:bg-red-100 dark:hover:bg-red-900"
          title="删除"
          @click="handleDelete(file.id)"
        >
          <span class="i-tabler-trash" />
        </button>
        <img
          v-if="tab === 'image'"
          :src="file.url"
          class="h-32 w-full object-cover"
          :alt="file.name"
        >
        <video
          v-else
          :src="file.url"
          class="h-32 w-full object-cover"
          muted loop playsinline
        />
        <!-- 选中时显示对勾图标 -->
        <span
          v-if="coverCustomKey === file.id"
          class="i-whh-circleselect pointer-events-none absolute left-1/2 top-1/2 z-20 text-2xl text-white drop-shadow-lg -translate-x-1/2 -translate-y-1/2"
        />
        <div class="absolute bottom-0 left-0 w-full truncate bg-black/40 px-2 py-1 text-xs text-white">
          {{ file.name }}
        </div>
      </div>
    </div>
    <div v-else class="py-8 text-center text-gray-400">
      {{ t('settings.cover.emptyLocal', { type: t(tab === 'image' ? 'settings.cover.image' : 'settings.cover.video') }) }}
    </div>

    <div>
      <label class="mb-2 block text-sm text-gray-700 font-medium dark:text-gray-200">
        {{ t('settings.cover.select', { type: t(tab === 'image' ? 'settings.cover.image' : 'settings.cover.video') }) }}
      </label>
    </div>
  </div>
</template>
