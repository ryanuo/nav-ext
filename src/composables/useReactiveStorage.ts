import type { RemovableRef } from '@vueuse/core'
import { useStorageAsync } from '@vueuse/core'
import { useWebExtensionStorage } from './useWebExtensionStorage'

export function useReactiveStorage<T>(
  key: string,
  initialValue: any,
): { data: RemovableRef<T>, dataReady: Promise<T> } {
  if (__USEEXTENSION__) {
    return useWebExtensionStorage(key, initialValue) as { data: RemovableRef<T>, dataReady: Promise<T> }
  }
  else {
    const data = useStorageAsync(key, initialValue) as unknown as { data: RemovableRef<T>, dataReady: Promise<T> }
    return {
      data: toRef(data) as RemovableRef<T>,
      dataReady: data.dataReady,
    }
  }
}
