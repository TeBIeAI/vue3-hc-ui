<template>
  <hc-radio-group v-model="radio" @change="handleChange">
    <hc-radio label="option1">Option A</hc-radio>
    <hc-radio label="option2">Option B</hc-radio>
    <hc-radio label="option3">Option C</hc-radio>
  </hc-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('option2')

const handleChange = (val) => {
  radio.value
}
</script>
