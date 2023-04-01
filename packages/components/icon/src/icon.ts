import { buildProps } from '@hc-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const iconProps = buildProps({
  color: String,
  size: Number
})

export type IconProps = ExtractPropTypes<typeof iconProps>
