import type { ToRefs, InjectionKey, WritableComputedRef } from 'vue'
import { CheckboxGroupProps, CheckboxGroupValueType } from './checkbox-group'

export type CheckboxContext = {
  modelValue?: WritableComputedRef<any>
  changeEvent?: (val: CheckboxGroupValueType) => any
} & ToRefs<Pick<CheckboxGroupProps, 'min' | 'max' | 'disabled'>>

export const checkboxGroupContext: InjectionKey<CheckboxContext> =
  Symbol('checkbox-group')
