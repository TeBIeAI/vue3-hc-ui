import { UPDATE_MODEL_EVENT } from './../../../constants/event'
import { isArray } from 'lodash-es'
import { CHANGE_EVENT } from '@hc-ui/constants'
import { buildProps, definePropType, mutable } from '@hc-ui/utils'
import { ExtractPropTypes } from 'vue'

export type TransferPropsAlias = {
  label?: string
  key?: string
  disabled?: string
}

export type TransferKey = string | number

export type TransferDataItem = Record<string, any>

export const transferProps = buildProps({
  modelValue: {
    type: definePropType<TransferKey[]>(Array),
    default: () => []
  },
  leftDefaultChecked: {
    type: definePropType<TransferKey[]>(Array),
    default: () => []
  },
  rightDefaultChecked: {
    type: definePropType<TransferKey[]>(Array),
    default: () => []
  },
  data: {
    type: definePropType<TransferDataItem[]>(Array)
  },
  titles: {
    type: definePropType<[string, string]>(Array),
    default: () => []
  },
  props: {
    type: definePropType<TransferPropsAlias>(Object),
    default: () =>
      mutable({
        label: 'label',
        key: 'key',
        disabled: 'disabled'
      } as const)
  }
} as const)

export type TransferProps = ExtractPropTypes<typeof transferProps>

export const transferEmits = {
  [CHANGE_EVENT]: (value: TransferKey[]) => [value].every(isArray),
  [UPDATE_MODEL_EVENT]: (value: TransferKey[]) => [value].every(isArray)
}

export const transferCheckedChangeFn = (value: TransferKey[]) =>
  [value].every(isArray)

export type TransferEmits = typeof transferEmits
