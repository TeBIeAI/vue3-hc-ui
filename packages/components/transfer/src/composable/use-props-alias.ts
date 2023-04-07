import { TransferPropsAlias } from './../transfer'
import { computed } from 'vue'

export const usePropsAlias = (props: { props: TransferPropsAlias }) => {
  const initProps: Required<TransferPropsAlias> = {
    label: 'label',
    key: 'key',
    disabled: 'disabled'
  }

  return computed(() => ({
    ...initProps,
    ...props.props
  }))
}
