import { isBoolean } from '@vueuse/core'
import { buildProps, definePropType } from '@hc-ui/utils'
import { UPDATE_MODEL_EVENT } from '@hc-ui/constants'
import type { ExtractPropTypes } from 'vue'
import { dialogContentProps } from './dialog-content'

type DoneFn = (cancel?: boolean) => void
export type DialogBeforeCloseFn = (done: DoneFn) => void

export const dialogProps = buildProps({
  ...dialogContentProps,
  modelValue: {
    type: Boolean,
    default: false
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: definePropType<DialogBeforeCloseFn>(Function)
  },
  appendToBody: Boolean,
  openDelay: {
    type: [Number],
    default: 0
  },
  closeDelay: {
    type: [Number],
    default: 0
  },
  zIndex: Number,
  width: String
} as const)

export const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  openAutoFocus: () => true,
  closeAutoFocus: () => true,
  [UPDATE_MODEL_EVENT]: (val: boolean) => isBoolean(val)
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
export type DialogEmits = typeof dialogEmits
