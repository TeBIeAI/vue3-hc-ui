<template>
  <hc-button type="primary" @click="open">开启</hc-button>
  <div v-loading="isLoading" class="test-loading">展示loading</div>
</template>

<script lang="ts" setup>
import { HcLoading } from '@hc-ui/components'
import { ref } from 'vue'

const isLoading = ref(true)

// setTimeout(() => {
//   isLoading.value = false
// }, 2000)

const open = () => {
  const loading = HcLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })

  setTimeout(() => {
    loading.close()
  }, 2000)
}
</script>

<style scoped>
.test-loading {
  background-color: #ddd;
  color: red;
  width: 300px;
  height: 300px;
}
</style>
