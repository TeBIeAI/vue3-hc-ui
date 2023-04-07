import { ExtractPropTypes } from 'vue'
import { buildProps, definePropType } from '@hc-ui/utils'
import { transferCheckedChangeFn, TransferKey, transferProps } from './transfer'

export const CHECKED_CHANGE_EVENT = 'checked-change'

export interface TransferPanelState {
  checked: TransferKey[]
  allChecked: boolean
}

export const transferPanelProps = buildProps({
  data: transferProps.data,
  title: String,
  props: transferProps.props,
  defaultChecked: transferProps.leftDefaultChecked
} as const)

export type TransferPanelProps = ExtractPropTypes<typeof transferPanelProps>

export const transferPanelEmits = {
  [CHECKED_CHANGE_EVENT]: transferCheckedChangeFn
}

export type TransferPanelEmits = typeof transferPanelEmits
