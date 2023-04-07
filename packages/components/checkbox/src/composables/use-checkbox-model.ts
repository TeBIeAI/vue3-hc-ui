import { UPDATE_MODEL_EVENT } from './../../../../constants/event'
import { isArray } from 'lodash-es'
import { computed, getCurrentInstance, inject } from 'vue'
import { CheckboxProps } from '../checkbox'
import { checkboxGroupContext } from '../constants'

export const useCheckboxModel = (props: CheckboxProps) => {
  const checkboxGroup = inject(checkboxGroupContext, undefined)!
  const isGroup = computed(() => !!checkboxGroup)
  const { emit } = getCurrentInstance()!

  const model = computed({
    get() {
      return isGroup.value ? checkboxGroup.modelValue?.value : props.modelValue
    },
    set(val: unknown) {
      if (isGroup.value && isArray(val)) {
        checkboxGroup.changeEvent?.(val)
      } else {
        emit(UPDATE_MODEL_EVENT, val)
      }
    }
  })

  return {
    model
  }
}

export type CheckboxReturn = ReturnType<typeof useCheckboxModel>
