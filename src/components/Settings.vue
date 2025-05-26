<script setup lang="ts">
import { useSettingsStore } from '~/store/option/settings'

const { cover } = useSettingsStore()
const isVisible = ref(false)
const form = reactive({
  apiUrl: '',
  theme: 'auto',
  cover,
})

// 验证规则
const errors = reactive({
  apiUrl: '',
  cover: '',
})

// 关闭弹窗函数
function closeModal(event: Event) {
  // 只有点击背景时才关闭弹窗
  if (event.target === event.currentTarget) {
    isVisible.value = false
  }
}

// 表单提交处理
function handleSubmit() {
  // 表单验证
  validateForm()

  if (Object.values(errors).every(error => !error)) {
    // 实际业务逻辑（这里模拟保存操作）
    isVisible.value = false
    // 这里可以添加实际的 API 调用逻辑
  }
}

// 验证函数
function validateForm() {
  errors.apiUrl = ''

  if (!form.apiUrl) {
    errors.apiUrl = '请填写 API 地址'
  }
  else if (!/^https?:\/\//.test(form.apiUrl)) {
    errors.apiUrl = '请输入有效的 URL 地址'
  }
}
</script>

<template>
  <div>
    <!-- 配置按钮 -->
    <div
      class="fixed right-4 top-6 cursor-pointer hover:scale-105"
      @click.stop="isVisible = true"
    >
      <span class="i-tabler-settings h-6 w-6 text-white" />
    </div>

    <!-- 使用transition包裹弹窗背景 -->
    <transition name="modal">
      <div
        v-show="isVisible"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @click="closeModal"
      >
        <!-- 背景遮罩层 -->
        <div class="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-lg" />
      </div>
    </transition>

    <!-- 使用另一个transition包裹弹窗内容 -->
    <transition name="modal-content">
      <div
        v-show="isVisible"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="relative max-w-md w-full rounded-lg bg-white p-8 shadow-2xl"
          @click.stop
        >
          <!-- 弹窗内容保持不变 -->
          <div class="mb-6 flex items-center justify-between">
            <h2 class="text-xl text-gray-800 font-bold">
              参数配置
            </h2>
            <button
              class="text-gray-500 hover:text-gray-700"
              @click="isVisible = false"
            >
              <span class="i-ion-close h-5 w-5" />
            </button>
          </div>

          <!-- 表单内容保持不变 -->
          <form @submit.prevent="handleSubmit">
            <!-- 表单字段 -->
            <div class="mb-4">
              <label
                class="mb-2 block text-sm text-gray-700 font-medium"
                for="apiUrl"
              >
                壁纸设置
              </label>
              <input
                id="apiUrl"
                v-model="form.cover"
                type="url"
                class="mt-1 block w-full border-gray-300 rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.cover }"
                placeholder="请输入 API 地址"
              >
              <p v-if="errors.cover" class="mt-1 text-sm text-red-500">
                {{ errors.cover }}
              </p>
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm text-gray-700 font-medium"
                for="theme"
              >
                主题模式
              </label>
              <select
                id="theme"
                v-model="form.theme"
                class="mt-1 block w-full border-gray-300 rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="light">
                  浅色模式
                </option>
                <option value="dark">
                  深色模式
                </option>
                <option value="auto">
                  自动模式
                </option>
              </select>
            </div>

            <div class="mt-6 flex justify-end">
              <button
                class="mr-2 rounded-md bg-blue-600 px-4 py-2 text-white font-bold hover:bg-blue-700"
                @click="handleSubmit"
              >
                保存配置
              </button>
              <button
                class="rounded-md bg-gray-300 px-4 py-2 text-gray-800 font-bold hover:bg-gray-400"
                @click="isVisible = false"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* 背景遮罩层动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* 弹窗内容动画 */
.modal-content-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-content-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.modal-content-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
