import { UPDATE_MODEL_EVENT } from './../../../../constants/event'
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
    set(val) {
      if (isGroup.value) {
        checkboxGroup.changeEvent?.(val)
      } else {
        emit(UPDATE_MODEL_EVENT, val)
      }
    }
  })

  return {
    model,
    isGroup
  }
}

export type CheckboxModel = ReturnType<typeof useCheckboxModel>
