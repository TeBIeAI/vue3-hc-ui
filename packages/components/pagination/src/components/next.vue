<template>
  <button
    :disabled="internalDisabled"
    type="button"
    class="btn-next"
    @click="$emit('click', $event)"
  >
    <span v-if="nextText">{{ nextText }}</span>
    <hc-icon v-else>
      <component :is="nextIcon" />
    </hc-icon>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { HcIcon } from '@hc-ui/components'
import { paginationNextEmits, paginationNextProps } from './next'

defineOptions({
  name: 'HcPaginationNext'
})

const props = defineProps(paginationNextProps)
defineEmits(paginationNextEmits)

const internalDisabled = computed(
  () =>
    props.disabled ||
    props.currentPage === props.pageCount ||
    props.pageCount === 0
)
</script>
