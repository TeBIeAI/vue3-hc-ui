import { ExtractPropTypes } from 'vue'
import { buildProps } from '@hc-ui/utils'

export const paginationTotalProps = buildProps({
  total: {
    type: Number,
    default: 1000
  }
} as const)

export type PaginationTotalProps = ExtractPropTypes<typeof paginationTotalProps>
