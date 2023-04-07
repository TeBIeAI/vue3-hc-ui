<template>
  <div>
    <hc-checkbox-group v-model="checked1" @change="handleChange">
      <hc-checkbox label="Option 1" size="large" />
      <hc-checkbox label="Option 2" size="large" />
    </hc-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(['Option 1'])

const handleChange = (val: any) => {
  console.log(checked1.value)
}
</script>
