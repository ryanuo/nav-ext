import { useReactiveStorage } from '~/composables/useReactiveStorage'

async function init(): Promise<void> {
  try {
    const isExtensionEnv
      = location.protocol === 'chrome-extension:'
        || location.protocol === 'moz-extension:'

    if (!isExtensionEnv) {
      console.warn('🎈非扩展环境，跳过跳转逻辑。')
      return
    }

    const { data: enableWebMode, dataReady } = useReactiveStorage<boolean>('enableWebMode', false)
    const redirectUrl = 'https://tab.ryanuo.cc'

    dataReady.then(() => {
      if (enableWebMode.value) {
        location.href = redirectUrl
      }
      else {
        console.warn('未启用 Web 模式，不跳转。')
      }
    })
  }
  catch (error) {
    console.error('跳转失败:', error)
  }
}

init()
