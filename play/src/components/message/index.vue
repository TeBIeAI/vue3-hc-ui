<template>
  <hc-button type="primary" @click="open">开启</hc-button>
</template>

<script lang="ts" setup>
import { HcMessage } from '@hc-ui/components'

const open = () => {
  HcMessage({
    message: '你好'
  })
}
</script>
