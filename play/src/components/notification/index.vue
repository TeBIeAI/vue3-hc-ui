<template>
  <hc-button type="primary" @click="open">开启</hc-button>
</template>

<script lang="ts" setup>
import { HcNotification } from '@hc-ui/components'
import { h } from 'vue'

const open = () => {
  HcNotification({
    title: 'Title1',
    message: '你好',
    duration: 0
  })
}
</script>
