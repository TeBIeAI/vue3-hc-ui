<template>
  <Teleport to="body" :disabled="!appendToBody">
    <transition
      name="dialog-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <div
        v-show="visible"
        role="dialog"
        :class="`${ns.namespace}-overlay-dialog`"
        :zIndex="zIndex"
        @click="overlayEvent.onClick"
        @mousedown="overlayEvent.onMousedown"
        @mouseup="overlayEvent.onMouseup"
      >
        <hc-dialog-content
          :title="title"
          :draggable="draggable"
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
    </transition>
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

const {
  visible,
  handleClose,
  onModalClick,
  zIndex,
  afterEnter,
  afterLeave,
  beforeLeave,
  style
} = useDialog(props, dialogRef)

const overlayEvent = useSameTarget(onModalClick)

provide(dialogInjectionKey, {
  ns,
  dialogRef,
  headerRef,
  style
})
</script>
