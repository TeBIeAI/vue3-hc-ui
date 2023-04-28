import { buildProps, definePropType } from '@hc-ui/utils'
import { ExtractPropTypes } from 'vue'
import { FormRules } from './types'

export const formMetaProps = buildProps({
  disabled: Boolean
} as const)

export const formProps = buildProps({
  ...formMetaProps,
  model: Object,
  rules: {
    type: definePropType<FormRules>(Object)
  },
  labelPosition: {
    type: String,
    values: ['left', 'right', 'top'],
    default: 'right'
  },
  requireAsteriskPosition: {
    type: String,
    values: ['left', 'right'],
    default: 'left'
  },
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  labelSuffix: {
    type: String,
    default: ''
  },
  inline: Boolean,
  inlineMessage: Boolean,
  statusIcon: Boolean,
  showMessage: {
    type: Boolean,
    default: true
  },
  validateOnRuleChange: {
    type: Boolean,
    default: true
  }
} as const)

export type FormProps = ExtractPropTypes<typeof formProps>

export const formEmits = {}

export type FormEmits = typeof formEmits
