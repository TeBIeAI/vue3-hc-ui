<template>
  <div ref="dialogRef" :class="ns.b()" :style="style">
    <!-- header -->
    <header ref="headerRef" :class="ns.e('header')">
      <slot name="header">
        <span :class="ns.e(title)">{{ title }}</span>
      </slot>
      <button v-if="showClose" :class="ns.e('headerbtn')">
        <hc-icon @click="$emit('close')">
          <close></close>
        </hc-icon>
      </button>
    </header>
    <!-- body -->
    <div :class="ns.e('body')">
      <slot />
    </div>
    <!-- footer -->
    <footer v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { dialogContentEmits, dialogContentProps } from './dialog-content'
import { HcIcon } from '@hc-ui/components'
import { Close } from '@element-plus/icons-vue'
import { computed, inject } from 'vue'
import { dialogInjectionKey } from './constants'
import { useDraggable } from '@hc-ui/hooks'

defineOptions({
  name: 'HcDialogContent'
})

const { ns, style, dialogRef, headerRef } = inject(
  dialogInjectionKey,
  undefined
)!

const props = defineProps(dialogContentProps)
defineEmits(dialogContentEmits)

const draggable = computed(() => props.draggable)
debugger
useDraggable(dialogRef, headerRef, draggable)
</script>
