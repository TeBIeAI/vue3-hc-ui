import { computed } from 'vue'
import { CheckboxProps } from '../checkbox'

export const useCheckboxDisabled = (props: CheckboxProps) => {
  const isDisabled = computed(() => props.disabled)

  return {
    isDisabled
  }
}
