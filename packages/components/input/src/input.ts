import { UPDATE_MODEL_EVENT } from './../../../constants/event'
import { buildProps, definePropType } from '@hc-ui/utils'
import { isString } from '@vueuse/core'
import type { Component, ExtractPropTypes } from 'vue'

export const inputProps = buildProps({
  type: {
    type: String,
    values: ['text', 'textarea', 'number'],
    default: 'text'
  },
  modelValue: {
    type: definePropType<string | number | undefined | null>([
      Object,
      String,
      Number
    ]),
    default: ''
  },
  disabled: Boolean,
  readonly: Boolean,
  clearable: Boolean,
  showPassword: Boolean,
  suffixIcon: {
    type: definePropType<string | Component>([String, Object, Function])
  },
  prefixIcon: {
    type: definePropType<string | Component>([String, Object, Function])
  },
  showWordLimit: Boolean
} as const)

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  blur: (event: FocusEvent) => event instanceof FocusEvent,
  focus: (event: FocusEvent) => event instanceof FocusEvent,
  mouseEnter: (event: MouseEvent) => event instanceof MouseEvent,
  mouseLeave: (event: MouseEvent) => event instanceof MouseEvent
}

export type InputProps = ExtractPropTypes<typeof inputProps>
