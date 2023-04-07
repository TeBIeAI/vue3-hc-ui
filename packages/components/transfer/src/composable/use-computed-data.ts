import { computed } from 'vue'
import { TransferDataItem, TransferKey, TransferProps } from '../transfer'
import { usePropsAlias } from './use-props-alias'

export const useComputedData = (props: TransferProps) => {
  const propsAlias = usePropsAlias(props)

  const targetObj = computed(() =>
    props.data?.reduce((arr, cur: TransferDataItem) => {
      arr[cur.key] = cur
      return arr
    }, {})
  )

  const sourceData = computed(() => {
    return props.data?.filter((item) => {
      return !props.modelValue.includes(item[propsAlias.value.key])
    })
  })

  const targetData = computed(() => {
    return props.modelValue?.reduce(
      (arr: TransferDataItem[], cur: TransferKey) => {
        const value = targetObj.value![cur]
        if (value) arr.push(value)
        return arr
      },
      []
    )
  })

  return {
    sourceData,
    targetData
  }
}
