import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '@hc-ui/constants'
import { buildProps, definePropType } from '@hc-ui/utils'
import { isArray } from 'lodash-es'
import type { ExtractPropTypes } from 'vue'
import { CheckboxValueType } from './checkbox'

export type CheckboxGroupValueType = (string | number)[]

export const checkboxGroupProps = buildProps({
  modelValue: {
    type: definePropType<CheckboxGroupValueType>(Array),
    default: () => []
  },
  disabled: Boolean,
  min: Number,
  max: Number,
  label: String,
  tag: {
    type: String,
    default: 'div'
  }
} as const)

export const checkboxGroupEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxGroupValueType) => isArray(val),
  change: (val: CheckboxValueType[]) => isArray(val)
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkboxGroupEmits
