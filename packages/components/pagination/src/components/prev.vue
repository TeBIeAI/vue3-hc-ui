<template>
  <button
    :disabled="internalDisabled"
    type="button"
    class="btn-prev"
    @click="$emit('click', $event)"
  >
    <span v-if="prevText">{{ prevText }}</span>
    <hc-icon v-else>
      <component :is="prevIcon" />
    </hc-icon>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { paginationPrevEmits, paginationPrevProps } from './prev'
import { HcIcon } from '@hc-ui/components'

defineOptions({
  name: 'HcPaginationPrev'
})

const props = defineProps(paginationPrevProps)
defineEmits(paginationPrevEmits)

const internalDisabled = computed(
  () => props.disabled || props.currentPage <= 1
)
</script>
