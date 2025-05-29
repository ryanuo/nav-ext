<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { LOCALESTRING } from '~/locales/i18n'
import { useSettingsStore } from '~/store/option/settings'
import { useDateTime } from '~/composables/useDateTime'

const { t } = useI18n()

type ActiveTab = 'base' | 'city' | 'weather' | 'notification' | 'about' | 'search' | 'preference' | 'timeWeather'
const appVersion = __APP_VERSION__
const buildTime = __BUILD_TIME__
const settingsStore = useSettingsStore()
const isSettingsButtonVisible = ref(false)
const activeTab = ref<ActiveTab>('about') // 默认激活基础配置
const isConfirmVisible = ref(false)

const theme = computed({
  get: () => settingsStore.theme,
  set: (value: string) => settingsStore.setTheme(value),
})

const cover = computed({
  get: () => settingsStore.cover,
  set: (value: string) => settingsStore.setCover(value),
})

const language = computed({
  get: () => settingsStore.language,
  set: (value: LOCALESTRING) => settingsStore.setLanguage(value),
})

const animation = computed({
  get: () => settingsStore.animation,
  set: (value: boolean) => settingsStore.setAnimation(value),
})

// 时间与天气
const timezone = computed({
  get: () => settingsStore.timezone,
  set: (value: string) => settingsStore.setTimezone(value),
})

const weatherCity = computed({
  get: () => settingsStore.weatherCity,
  set: (value: WeatherCity) => settingsStore.setWeatherCity(value),
})

const weatherTheme = computed({
  get: () => settingsStore.weatherTheme,
  set: (value: '1' | '2') => settingsStore.setWeatherTheme(value),
})

const showWeather = computed({
  get: () => settingsStore.showWeather,
  set: (value: boolean) => settingsStore.setShowWeather(value),
})

const is24Hour = computed({
  get: () => settingsStore.is24Hour,
  set: (value: boolean) => settingsStore.setIs24Hour(value),
})

// 是否显示秒钟
const showSeconds = computed({
  get: () => settingsStore.showSeconds,
  set: (value: boolean) => settingsStore.setShowSeconds(value),
})
const showDateWeek = computed({
  get: () => settingsStore.showDateWeek,
  set: (value: boolean) => settingsStore.setShowDateWeek(value),
})

const searchSuggestionEnabled = computed({
  get: () => settingsStore.searchSuggestionEnabled,
  set: (value: boolean) => settingsStore.setSearchSuggestionEnabled(value),
})

const isAutoFocusSearchBoxOnPageLoad = computed({
  get: () => settingsStore.isAutoFocusSearchBoxOnPageLoad,
  set: (value: boolean) => settingsStore.setIsAutoFocusSearchBoxOnPageLoad(value),
})

const { currentDateTime } = useDateTime()

const errors = reactive({
  cover: '',
})

// 验证函数
function validateField(field: string, value: string) {
  if (field === 'cover') {
    if (!value) {
      errors[field] = t('settings.cover.enterUrl')
    }
    else if (
      !/^https?:\/\/|^data:image\/[a-z]+;base64,|^blob:chrome-extension:/.test(value)
    ) {
      errors[field] = t('qing-shu-ru-you-xiao-de-url-di-zhi-base64-ge-shi-tu-pian-huo-chrome-kuo-zhan-ben-di-tu-pian')
    }
    else {
      errors[field] = ''
    }
  }
}

// 监听字段变化实时验证
watch(cover, newValue => validateField('cover', newValue))

// 初始化验证
validateField('cover', cover.value)

// 重置设置
function resetSettings() {
  isConfirmVisible.value = true
}

// 选项卡样式计算函数
function tabClass(tabName: string) {
  return `w-full border-b border-gray-200 px-6 py-4 text-left transition-all duration-200 ${activeTab.value === tabName
    ? 'border-l-4 border-blue-500 bg-blue-50 text-blue-600 font-medium'
    : 'text-gray-600 font-medium hover:bg-gray-50'
  }`
}

