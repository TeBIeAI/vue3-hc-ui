import { getCurrentInstance } from 'vue'
import { CheckboxProps } from '../checkbox'
import type { CheckboxReturn } from './use-checkbox-model'

export const useCheckboxEvent = (
  props: CheckboxProps
  // { model }: CheckboxReturn['model']
) => {
  const { emit } = getCurrentInstance()!

  const getLabeledValue = (value: string | number | boolean) => {
    return value === props.trueLabel || value === true
      ? props.trueLabel ?? true
      : props.falseLabel ?? false
  }

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    emit('change', getLabeledValue(target.checked))
  }

  return {
    handleChange
  }
}
