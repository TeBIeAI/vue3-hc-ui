<template>
  <span :class="compCls">
    <span :class="spanCls">
      <input
        v-model="model"
        :class="ns.e('origin')"
        type="checkbox"
        :value="label"
        @change="handleClick"
      />
      <span :class="ns.e('inner')"></span>
    </span>
    <span :class="ns.e('label')">
      <slot />
      <template v-if="$slots.default || label">
        {{ label }}
      </template>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import { computed, unref, useSlots } from 'vue'
import { checkboxEmits, checkboxProps } from './checkbox'
import { useCheckbox } from './composables/use-checkbox'

defineOptions({
  name: 'HcCheckbox'
})

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

const slots = useSlots()

const { isChecked, isDisabeld, model, handleClick } = useCheckbox(props, slots)

const ns = useNamespace('checkbox')

const compCls = computed(() => {
  return [
    ns.b(),
    ns.is('disabled', unref(isDisabeld.value)),
    ns.is('checked', isChecked.value)
  ]
})

const spanCls = computed(() => {
  return [
    ns.e('input'),
    ns.is('disabled', unref(isDisabeld.value)),
    ns.is('checked', isChecked.value)
  ]
})
</script>
