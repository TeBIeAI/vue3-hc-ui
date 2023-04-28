import { FormItemContext } from './../types'
import { computed, inject } from 'vue'
import { formContextKey, formItemContextKey } from '../constants'

export const useFormItem = () => {
  const form = inject(formContextKey, undefined)
  const formItem = inject(formItemContextKey, undefined)

  return {
    form,
    formItem
  }
}

export type IUseFormItemInputCommonProps = {
  id?: string
  label?: string | number | boolean | Record<string, any>
}

export const useFormItemInputId = (
  props: Partial<IUseFormItemInputCommonProps>,
  { formItemContext }: { formItemContext: FormItemContext }
) => {
  const isLabeledByFormItem = computed<boolean>(() => {
    return !!(!props.label && formItemContext)
  })

  return {
    isLabeledByFormItem
  }
}
