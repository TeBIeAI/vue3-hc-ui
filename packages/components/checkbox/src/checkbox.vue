<template>
  <component :is="!hasOwnLabel ? 'span' : 'label'" :class="compCls">
    <span :class="spanCls">
      <input
        v-model="model"
        type="checkbox"
        :value="label"
        :class="ns.e('origin')"
        @change="handleChange"
      />
      <span :class="ns.e('inner')"></span>
    </span>
    <span v-if="hasOwnLabel" :class="ns.e('label')">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </component>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import { computed, useSlots } from 'vue'
import { checkboxEmits, checkboxProps } from './checkbox'
import { useCheckbox } from './composables/use-checkbox'

defineOptions({
  name: 'HcCheckbox'
})

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)
const slots = useSlots()

const ns = useNamespace('checkbox')

const { hasOwnLabel, isDisabled, isChecked, model, handleChange } = useCheckbox(
  props,
  slots
)

const compCls = computed(() => [
  ns.b(),
  ns.is('disabled', isDisabled.value),
  ns.is('checked', isChecked.value)
])

const spanCls = computed(() => [
  ns.e('input'),
  ns.is('disabled', isDisabled.value),
  ns.is('checked', isChecked.value)
])
</script>
