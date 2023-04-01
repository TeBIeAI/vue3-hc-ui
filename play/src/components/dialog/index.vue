<template>
  <hc-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <button @click="dialogVisible = false">Cancel</button>
        <button type="primary" @click="dialogVisible = false">Confirm</button>
      </span>
    </template>
  </hc-dialog>

  <div>
    <button @click="handleClick">打开弹框</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)

const handleClick = () => {
  dialogVisible.value = true
}

const handleClose = (fn) => {
  fn()
  // dialogVisible.value = false
}
</script>
