import { computed, inject } from 'vue'
import { checkboxGroupContext } from '../constants'
import { CheckboxModel } from './use-checkbox-model'
import { CheckboxStatus } from './use-checkbox-status'
export const useCheckboxDisabled = ({
  model,
  isChecked
}: Pick<CheckboxModel, 'model'> & Pick<CheckboxStatus, 'isChecked'>) => {
  const checkboxGroup = inject(checkboxGroupContext, undefined)

  const isDisabeld = computed(() => checkboxGroup?.disabled)

  return { isDisabeld }
}
