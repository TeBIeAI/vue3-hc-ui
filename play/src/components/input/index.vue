<template>
  <hc-input
    ref="inputRef"
    v-model="value"
    :maxlength="10"
    show-word-limit
    @input="handleInput"
    @change="handleChange"
    @blur="handleBlur"
    @focus="handleFocus"
    @mouse-leave="handleMouseLeave"
    @mouse-enter="handleMouseEnter"
  >
    <template #prepend>
      <span>append</span>
    </template>
    <template #append>
      <span>append</span>
    </template>
  </hc-input>

  <div>
    <button @click="inputRef?.select()">select</button>
    <button @click="inputRef?.blur(e)">blur</button>
    <button @click="inputRef?.focus(e)">fouse</button>
    <button @click="log1">fouse</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Calendar } from '@element-plus/icons-vue'
import { HcInput } from '@hc-ui/components'

const value = ref('')
const inputRef = ref<InstanceType<typeof HcInput>>()

const log1 = () => {
  console.log(inputRef.value?.input)
  console.log(inputRef.value?.ref)
}

const handleInput = (val) => {
  console.log('handleInput', val)
  console.log('value', value)
}
const handleChange = (val) => {
  console.log('handleChange', val)
  console.log('value', value)
}
const handleFocus = (val) => {
  console.log('handleFocus', val)
  console.log('value', value)
}
const handleBlur = (val) => {
  console.log('handleBlur', val)
  console.log('value', value)
}
const handleMouseEnter = (val) => {
  console.log('handleMouseEnter', val)
}
const handleMouseLeave = (val) => {
  console.log('handleMouseLeave', val)
}
</script>
