<template>
  <div>
    <hc-checkbox-group v-model="checked1" @change="handleChage">
      <hc-checkbox label="Option 1" size="large" />
      <hc-checkbox checked label="Option 2" size="large" />
    </hc-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(['Option 1'])

const handleChage = (val: any) => {
  console.log(checked1)
}
</script>
