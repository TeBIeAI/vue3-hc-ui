<template>
  <label
    :class="[
      ns.b(),
      { [ns.is('disabled')]: disabled },
      { [ns.is('focus')]: focus },
      { [ns.is('checked')]: modelValue === label }
    ]"
  >
    <span
      :class="[
        ns.e('input'),
        {
          [ns.is('disabled')]: disabled,
          [ns.is('checked')]: modelValue === label
        }
      ]"
    >
      <input
        id=""
        ref="radioRef"
        v-model="modelValue"
        type="radio"
        :disabled="disabled"
        :name="name"
        :value="label"
        :checked="modelValue === label"
        :class="ns.e('origin')"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleClick"
      />
      <span :class="ns.e('inner')"></span>
    </span>
    <span :class="ns.e('label')">
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import { computed, nextTick } from 'vue'
import { radioEmits, radioProps } from './radio'
import { useRadio } from './use-radio'

defineOptions({
  name: 'HcRadio'
})

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const ns = useNamespace('radio')

const { disabled, modelValue, focus, radioRef } = useRadio(props, emit)

const handleClick = (e: Event) => {
  nextTick(() => emit('change', modelValue.value))
}
</script>

<style scoped></style>
