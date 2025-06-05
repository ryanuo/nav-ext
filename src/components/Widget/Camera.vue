<script setup lang="ts">
import { useDevicesList, useUserMedia } from '@vueuse/core'

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const currentCamera = shallowRef<string>()
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find(i => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId
  },
})

const video = ref<HTMLVideoElement | null>(null)
const { stream, enabled } = useUserMedia({
  constraints: reactive({ video: { deviceId: currentCamera } }),
})

watchEffect(() => {
  if (video.value)
    video.value.srcObject = stream.value!
})

defineExpose({
  currentCamera,
  enabled,
})

function handleCameraChange(id: string) {
  currentCamera.value = id
  if (video.value) {
    video.value.srcObject = null // 清除之前的流
    video.value.srcObject = stream.value! // 重新设置新的流
  }
  enabled.value = !enabled.value // 切换摄像头时切换 enabled 状态
}
</script>

<template>
  <div class="mx-auto max-w-md w-full p-3 text-center">
    <div class="w-full flex justify-center overflow-hidden rounded-lg bg-black/80 shadow-lg dark:border-gray-700">
      <video ref="video" muted autoplay controls class="h-a w-200 bg-black" />
    </div>
    <div class="mt-2 flex flex-wrap justify-center gap-2">
      <button
        v-for="camera in cameras"
        :key="camera.deviceId"
        class="border border-gray-300 rounded bg-gray-100 px-4 py-2 text-gray-700 transition-all duration-150 dark:border-gray-600 dark:bg-gray-800 hover:bg-[--c-100] dark:text-gray-200 hover:text-[--c-700] dark:hover:bg-blue-900/40 dark:hover:text-blue-200"
        :class="{ 'border-[--c-500] bg-[--c-50] text-[--c-700] dark:bg-blue-900/40 dark:text-blue-200': currentCamera === camera.deviceId }"
        @click="handleCameraChange(camera.deviceId)"
      >
        {{ camera.label || `Camera` }} {{ enabled && currentCamera === camera.deviceId ? '(On)' : '(Off)' }}
      </button>
    </div>
  </div>
</template>
