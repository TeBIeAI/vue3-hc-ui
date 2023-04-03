import { buildProps } from '@hc-ui/utils'

export const dialogContentProps = buildProps({
  center: {
    type: Boolean,
    default: false
  },
  closeIcon: {
    type: [String, Object]
  },
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  },
  draggable: Boolean
} as const)

export const dialogContentEmits = {
  close: () => true
}
