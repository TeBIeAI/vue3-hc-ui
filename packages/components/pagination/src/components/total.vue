<template>
  <span :class="ns.e('total')">
    {{ total }}
  </span>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import { paginationTotalProps } from './total'

defineOptions({
  name: 'PaginationTotal'
})

defineProps(paginationTotalProps)
const ns = useNamespace('pagination')
</script>
