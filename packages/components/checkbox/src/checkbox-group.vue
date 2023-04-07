<template>
  <div class="1aaa">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { UPDATE_MODEL_EVENT } from '@hc-ui/constants'
import { pick } from 'lodash-es'
import { toRefs, computed, nextTick, provide } from 'vue'
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

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(val: CheckboxGroupValueType) {
    changeEvent(val)
  }
})

const changeEvent = async (val: CheckboxGroupValueType) => {
  emit(UPDATE_MODEL_EVENT, val)
  await nextTick()
  emit('change', val)
}

provide(checkboxGroupContext, {
  ...pick(toRefs(props), ['min', 'max', 'disabled']),
  modelValue,
  changeEvent
})
</script>
