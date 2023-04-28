<template>
  <span :class="ns.e('jumper')">
    <span :class="ns.e('goto')">goto</span>
    <hc-input
      :class="[ns.e('editor'), ns.is('in-pagination')]"
      :model-value="innerValue"
      type="number"
      @update:model-value="handleInput"
      @change="handleChange"
    />
  </span>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import { HcInput } from '@hc-ui/components'
import { computed, ref } from 'vue'
import { usePagination } from '../usePagination'

defineOptions({
  name: 'HcPaginationJumper'
})

const ns = useNamespace('pagination')
const { currentPage, changeEvent } = usePagination()

const userInput = ref<number>()
const innerValue = computed(() => {
  return userInput.value ?? currentPage?.value
})

const handleInput = (val: number | string) => {
  userInput.value = +val
}

const handleChange = (val: number | string) => {
  val = Math.trunc(+val)
  changeEvent?.(val)
  userInput.value = undefined
}
</script>
