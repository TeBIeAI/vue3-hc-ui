import { buildProps } from '@hc-ui/utils'
import { ExtractPropTypes } from 'vue'

export const paginationPagerProps = buildProps({
  currentPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    required: true
  },
  pagerCount: {
    type: Number,
    default: 7
  },
  disabled: Boolean
} as const)

export type PaginationPagerProps = ExtractPropTypes<typeof paginationPagerProps>
