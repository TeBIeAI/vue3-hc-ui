import { UPDATE_MODEL_EVENT } from '@hc-ui/constants'
import { buildProps, definePropType } from '@hc-ui/utils'
import { isBoolean, isNumber, isString } from 'lodash-es'
import type { ExtractPropTypes } from 'vue'

export type CheckboxValueType = string | number | boolean

export const checkboxProps = buildProps({
  modelValue: {
    type: [Number, String, Boolean],
    default: undefined
  },
  label: {
    type: [String, Boolean, Object, Number]
  },
  disabled: Boolean,
  checked: Boolean,
  name: String
} as const)

export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxValueType) =>
    isNumber(val) || isString(val) || isBoolean(val),
  CHANGE_EVENT: (val: CheckboxValueType) =>
    isNumber(val) || isString(val) || isBoolean(val)
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxEmits = typeof checkboxEmits
