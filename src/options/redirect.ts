import { useReactiveStorage } from '~/composables/useReactiveStorage'

async function init(): Promise<void> {
  try {
    const { data: enableWebMode, dataReady } = useReactiveStorage<boolean>('enableWebMode', false)
    const redirectUrl = 'https://tab.ryanuo.cc'

    dataReady.then(() => {
      if (enableWebMode.value) {
        browser.tabs.update({ url: redirectUrl })
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