const fileInputRef = ref<HTMLInputElement | null>(null)

function handleLocalCoverUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    // 创建本地预览URL（可选，仅用于预览，不上传到服务器）
    const previewUrl = URL.createObjectURL(file)
    cover.value = previewUrl

    // 清空input的文件缓存
    if (fileInputRef.value)
      fileInputRef.value.value = ''
  }
}

defineExpose({
  setIsSettingsButtonVisible: (visible: boolean) => {
    isSettingsButtonVisible.value = visible
  },
})
</script>

<template>
  <div>
    <!-- 配置按钮 -->
    <div class="fixed right-4 top-6 cursor-pointer" @click.stop="isSettingsButtonVisible = true">
      <span class="i-tabler-settings h-6 w-6 text-white transition-transform duration-300 hover:rotate-180" />
    </div>
    <!-- 弹窗内容 -->
    <transition name="modal-content">
      <div v-show="isSettingsButtonVisible" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="relative max-w-3xl w-full rounded-lg bg-white shadow-2xl" @click.stop>
          <div class="flex items-center justify-between border-b p-4">
            <h2 class="text-xl font-bold">
              {{ t('settings.title') }}
            </h2>
            <button @click="isSettingsButtonVisible = false">
              <span class="i-ion-close h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <!-- 垂直选项卡容器 -->
          <div class="flex flex-col overflow-hidden md:flex-row">
            <!-- 左侧选项卡导航 -->
            <div class="flex-1 border-r border-gray-200 md:flex-col">
              <!-- 基础配置 -->
              <button :class="tabClass('base')" @click="activeTab = 'base'">
                {{ t('settings.tab.base') }}
              </button>

              <!-- 搜索引擎 -->
              <button :class="tabClass('search')" @click="activeTab = 'search'">
                {{ t('settings.tab.search') }}
              </button>

              <!-- 个性化偏好 -->
              <button :class="tabClass('preference')" @click="activeTab = 'preference'">
                {{ t('settings.tab.preference') }}
              </button>

              <!-- 时间与天气 -->
              <button :class="tabClass('timeWeather')" @click="activeTab = 'timeWeather'">
                {{ t('settings.tab.timeWeather') }}
              </button>

              <!-- 关于 -->
              <button :class="tabClass('about')" @click="activeTab = 'about'">
                {{ t('settings.tab.about') }}
              </button>
            </div>

            <!-- 右侧选项卡内容 -->
            <div class="h-xs max-h-xs flex-[3] overflow-auto p-4">
              <!-- 基础配置 -->
              <div v-show="activeTab === 'base'">
                <!-- 主题模式 -->
                <div class="mb-4">
                  <label class="block text-sm text-gray-700 font-medium">{{ t('settings.themeMode') }}</label>
                  <select
                    v-model="theme"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="light">
                      {{ t('settings.theme.light') }}
                    </option>
                    <option value="dark">
                      {{ t('settings.theme.dark') }}
                    </option>
                    <option value="auto">
                      {{ t('settings.theme.auto') }}
                    </option>
                  </select>
                </div>

                <!-- 壁纸设置 -->
                <div class="mt-6">
                  <label class="block text-sm text-gray-700 font-medium">{{ t('settings.cover') }}</label>
                  <div class="relative">
                    <input
                      id="cover" v-model="cover" type="url"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 pr-15! focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      :class="{ 'border-red-500': errors.cover }" :placeholder="t('settings.cover.placeholder')"
                    >
                    <button
                      v-if="cover"
                      class="absolute right-3 top-1/2 rounded bg-blue-600 px-2 py-1 text-xs text-white -translate-y-1/2"
                      @click="cover = ''"
                    >
                      {{ t('common.clear') }}
                    </button>
                  </div>
                  <p v-if="errors.cover" class="mt-1 text-sm text-red-500">
                    {{ errors.cover }}
                  </p>
                  <img v-if="cover" class="mt-2 w-20 cursor-pointer hover:scale-105" :src="cover" alt="" srcset="">
                  <div class="mt-2 flex items-center">
                    <input
                      id="localCoverInput"
                      ref="fileInputRef"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="handleLocalCoverUpload"
                    >
                    <label for="localCoverInput" class="cursor-pointer rounded bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300">
                      {{ t('settings.cover.uploadLocal') }}
                    </label>
                  </div>
                </div>
              </div>

              <!-- 搜索引擎设置 -->
              <div v-show="activeTab === 'search'">
                <div class="mb-4">
                  <label class="block text-sm text-gray-700 font-medium">{{ t('settings.searchEngine') }}</label>
                  <SearchEngineSetting />
                </div>
              </div>

              <!-- 个性化偏好 -->
              <div v-show="activeTab === 'preference'">
                <GroupContainer>
                  <template #label>
                    {{ t('settings.preference') }}
                  </template>
                  <ItemContainer>
                    <span class="text-gray-700">{{ t('settings.language') }}</span>
                    <select
                      v-model="language"
                      class="block border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="zh-CN">
                        {{ t('settings.language.zh-CN') }}
                      </option>
                      <option value="en-US">
                        {{ t('settings.language.en-US') }}
                      </option>
                    </select>
                  </ItemContainer>
                  <ItemContainer>
                    <span class="text-gray-700">{{ t('settings.searchSuggestion') }}</span>
                    <Toggle v-model="searchSuggestionEnabled" label="" />
                  </ItemContainer>
                  <ItemContainer>
                    <span class="text-gray-700">{{ t('settings.autoFocusSearchBox') }}</span>
                    <Toggle v-model="isAutoFocusSearchBoxOnPageLoad" label="" />
                  </ItemContainer>
                </GroupContainer>
                <GroupContainer>
                  <template #label>
                    <span class="text-gray-700">{{ t('settings.animation') }}</span>
                  </template>
                  <ItemContainer>
                    <span class="text-gray-700">{{ t('settings.animation.desc') }}</span>
                    <Toggle v-model="animation" label="" />
                  </ItemContainer>
                </GroupContainer>
              </div>

              <!-- 时间与天气 -->
              <div v-show="activeTab === 'timeWeather'">
                <GroupContainer>
                  <template #label>
                    {{ t('settings.time') }}
                  </template>
                  <ItemContainer>
                    <span class="text-gray-700">{{ t('settings.currentTime') }}：{{ currentDateTime }}</span>
                    <span class="text-gray-700">{{ t('settings.timezone') }}-{{ timezone }}</span>
                  </ItemContainer>
                  <ItemContainer>
                    <span class="text-gray-700">{{ t('settings.timezoneSetting') }}</span>
                    <select
                      v-model="timezone"
                      class="block border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="Asia/Shanghai">
                        {{ t('settings.timezone.shanghai') }}
                      </option>
                      <option value="America/New_York">
                        {{ t('settings.timezone.newyork') }}
                      </option>
                      <option value="Europe/London">
                        {{ t('settings.timezone.london') }}
                      </option>
                      <option value="Asia/Tokyo">
                        {{ t('settings.timezone.tokyo') }}
                      </option>
                    </select>
                  </ItemContainer>
                  <ItemContainer>
                    <span class="text-gray-700">{{ t('settings.is24Hour') }}</span>
                    <Toggle v-model="is24Hour" label="" />
                  </ItemContainer>
                  <ItemContainer>
                    <span class="text-gray-700">{{ t('settings.showSeconds') }}</span>
                    <Toggle v-model="showSeconds" label="" />
                  </ItemContainer>
                  <ItemContainer>
                    <span class="text-gray-700">{{ t('settings.showDateWeek') }}</span>
                    <Toggle v-model="showDateWeek" label="" />
                  </ItemContainer>
                </GroupContainer>
                <GroupContainer>
                  <template #label>
                    {{ t('settings.weather') }}
                  </template>
                  <ItemContainer>
                    <span class="text-gray-700">{{ t('settings.showWeather') }}</span>
                    <Toggle v-model="showWeather" label="" />
                  </ItemContainer>
                  <ItemContainer v-if="showWeather">
                    <span class="text-gray-700">{{ t('settings.weatherCity') }}</span>
                    <CityCascader
                      v-model="weatherCity"
                    />
                  </ItemContainer>
                  <ItemContainer>
                    <span class="text-gray-700">{{ t('settings.weatherTheme') }}</span>
                    <select
                      v-model="weatherTheme"
                      class="block border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="1">
                        {{ t('settings.weatherTheme.tianqiapi') }}
                      </option>
                      <option value="2">
                        {{ t('settings.weatherTheme.meteo') }}
                      </option>
                    </select>
                  </ItemContainer>
                </GroupContainer>
              </div>

              <!-- 关于页面 -->
              <div v-show="activeTab === 'about'">
                <div class="prose max-w-none">
                  <h3 class="mb-2 text-lg font-bold">
                    {{ t('settings.about.systemInfo') }}
                  </h3>
                  <p>{{ t('settings.about.version') }}：{{ appVersion }}</p>
                  <p>{{ t('settings.about.buildTime') }}：{{ buildTime }}</p>
                  <p>{{ t('settings.about.feedback') }}：<a href="https://github.com/ryanuo/tab-ext/issues" target="_blank">issues</a></p>
                  <p class="mt-4">
                    {{ t('settings.about.copyright') }} <a href="https://ryanuo.cc" target="_blank">ryanuo</a>
                  </p>
                  <p class="mt-1">
                    {{ t('settings.about.support') }}：<a href="mailto:hi@ryanuo.cc">hi@ryanuo.cc</a>
                  </p>

                  <div class="mt-4">
                    <h4 class="my-2 text-base font-semibold">
                      {{ t('settings.about.openSource') }}
                    </h4>
                    <p class="text-xs text-gray-600">
                      {{ t('settings.about.openSourceDesc') }}
                      <a href="https://github.com/ryanuo/tab-ext/blob/main/LICENSE" target="_blank">MIT</a>
                      {{ t('settings.about.openSourceDesc2') }}
                    </p>
                    <h4 class="my-2 text-base font-semibold">
                      {{ t('settings.about.terms') }}
                    </h4>
                    <p class="text-xs text-gray-600">
                      {{ t('settings.about.termsDesc1') }}
                    </p>
                    <p class="text-xs text-gray-600">
                      {{ t('settings.about.termsDesc2') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 底部按钮 -->
          <div class="flex justify-end border-t p-4">
            <button
              type="button"
              class="mr-2 border border-gray-300 rounded-md bg-gray-50 px-2 py-1 text-sm text-gray-700 font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="resetSettings"
            >
              {{ t('common.reset') }}
            </button>
            <button
              type="button"
              class="border border-transparent rounded-md bg-blue-600 px-2 py-1 text-sm text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="isSettingsButtonVisible = false"
            >
              {{ t('common.close') }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <!-- 确认重置对话框 -->
  <transition name="modal">
    <div v-show="isConfirmVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-bold">
          {{ t('settings.confirmReset.title') }}
        </h3>
        <p class="mb-6 text-gray-700">
          {{ t('settings.confirmReset.desc') }}
        </p>
        <div class="flex justify-end space-x-3">
          <button
            class="border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
            @click="isConfirmVisible = false"
          >
            {{ t('common.cancel') }}
          </button>
          <button class="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700" @click="settingsStore.resetAll">
            {{ t('common.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* 动画样式 */
.modal-content-enter-active {
  transition: all 0.3s ease;
}

.modal-content-leave-active {
  transition: all 0.2s ease;
}

.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.modal-content-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

input,
select {
  @apply h-8 p-1;
}

a {
  @apply text-blue-600 hover:underline;
}
</style>
