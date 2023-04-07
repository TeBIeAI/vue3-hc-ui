import { TransferEmits, TransferKey } from './../transfer'
import { usePropsAlias } from './use-props-alias'
import { TransferDataItem, TransferProps } from '../transfer'
import { CheckedStats } from '../transfer.vue'
import { SetupContext } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@hc-ui/constants'

export const useMove = (
  props: TransferProps,
  checkedState: CheckedStats,
  emit: SetupContext<TransferEmits>['emit']
) => {
  const propsAlias = usePropsAlias(props)

  const _emit = (value: TransferKey[], direction: string) => {
    emit(UPDATE_MODEL_EVENT, value)
    emit(CHANGE_EVENT, value)
  }

  const addToLeft = () => {
    const currentValue = props.modelValue.slice()

    checkedState.rightChecked.forEach((item) => {
      const index = currentValue.indexOf(item)
      if (index > -1) {
        currentValue.splice(index, 1)
      }
    })
    _emit(currentValue, 'left')
  }

  const addToRight = () => {
    let currentValue = props.modelValue.slice()

    const itemToBeMoved = props.data
      ?.filter((item: TransferDataItem) => {
        const itemKey = item[propsAlias.value.key]
        return (
          checkedState.leftChecked.includes(itemKey) &&
          !props.modelValue.includes(itemKey)
        )
      })
      .map((item) => item[propsAlias.value.key])

    currentValue = [...currentValue, ...(itemToBeMoved as any)]

    _emit(currentValue, 'right')
  }

  return {
    addToRight,
    addToLeft
  }
}
