import { TransferKey } from '../transfer'
import { CheckedStats } from '../transfer.vue'

export const useCheckedChange = (checkedState: CheckedStats) => {
  const onSourceCheckedChange = (val: TransferKey[]) => {
    checkedState.leftChecked = val
  }

  const onTargetCheckedChange = (val: TransferKey[]) => {
    checkedState.rightChecked = val
  }

  return {
    onSourceCheckedChange,
    onTargetCheckedChange
  }
}
