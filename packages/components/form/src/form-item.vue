<template>
  <div ref="formItemRef">
    <component :is="true && 'label'" v-if="hasLabel" :class="ns.e('label')">
      <slot name="label" :label="currentLabel">
        {{ currentLabel }}
      </slot>
    </component>
    <div :class="ns.e('content')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import { computed, provide, ref, useSlots } from 'vue'
import { formItemContextKey } from './constants'
import { formItemProps } from './form-item'
import { FormItemContext } from './types'

defineOptions({
  name: 'HcFormItem'
})

const props = defineProps(formItemProps)
const slots = useSlots()

const ns = useNamespace('form-item')
const formItemRef = ref<HTMLDivElement>()

const hasLabel = computed(() => !!(props.label || slots.label))

const currentLabel = computed(() => `${props.label || ''}`)

const context: FormItemContext = {
  ...props,
  $el: formItemRef.value
}

provide(formItemContextKey, context)
</script>
