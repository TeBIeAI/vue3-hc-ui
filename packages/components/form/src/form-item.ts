import { Arrayable, buildProps, definePropType } from '@hc-ui/utils'
import { ExtractPropTypes } from 'vue'

export type FormItemProp = Arrayable<string>

export const formItemProps = buildProps({
  label: String,
  prop: {
    type: definePropType<FormItemProp>([String, Array])
  },
  inlineMessage: {
    type: [String, Boolean],
    default: ''
  },
  showMessage: {
    type: Boolean,
    default: true
  }
} as const)

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
