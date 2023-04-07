import { computed, SetupContext, watch } from 'vue'
import { TransferKey } from '../transfer'
import {
  TransferPanelProps,
  TransferPanelState,
  TransferPanelEmits,
  CHECKED_CHANGE_EVENT
} from '../transfer-panel'
import { usePropsAlias } from './use-props-alias'

export const useChecked = (
  props: TransferPanelProps,
  panelState: TransferPanelState,
  emit: SetupContext<TransferPanelEmits>['emit']
) => {
  const propsAlias = usePropsAlias(props)

  const filterData = computed(() => {
    return props.data?.filter((item) => {
      const label = String(
        item[propsAlias.value.label] || item[propsAlias.value.key]
      )

      return label.toLowerCase()
    })
  })

  watch(
    () => props.defaultChecked,
    (val) => {
      // emit(CHECKED_CHANGE_EVENT, val)
    }
  )

  watch(
    () => props.data,
    () => {
      const checked: TransferKey[] = []
      const filteredDataKeys = filterData.value?.map(
        (item) => item[propsAlias.value.key]
      )

      panelState.checked.forEach((item) => {
        if (filteredDataKeys?.includes(item)) {
          checked.push(item)
        }
      })

      panelState.checked = checked
    }
  )

  watch(
    () => panelState.checked,
    (val) => {
      emit(CHECKED_CHANGE_EVENT, val)
    }
  )

  return {
    filterData
  }
}
