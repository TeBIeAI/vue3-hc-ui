import { UPDATE_MODEL_EVENT } from '@hc-ui/constants'
import { computed, inject, nextTick, ref } from 'vue'
import type { SetupContext } from 'vue'
import { RadioEmits, RadioProps } from './radio'
import { radioGroupKey } from './constants'

export const useRadio = (
  props: RadioProps,
  // props: { label: RadioProps['label']; modelValue?: RadioProps['modelValue'] },
  emit?: SetupContext<RadioEmits>['emit']
) => {
  const radioGroup = inject(radioGroupKey, undefined)!
  const isGroup = computed(() => !!radioGroup)
  const focus = ref(false)
  const disabled = computed(() => radioGroup.disabled)
  const radioRef = ref<HTMLInputElement>()
  const modelValue = computed<RadioProps['modelValue']>({
    get() {
      return isGroup.value ? radioGroup.modelValue : props.modelValue!
    },
    set(val) {
      if (isGroup.value) {
        radioGroup.changeEvent(val)
      } else {
        emit && emit(UPDATE_MODEL_EVENT, val)
      }
      radioRef.value!.checked = props.modelValue === modelValue.value
    }
  })

  return {
    modelValue,
    focus,
    disabled,
    radioRef,
    isGroup
  }
}
