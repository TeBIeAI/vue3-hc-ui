<template>
  <component :is="tag" :class="ns.b('group')">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { UPDATE_MODEL_EVENT } from '@hc-ui/constants'
import { useNamespace } from '@hc-ui/hooks'
import { pick } from 'lodash-es'
import { computed, nextTick, provide, toRefs } from 'vue'
import {
  checkboxGroupEmits,
  checkboxGroupProps,
  CheckboxGroupValueType
} from './checkbox-group'
import { checkboxGroupContext } from './constants'

defineOptions({
  name: 'HcCheckboxGroup'
})

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmits)

const ns = useNamespace('checkbox')

const changeEvent = async (val: CheckboxGroupValueType) => {
  emit(UPDATE_MODEL_EVENT, val)
  await nextTick()
  emit('change', val)
}

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(val: CheckboxGroupValueType) {
    debugger
    changeEvent(val)
  }
})

provide(checkboxGroupContext, {
  ...pick(toRefs(props), ['min', 'max', 'disabled']),
  modelValue,
  changeEvent
})
</script>
