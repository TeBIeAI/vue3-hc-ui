<template>
  <hc-dialog v-model="outerVisible" draggable title="Outer Dialog">
    <template #default>
      <hc-dialog
        v-model="innerVisible"
        draggable
        width="30%"
        title="Inner Dialog"
        append-to-body
      />
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="innerVisible = true">
          open the inner Dialog
        </el-button>
      </div>
    </template>
  </hc-dialog>

  <div>
    <button @click="outerVisible = true">打开弹框</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const outerVisible = ref(false)
const innerVisible = ref(false)

const handleOpen = () => {
  console.log('open')
}

const handleClose = (fn) => {
  fn()
  // dialogVisible.value = false
}
</script>
