import type { Arrayable } from '@hc-ui/utils'
import type { RuleItem } from 'async-validator'
import type { SetupContext } from 'vue'
import type { FormEmits, FormProps } from './form'
import { FormItemProps } from './form-item'

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}

export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>

export type FormContext = FormProps & {
  emit: SetupContext<FormEmits>['emit']

  // expose
}

export interface FormItemContext extends FormItemProps {
  $el: HTMLDivElement | undefined
}
