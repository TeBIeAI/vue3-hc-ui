<template>
  <i :class="ns.b()" :style="wrapperStyles" v-bind="$attrs">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { iconProps } from './icon'

defineOptions({
  name: 'HcIcon'
})

const props = defineProps(iconProps)
const ns = useNamespace('icon')

const wrapperStyles = computed<CSSProperties>(() => {
  return {
    fontSize: props.size ? `${props.size}px` : undefined,
    color: props.color
  }
})
</script>
