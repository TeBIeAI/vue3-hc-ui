import type { ExtractPropTypes } from 'vue'
import { buildProps, iconPropType } from '@hc-ui/utils'
import { useSizeProp } from '@hc-ui/hooks'
import { Loading } from '@element-plus/icons-vue'

export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  /**
   * @deprecated
   * Text type will be deprecated in the next major version (3.0.0)
   */
  'text',
  ''
] as const

export const buttonProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  type: {
    type: String,
    values: buttonTypes,
    default: ''
  },
  icon: {
    type: iconPropType
  },
  loading: Boolean,
  loadingIcon: {
    type: iconPropType,
    default: () => Loading
  },
  round: Boolean,
  circle: Boolean
} as const)

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
