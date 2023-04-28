<template>
  <hc-pagination
    v-model:current-page="currentPage"
    layout="prev, pager, next, jumper, total"
    :total="total"
    background
    @current-change="handleCurrentChange"
  ></hc-pagination>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const total = ref(132)
const currentPage = ref(10)

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
