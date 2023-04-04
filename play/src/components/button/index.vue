<template>
  <hc-button type="primary" disabled>自定义按钮</hc-button>
  <hc-button type="success" size="small" disabled>自定义按钮</hc-button>
  <hc-button circle type="success" size="small" disabled>a</hc-button>
  <hc-button type="success" size="small" loading>测试加载图片</hc-button>
  <hc-button type="success" size="small" :icon="Apple">测试加载图片</hc-button>
</template>

<script lang="ts" setup>
import { Apple } from '@element-plus/icons-vue'
</script>
