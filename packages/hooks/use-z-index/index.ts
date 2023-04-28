import { computed, inject, ref, unref } from 'vue'
import type { Ref, InjectionKey } from 'vue'
import { isNumber } from 'lodash-es'

const zIndex = ref(0)
export const defaultInitialZIndex = 2000

export const zIndexInjectionKey: InjectionKey<Ref<number>> = Symbol('zIndexKey')

export const useZIndex = (zIndexOverrides?: Ref<number>) => {
  const zIndexInjection =
    zIndexOverrides || inject(zIndexInjectionKey, undefined)

  const initialZIndex = computed(() => {
    const zIndexInject = unref(zIndexInjection)
    return isNumber(zIndexInject) ? zIndexInject : defaultInitialZIndex
  })

  const currentZIndex = computed(() => initialZIndex.value + zIndex.value)

  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  }
}

export type UseZIndexReturn = ReturnType<typeof useZIndex>
