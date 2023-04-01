<template>
  <div :class="ns.b()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { UPDATE_MODEL_EVENT } from '@hc-ui/constants'
import { useNamespace } from '@hc-ui/hooks'
import { reactive, nextTick, provide, toRefs } from 'vue'
import { radioGroupKey } from './constants'
import {
  radioGroupEmits,
  RadioGroupProps,
  radioGroupProps
} from './radio-group'

defineOptions({
  name: 'HcRadioGroup'
})

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const ns = useNamespace('radio-group')

const changeEvent = (val: RadioGroupProps['modelValue']) => {
  console.log(val)
  emit(UPDATE_MODEL_EVENT, val)
  nextTick(() => emit('change', val))
}

provide(
  radioGroupKey,
  reactive({
    ...toRefs(props),
    changeEvent
  })
)
</script>
