<template>
  <button
    ref="buttonRef"
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.is('disabled', disabled),
      ns.is('loading', loading),
      ns.is('circle', circle),
      ns.is('round', round)
    ]"
    :disabled="disabled || loading"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <hc-icon v-else :class="ns.is('loading')">
        <component :is="loadingIcon" />
      </hc-icon>
    </template>
    <template v-else-if="icon">
      <hc-icon>
        <component :is="icon" />
      </hc-icon>
    </template>
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import { ref } from 'vue'
import { buttonProps } from './button'
import { HcIcon } from '@hc-ui/components'

defineOptions({
  name: 'HcButton'
})

defineProps(buttonProps)

const buttonRef = ref()

const ns = useNamespace('button')

defineExpose({
  ref: buttonRef
})
</script>
