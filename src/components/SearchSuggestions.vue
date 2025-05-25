<script lang="ts" setup>
// 定义 props 和 emits
const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
    default: '',
  },
})

const emits = defineEmits(['select'])

const suggestions = ref<string[]>([])
let controller: AbortController | null = null

// 获取搜索建议
async function fetchSuggestions() {
  const query = props.searchQuery.trim()
  if (!query) {
    suggestions.value = []
    return
  }

  // 取消之前的请求
  if (controller) {
    controller.abort()
  }

  controller = new AbortController()

  try {
    const response = await fetch(
      `https://suggestion.baidu.com/su?wd=${encodeURIComponent(query)}&json=1&p=3`,
      {
        signal: controller.signal,
        headers: {
          Referer: 'https://www.baidu.com',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 处理返回的文本格式数据 - 手动指定编码
    const arrayBuffer = await response.arrayBuffer()
    // 尝试使用GBK编码解析
    const decoder = new TextDecoder('gbk')
    const text = decoder.decode(arrayBuffer)

    // 提取JSON数据部分
    const jsonStart = text.indexOf('{')
    const jsonEnd = text.lastIndexOf('}') + 1
    const jsonData = text.substring(jsonStart, jsonEnd)

    const data = JSON.parse(jsonData)
    if (data.s && Array.isArray(data.s)) {
      suggestions.value = data.s
    }
    else {
      suggestions.value = []
    }
  }
  catch (error: any) {
    if (error?.name !== 'AbortError') {
      console.error('获取搜索建议失败:', error)
      suggestions.value = []
    }
  }
  finally {
    // 请求完成后重置控制器
    if (controller && controller.signal.aborted === false) {
      controller = null
    }
  }
}

watch(() => props.searchQuery, () => {
  fetchSuggestions()
})

// 当前选中的索引（键盘导航用）
const selectedIndex = ref(-1)
// 鼠标悬停的索引
const hoveredIndex = ref(-1)

// 过滤后的搜索建议
const filteredSuggestions = computed(() => {
  if (!props.searchQuery?.trim())
    return []

  const query = props.searchQuery.toLowerCase().trim()
  return suggestions.value.filter(item =>
    item.toLowerCase().includes(query),
  )
})

// 计算当前项的类名（高亮选中项）
function computedItemClass(index: number) {
  const isSelected = index === selectedIndex.value
  const isHovered = index === hoveredIndex.value

  if (isSelected)
    return 'bg-blue-100 text-blue-800'
  if (isHovered)
    return 'bg-gray-100/40 text-gray-800'

  return ''
}

// 高亮匹配的文本
function highlightMatch(text: string) {
  if (!props.searchQuery.trim())
    return text

  const query = props.searchQuery.toLowerCase().trim()
  const regex = new RegExp(`(${query})`, 'gi')

  return text.replace(regex, '<span class="font-semibold text-blue-600">$1</span>')
}

// 选择建议项
function selectSuggestion(suggestion: string) {
  emits('select', suggestion)
}

// 监听搜索查询变化，重置选中状态
watch(() => props.searchQuery, () => {
  selectedIndex.value = -1
  hoveredIndex.value = -1
})
</script>

<template>
  <div class="relative mx-auto w-full">
    <!-- 搜索建议列表 -->
    <div
      v-if="filteredSuggestions.length > 0 && searchQuery.trim().length > 0"
      class="mt-1 max-h-80 w-full overflow-y-auto rounded-lg shadow-lg"
    >
      <ul>
        <li
          v-for="(suggestion, index) in filteredSuggestions"
          :key="suggestion || index"
          :class="computedItemClass(index)"
          class="cursor-pointer px-4 py-2 transition-colors"
          @click.stop="selectSuggestion(suggestion)"
          @mouseenter="hoveredIndex = index"
        >
          <span v-html="highlightMatch(suggestion)" />
        </li>
      </ul>
    </div>

    <!-- 搜索结果提示 -->
    <div
      v-else-if="searchQuery.trim().length > 0 && filteredSuggestions.length === 0"
      class="mt-1 w-full rounded-lg p-4 text-dark shadow-lg"
    >
      没有找到与 "{{ searchQuery }}" 相关的结果
    </div>
  </div>
</template>

<style scoped>
</style>
