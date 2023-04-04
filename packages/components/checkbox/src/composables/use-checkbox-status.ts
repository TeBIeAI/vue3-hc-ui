import { isArray, isEqual, isObject } from 'lodash-es'
import { isBoolean } from '@vueuse/core'
import { ComponentInternalInstance, computed, ref, toRaw } from 'vue'
import { CheckboxProps } from '../checkbox'
import { CheckboxModel } from './use-checkbox-model'

export const useCheckboxStatus = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots'],
  { model }: Pick<CheckboxModel, 'model'>
) => {
  const isFocus = ref<boolean>(false)

  const isChecked = computed(() => {
    const value = model.value
    if (isBoolean(value)) {
      return value
    } else if (isArray(value)) {
      if (isObject(props.label)) {
        return value.map(toRaw).some((o) => isEqual(o, props.label))
      } else {
        return value.map(toRaw).includes(props.label)
      }
    } else {
      return !!value
    }
  })

  const hasOwnLabel = computed(() => !!(slots.default || props.label))

  return {
    hasOwnLabel,
    isChecked,
    isFocus
  }
}

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>
