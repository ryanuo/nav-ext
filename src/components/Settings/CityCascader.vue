<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { GC, GP, GT } from '~/constants/provinceData'

interface Region {
  id: number
  name: string
  pinyin: string
}

const props = defineProps({
  modelValue: {
    type: Object as () => { province?: Region, city?: Region, area?: Region },
    default: () => ({}),
  },
  placeholder: {
    type: String,
    default: '', // 用i18n
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue', 'change'])

const { t } = useI18n()

const panelVisible = ref(false)
const selectedProvince = ref<Region | null>(null)
const selectedCity = ref<Region | null>(null)
const selectedArea = ref<Region | null>(null)

const provinceListRef = ref<HTMLElement | null>(null)
const cityListRef = ref<HTMLElement | null>(null)
const areaListRef = ref<HTMLElement | null>(null)

const selectedText = computed(() => {
  if (selectedProvince.value && selectedCity.value && selectedArea.value)
    return `${selectedProvince.value.name} ${selectedCity.value.name} ${selectedArea.value.name}`
  if (selectedProvince.value && selectedCity.value)
    return `${selectedProvince.value.name} ${selectedCity.value.name}`
  if (selectedProvince.value)
    return selectedProvince.value.name
  return ''
})

function getCitiesByProvinceId(provinceId: number) {
  const index = GP.findIndex(p => p.id === provinceId)
  return index >= 0 && index < GT.length ? GT[index] : []
}

function getAreasByCityId(cityId: number) {
  for (let provinceIndex = 0; provinceIndex < GP.length; provinceIndex++) {
    const cities = GT[provinceIndex]
    const cityIndex = cities.findIndex(c => c.id === cityId)
    if (cityIndex >= 0) {
      return GC[provinceIndex]?.[cityIndex] || []
    }
  }
  return []
}

function togglePanel() {
  if (!props.disabled) {
    panelVisible.value = !panelVisible.value
    if (panelVisible.value) {
      nextTick(() => scrollToSelected('province'))
    }
  }
}

function selectProvince(province: Region) {
  selectedProvince.value = province
  selectedCity.value = null
  selectedArea.value = null
  nextTick(() => scrollToSelected('city'))
}

function selectCity(city: Region) {
  selectedCity.value = city
  selectedArea.value = null
  nextTick(() => scrollToSelected('area'))
}

function selectArea(area: Region) {
  selectedArea.value = area
  // 自动关闭并确定
  confirmSelection()
}

function resetSelection() {
  selectedProvince.value = null
  selectedCity.value = null
  selectedArea.value = null
  nextTick(() => scrollToSelected('province'))
}

function confirmSelection() {
  if (!selectedProvince.value)
    return
  const value = {
    province: selectedProvince.value,
    city: selectedCity.value,
    area: selectedArea.value,
  }
  emits('update:modelValue', value)
  emits('change', value)
  panelVisible.value = false
}

function scrollToSelected(type: 'province' | 'city' | 'area') {
  let listRef: HTMLElement | null = null
  let selectedId: number | undefined
  if (type === 'province') {
    listRef = provinceListRef.value
    selectedId = selectedProvince.value?.id
  }
  else if (type === 'city') {
    listRef = cityListRef.value
    selectedId = selectedCity.value?.id
  }
  else if (type === 'area') {
    listRef = areaListRef.value
    selectedId = selectedArea.value?.id
  }
  if (listRef && selectedId) {
    const el = listRef.querySelector(`[data-id="${selectedId}"]`)
    if (el)
      el.scrollIntoView({ block: 'center' })
  }
}

// 外部点击关闭
function handleClickOutside(e: MouseEvent) {
  if (!panelVisible.value)
    return
  const root = document.querySelector('.city-cascader')
  if (root && !root.contains(e.target as Node)) {
    panelVisible.value = false
  }
}
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

watch(() => props.modelValue, (newVal) => {
  selectedProvince.value = newVal.province || null
  selectedCity.value = newVal.city || null
  selectedArea.value = newVal.area || null
}, { deep: true, immediate: true })
</script>

<template>
  <div class="city-cascader relative mt-2 w-70">
    <div
      class="flex cursor-pointer items-center justify-between border border-gray-300 rounded-lg bg-white px-4 py-2 dark:border-gray-700 dark:bg-[#23272f]"
      :class="{ 'border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/40': panelVisible }"
      @click="togglePanel"
    >
      <span class="truncate text-gray-700 dark:text-gray-200">
        {{ selectedText || t('cityCascader.placeholder') }}
      </span>
      <i class="i-eva-arrow-ios-downward-outline transition-transform duration-300 dark:text-gray-400" :class="{ 'rotate-180': panelVisible }" />
    </div>

    <transition name="fade">
      <div
        v-show="panelVisible"
        class="absolute left-0 right-0 z-50 mt-2 max-h-[400px] border border-gray-200 rounded-lg bg-white shadow-lg dark:border-gray-700 dark:bg-[#23272f]"
        @click.stop
      >
        <div class="flex gap-2 p-3">
          <!-- 省份 -->
          <ul ref="provinceListRef" class="max-h-72 w-1/3 overflow-y-auto border-r border-gray-100 pr-2 dark:border-gray-700">
            <li
              v-for="province in GP"
              :key="province.id"
              :data-id="province.id"
              class="cursor-pointer rounded px-3 py-2 transition-colors"
              :class="[
                selectedProvince?.id === province.id
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800',
              ]"
              @click="selectProvince(province)"
            >
              {{ province.name }}
            </li>
          </ul>
          <!-- 城市 -->
          <ul
            v-if="selectedProvince"
            ref="cityListRef"
            class="max-h-72 w-1/3 overflow-y-auto border-r border-gray-100 pr-2 dark:border-gray-700"
          >
            <li
              v-for="city in getCitiesByProvinceId(selectedProvince.id)"
              :key="city.id"
              :data-id="city.id"
              class="cursor-pointer rounded px-3 py-2 transition-colors"
              :class="[
                selectedCity?.id === city.id
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800',
              ]"
              @click="selectCity(city)"
            >
              {{ city.name }}
            </li>
          </ul>
          <!-- 区县 -->
          <ul
            v-if="selectedCity"
            ref="areaListRef"
            class="max-h-72 w-1/3 overflow-y-auto"
          >
            <li
              v-for="area in getAreasByCityId(selectedCity.id)"
              :key="area.id"
              :data-id="area.id"
              class="cursor-pointer rounded px-3 py-2 transition-colors"
              :class="[
                selectedArea?.id === area.id
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800',
              ]"
              @click="selectArea(area)"
            >
              {{ area.name }}
            </li>
          </ul>
        </div>
        <div class="flex justify-end border-t border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-[#23272f]">
          <button class="rounded px-4 py-1.5 text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100" @click="resetSelection">
            {{ t('common.reset') }}
          </button>
          <button
            class="ml-2 rounded bg-blue-500 px-4 py-1.5 text-white hover:bg-blue-600"
            :disabled="!selectedProvince"
            @click="confirmSelection"
          >
            {{ t('common.confirm') }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
