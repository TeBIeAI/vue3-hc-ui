import { configProviderContextKey } from './../constants'
import { MaybeRef } from '@vueuse/core'
import { computed, getCurrentInstance, inject, ref, Ref } from 'vue'
import { ConfigProviderContext } from '../constants'
import { defaultInitialZIndex, useNamespace, useZIndex } from '@hc-ui/hooks'

const globalConfig = ref<ConfigProviderContext>()

// export function useGlobalConfig(): Ref<ConfigProviderContext>
// export function useGlobalConfig(
//   key: keyof ConfigProviderContext,
//   defaultValue = undefined
// ) {
//   const config = getCurrentInstance()
//     ? inject(configProviderContextKey, globalConfig)
//     : globalConfig

//   if (key) {
//     return computed(() => config.value?.[key] ?? defaultValue)
//   } else {
//     return config
//   }
// }

export function useGlobalComponentSettings(
  block: string,
  sizeFallback?: MaybeRef<ConfigProviderContext['size']>
) {
  const ns = useNamespace(block)
  const zIndex = useZIndex(computed(() => defaultInitialZIndex))

  return {
    ns,
    zIndex
  }
}
