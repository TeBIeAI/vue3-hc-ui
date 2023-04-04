import { getCurrentInstance } from 'vue'
import { CheckboxProps } from '../checkbox'

export const useCheckboxEvent = (props: CheckboxProps) => {
  const { emit } = getCurrentInstance()!

  function getLabeledVaue(value: string | number | boolean) {
    return value === true
  }

  const handleClick = (e: Event) => {
    const target = e.target as HTMLInputElement
    emit('change', true, e)
  }

  return {
    handleClick
  }
}
