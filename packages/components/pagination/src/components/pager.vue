<template>
  <ul :class="nsPager.b()" @click="onPagerClick">
    <li v-if="pageCount > 0" :class="nsPager.is('active', currentPage === 1)">
      1
    </li>
    <li v-if="showPrevMore">prev</li>
    <li
      v-for="pager in pagers"
      :key="pager"
      :class="nsPager.is('active', currentPage === pager)"
    >
      {{ pager }}
    </li>
    <li v-if="showNextMore">next</li>
    <li
      v-if="pageCount > 1"
      :class="nsPager.is('active', currentPage === pageCount)"
    >
      {{ pageCount }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import { computed, ref, watchEffect } from 'vue'
import { paginationPagerProps } from './pager'

defineOptions({
  name: 'HcPaginationPager'
})
const props = defineProps(paginationPagerProps)

const showPrevMore = ref(false)
const showNextMore = ref(false)

const emit = defineEmits(['change'])
const nsPager = useNamespace('pager')

const pagers = computed(() => {
  const pagerCount = props.pagerCount
  const currentPage = Number(props.currentPage)
  const pageCount = Number(props.pageCount)
  const halfPagerCount = (pagerCount - 1) / 2
  let showPrevMore = false
  let showNextMore = false

  if (pageCount > pagerCount) {
    if (currentPage > pagerCount - halfPagerCount) {
      showPrevMore = true
    }
    if (currentPage < pageCount - halfPagerCount) {
      showNextMore = true
    }
  }

  const array: number[] = []
  if (showPrevMore && !showNextMore) {
    const startPage = pageCount - (pagerCount - 2)
    for (let i = startPage; i < pageCount; i++) {
      array.push(i)
    }
  } else if (!showPrevMore && showNextMore) {
    for (let i = 2; i < pagerCount; i++) {
      array.push(i)
    }
  } else if (showPrevMore && showNextMore) {
    const offset = Math.floor(pagerCount / 2) - 1
    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
      array.push(i)
    }
  } else {
    for (let i = 2; i < pageCount; i++) {
      array.push(i)
    }
  }

  return array
})

watchEffect(() => {
  const halfPagerCount = (props.pagerCount - 1) / 2
  showPrevMore.value = false
  showNextMore.value = false

  if (props.pageCount > props.pagerCount) {
    if (props.currentPage > props.pagerCount - halfPagerCount) {
      showPrevMore.value = true
    }
    if (props.currentPage < props.pageCount! - halfPagerCount) {
      showNextMore.value = true
    }
  }
})

const onPagerClick = (ev: UIEvent) => {
  const target = ev.target as HTMLElement
  let newPage = Number(target.textContent)
  const currentPage = props.currentPage

  if (currentPage !== newPage) {
    emit('change', newPage)
  }
}
</script>
