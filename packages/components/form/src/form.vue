<template>
  <form :class="formClasses">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import { computed, provide } from 'vue'
import { formContextKey } from './constants'
import { formEmits, formProps } from './form'

defineOptions({
  name: 'HcForm'
})

const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const ns = useNamespace('form')

const formClasses = computed(() => {
  const { labelPosition, inline } = props
  return [
    ns.b(),
    {
      [ns.m(`label-${labelPosition}`)]: labelPosition,
      [ns.m('inline')]: inline
    }
  ]
})

provide(formContextKey, {
  ...props,
  emit
})
</script>
