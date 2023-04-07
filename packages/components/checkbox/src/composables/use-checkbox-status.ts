import { computed, toRaw } from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { CheckboxProps } from '../checkbox'
import { CheckboxReturn } from './use-checkbox-model'
import { isArray, isBoolean, isObject } from 'lodash-es'

export const useCheckboxStatus = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots'],
  model: CheckboxReturn['model']
) => {
  const hasOwnLabel = computed(() => !!(slots.default || props.label))

  const isChecked = computed<boolean>(() => {
    const value = model.value

    if (isBoolean(value)) {
      return value
    } else if (isArray(value)) {
      if (isObject(props.label)) {
        return false
      } else {
        return value.map(toRaw).includes(props.label)
      }
    } else if (value !== null && value !== undefined) {
      return value === props.trueLabel
    } else {
      return !!value
    }
  })

  return {
    hasOwnLabel,
    isChecked
  }
}
