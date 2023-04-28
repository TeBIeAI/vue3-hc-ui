import { ExtractPropTypes } from 'vue'
import { buildProps, iconPropType } from '@hc-ui/utils'

export const paginationNextProps = buildProps({
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    default: 50
  },
  nextText: String,
  nextIcon: {
    type: iconPropType
  }
} as const)

export const paginationNextEmits = {
  click: (ev: MouseEvent) => ev instanceof MouseEvent
}

export type PaginationNextProps = ExtractPropTypes<typeof paginationNextProps>

export type PaginationNextEmits = typeof paginationNextEmits
