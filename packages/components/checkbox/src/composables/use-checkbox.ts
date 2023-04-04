import { isArray } from 'lodash-es'
import type { ComponentInternalInstance } from 'vue'
import { CheckboxProps } from '../checkbox'
import { useCheckboxDisabled } from './use-checkbox-disabled'
import { useCheckboxEvent } from './use-checkbox-event'
import { CheckboxModel, useCheckboxModel } from './use-checkbox-model'
import { useCheckboxStatus } from './use-checkbox-status'

function setStoreChecked(
  props: CheckboxProps,
  { model }: Pick<CheckboxModel, 'model'>
) {
  function addStore() {
    if (isArray(model.value) && !model.value.includes(props.label)) {
      model.value.push(props.label)
    }
  }

  props.checked && addStore()
}

export const useCheckbox = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots']
) => {
  const { model, isGroup } = useCheckboxModel(props)
  const { isChecked } = useCheckboxStatus(props, slots, { model })
  const { isDisabeld } = useCheckboxDisabled({ model, isChecked })

  const { handleClick } = useCheckboxEvent(props)

  setStoreChecked(props, { model })

  return {
    model,
    isChecked,
    isDisabeld,
    handleClick
  }
}
