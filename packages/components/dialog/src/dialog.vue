<template>
  <Teleport to="body" :disabled="!appendToBody">
    <div
      v-show="visible"
      role="dialog"
      :class="`${ns.namespace}-overlay-dialog`"
      @click="overlayEvent.onClick"
      @mousedown="overlayEvent.onMousedown"
      @mouseup="overlayEvent.onMouseup"
    >
      <hc-dialog-content
        :title="title"
        :show-close="showClose"
        @close="handleClose"
      >
        <template #header>
          <slot v-if="!$slots.title" name="header" />
          <slot v-else name="title" />
        </template>
        <slot />
        <template v-if="$slots.footer" #footer>
          <slot name="footer" />
        </template>
      </hc-dialog-content>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { useNamespace, useSameTarget } from '@hc-ui/hooks'
import { provide, ref } from 'vue'
import { dialogInjectionKey } from './constants'
import { dialogEmits, dialogProps } from './dialog'
import HcDialogContent from './dialog-content.vue'
import { useDialog } from './use-dialog'

defineOptions({
  name: 'HcDialog',
  inheritAttrs: false
})

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)

const ns = useNamespace('dialog')
const dialogRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()

const { visible, handleClose } = useDialog(props, dialogRef)

const aaa = () => {
  debugger
}

const overlayEvent = useSameTarget(handleClose)

provide(dialogInjectionKey, {
  ns,
  dialogRef,
  headerRef
})
</script>
