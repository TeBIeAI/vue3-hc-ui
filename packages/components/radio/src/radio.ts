import { isBoolean, isNumber, isString } from '@vueuse/core'
import { buildProps } from '@hc-ui/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@hc-ui/constants'
import type { ExtractPropTypes } from 'vue'

import Radio from './radio.vue'

export const radioBaseProps = {
  /**
   * @description binding value
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  disabled: Boolean,
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  /**
   * @description native `name` attribute
   */
  name: {
    type: String,
    default: ''
  }
}

export const radioProps = buildProps({
  ...radioBaseProps,
  /**
   * @description whether to add a border around Radio
   */
  border: Boolean
} as const)

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val)
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioEmits = typeof radioEmits
export type RadioInstance = InstanceType<typeof Radio>
