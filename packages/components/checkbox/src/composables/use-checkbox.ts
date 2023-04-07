import type { CheckboxProps } from '../checkbox'
import type { ComponentInternalInstance } from 'vue'
import { useCheckboxStatus } from './use-checkbox-status'
import { useCheckboxDisabled } from './use-checkbox-disabled'
import { useCheckboxModel } from './use-checkbox-model'
import { useCheckboxEvent } from './use-checkbox-event'

export const useCheckbox = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots']
) => {
  const { model } = useCheckboxModel(props)
  const { hasOwnLabel, isChecked } = useCheckboxStatus(props, slots, model)
  const { isDisabled } = useCheckboxDisabled(props)

  const { handleChange } = useCheckboxEvent(props)

  return {
    hasOwnLabel,
    isDisabled,
    isChecked,
    model,
    handleChange
  }
}
