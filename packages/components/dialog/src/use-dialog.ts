import { UPDATE_MODEL_EVENT } from './../../../constants/event'
import {
  computed,
  CSSProperties,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  SetupContext,
  watch
} from 'vue'
import type { Ref } from 'vue'
import { DialogEmits, DialogProps } from './dialog'
import { defaultNamespace, useZIndex } from '@hc-ui/hooks'

export const useDialog = (
  props: DialogProps,
  dialogRef: Ref<HTMLElement | undefined>
) => {
  const instance = getCurrentInstance()
  const emit = instance?.emit as SetupContext<DialogEmits>['emit']

  const namespace = defaultNamespace

  const { nextZIndex } = useZIndex()

  const visible = ref(false)
  const closed = ref(false)
  const rendered = ref(false)
  const zIndex = ref(props.zIndex || nextZIndex())

  const afterEnter = () => {
    emit('opened')
  }

  const afterLeave = () => {
    emit('closed')
    emit(UPDATE_MODEL_EVENT, false)
  }

  const beforeLeave = () => {
    emit('close')
  }

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

  const style = computed(() => {
    const style: CSSProperties = {}
    const varPrefix = `--${namespace}-dialog-width` as const

    if (props.width) {
      style[varPrefix] = props.width
    }
    return style
  })

  const onModalClick = () => {
    if (props.closeOnClickModal) {
      handleClose()
    }
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
      if (val) {
        open()
        rendered.value = true
        closed.value = false
        nextTick(() => {
          emit('open')
        })
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
    handleClose,
    zIndex,
    afterEnter,
    afterLeave,
    beforeLeave,
    onModalClick,
    style
  }
}
