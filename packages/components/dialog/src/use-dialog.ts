import { onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { DialogProps } from './dialog'

export const useDialog = (
  props: DialogProps,
  dialogRef: Ref<HTMLElement | undefined>
) => {
  const visible = ref(false)
  const closed = ref(false)
  const rendered = ref(false)

  const open = () => {
    doOpen()
  }

  const close = () => {
    doClose()
  }

  const doOpen = () => {
    visible.value = true
  }

  const doClose = () => {
    visible.value = false
  }

  function handleClose() {
    function hide() {
      visible.value = false
      rendered.value = false
    }
    if (props.beforeClose) {
      props.beforeClose(hide)
    } else {
      close()
    }
  }

  watch(
    () => props.modelValue,
    (val) => {
      debugger
      if (val) {
        open()
        rendered.value = true
        closed.value = false
      } else {
        if (visible.value) {
          close()
        }
      }
    }
  )

  onMounted(() => {
    if (props.modelValue) {
      rendered.value = true
      visible.value = true
      open()
    }
  })

  return {
    visible,
    open,
    close,
    closed,
    rendered,
    handleClose
  }
}
