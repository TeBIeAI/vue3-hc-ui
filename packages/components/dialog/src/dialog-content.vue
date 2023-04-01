<template>
  <div>
    <!-- header -->
    <header>
      <slot name="header">
        <span>{{ title }}</span>
      </slot>
      <button v-if="showClose">
        <hc-icon @click="$emit('close')">
          <circle-close></circle-close>
        </hc-icon>
      </button>
    </header>
    <!-- body -->
    <div>
      <slot />
    </div>
    <!-- footer -->
    <footer v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { dialogContentEmits, dialogContentProps } from './dialog-content'
import { HcIcon } from '@hc-ui/components'
import { CircleClose } from '@element-plus/icons-vue'

defineOptions({
  name: 'HcDialogContent'
})

const props = defineProps(dialogContentProps)
const emit = defineEmits(dialogContentEmits)
</script>
