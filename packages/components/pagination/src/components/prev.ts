import { ExtractPropTypes } from 'vue'
import { buildProps, iconPropType } from '@hc-ui/utils'

export const paginationPrevProps = buildProps({
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  prevText: String,
  prevIcon: {
    type: iconPropType
  }
} as const)

export const paginationPrevEmits = {
  click: (ev: MouseEvent) => ev instanceof MouseEvent
}

export type PaginationPrevProps = ExtractPropTypes<typeof paginationPrevProps>

export type PaginationPrevEmits = typeof paginationPrevEmits
