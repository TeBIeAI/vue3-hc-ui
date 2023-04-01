import { buildProps } from '@hc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import { radioBaseProps, radioEmits } from './radio'

export const radioGroupProps = buildProps({
  ...radioBaseProps,
  role: {
    type: String,
    default: 'radiogroup'
  }
} as const)

export const radioGroupEmits = radioEmits

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupEmits = typeof radioGroupEmits
