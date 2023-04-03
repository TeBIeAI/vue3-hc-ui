import { computed, inject, ref, unref } from 'vue'
import type { Ref, InjectionKey } from 'vue'
import { isNumber } from 'lodash-es'

const zIndex = ref(0)
const defaultInitalZIndex = 2000

export const zIndexInjectionKey: InjectionKey<Ref<number>> = Symbol('zIndexKey')

export const useZIndex = (zIndexOverrides?: Ref<number>) => {
  const zIndexInjection =
    zIndexOverrides || inject(zIndexInjectionKey, undefined)

  const initalZIndex = computed(() => {
    const zIndexInject = unref(zIndexInjection)
    return isNumber(zIndexInject) ? zIndexInject : defaultInitalZIndex
  })

  const currentZIndex = computed(() => initalZIndex.value + zIndex.value)

  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    initalZIndex,
    currentZIndex,
    nextZIndex
  }
}
