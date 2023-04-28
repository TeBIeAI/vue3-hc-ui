<template>
  <div
    :class="containerCls"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="$slots.prepend" :class="nsInput.be('group', 'prepend')">
      <slot name="prepend" />
    </div>
    <div :class="wrapperCls">
      <!-- 前缀 -->
      <span v-if="prefixVisible" :class="nsInput.e('prefix')">
        <span :class="nsInput.e('prefix-inner')" @click="focus">
          <template v-if="!showClear && !showPassword">
            <slot name="prefix" />
            <hc-icon v-if="suffixIcon" :class="nsInput.e('icon')">
              <component :is="suffixIcon" />
            </hc-icon>
          </template>
        </span>
      </span>

      <input
        ref="input"
        v-bind="$attrs"
        :type="showPassword ? `${passwordVisible ? 'text' : 'password'}` : type"
        :readonly="readonly"
        :disabled="disabled"
        :class="nsInput.e('inner')"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <!-- 后缀 -->
      <span v-if="suffixVisible" :class="nsInput.e('suffix')">
        <span :class="nsInput.e('suffix-inner')" @click="focus">
          <template v-if="!showClear && !showPassword && !isWordLimitVisible">
            <slot name="suffix" />
            <hc-icon v-if="suffixIcon" :class="nsInput.e('icon')">
              <component :is="suffixIcon" />
            </hc-icon>
          </template>
          <hc-icon
            v-if="showClear"
            :class="[nsInput.e('icon'), nsInput.e('clear')]"
            @click="handleClear"
          >
            <circle-close />
          </hc-icon>
          <hc-icon
            v-if="showPwdVisible"
            :class="[nsInput.e('icon'), , nsInput.e('pwd')]"
            @click="handlePwd"
          >
            <component :is="IconPwd" />
          </hc-icon>
          <template v-if="isWordLimitVisible">
            {{ textLength }}/{{ $attrs.maxlength }}
          </template>
        </span>
      </span>
    </div>
    <div v-if="$slots.append" :class="nsInput.be('group', 'append')">
      <slot name="prepend" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UPDATE_MODEL_EVENT } from '@hc-ui/constants'
import { useNamespace } from '@hc-ui/hooks'
import {
  computed,
  nextTick,
  useSlots,
  onMounted,
  ref,
  shallowRef,
  watch
} from 'vue'
import { inputProps, inputEmits } from './input'
import { HcIcon } from '@hc-ui/components/icon'
import { CircleClose, View, Hide } from '@element-plus/icons-vue'

type TargetElement = HTMLInputElement | HTMLTextAreaElement

defineOptions({
  name: 'HcInput'
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()

const nsInput = useNamespace('input')

const input = shallowRef<HTMLInputElement>()
const hovering = ref(false)
const focused = ref(false)
const _ref = computed(() => input.value)
const passwordVisible = ref(false)

const nativeInputValue = computed(() => String(props.modelValue))

const showClear = computed(
  () =>
    props.clearable &&
    !!nativeInputValue.value &&
    !props.disabled &&
    !props.readonly &&
    (focused.value || hovering.value)
)

const suffixVisible = computed(
  () =>
    !!slots.suffix ||
    !!props.suffixIcon ||
    showClear.value ||
    props.showPassword ||
    isWordLimitVisible.value
)

const prefixVisible = computed(() => !!slots.prefix || !!props.prefixIcon)

const showPwdVisible = computed(
  () =>
    props.showPassword &&
    !showClear.value &&
    !!nativeInputValue.value &&
    !props.disabled &&
    !props.readonly
)

const isWordLimitVisible = computed(
  () =>
    props.showWordLimit &&
    !props.disabled &&
    !props.readonly &&
    !showClear.value
)

const IconPwd = computed(() => (passwordVisible.value ? Hide : View))
const textLength = computed(() => nativeInputValue.value.length)

const setNativeInputValue = () => {
  const input = _ref.value
  input!.value = nativeInputValue.value
}

const containerCls = computed(() => [
  nsInput.b(),
  nsInput.is('disabled', props.disabled),
  {
    [nsInput.b('group')]: slots.prepend || slots.append
  }
])

const wrapperCls = computed(() => [nsInput.e('wrapper')])

const handlePwd = () => {
  passwordVisible.value = !passwordVisible.value
}

const handleMouseEnter = (event: MouseEvent) => {
  hovering.value = true
  emit('mouseEnter', event)
}

const handleMouseLeave = (event: MouseEvent) => {
  hovering.value = false
  emit('mouseLeave', event)
}

const handleInput = async (event: Event) => {
  const { value } = event.target as TargetElement
  emit(UPDATE_MODEL_EVENT, value)
  emit('input', value)

  await nextTick()
  setNativeInputValue()
}

const handleChange = (event: Event) =>
  emit('change', (event.target as TargetElement).value)

const handleBlur = (event: FocusEvent) => {
  focused.value = false
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}

const focus = async (event: FocusEvent) => {
  await nextTick()
  _ref.value?.focus()
}

const handleClear = () => {
  emit(UPDATE_MODEL_EVENT, '')
  emit('change', '')
  emit('input', '')
}

const select = () => {
  _ref.value?.select()
}

watch(
  () => props.modelValue,
  (val) => {
    console.log(props.modelValue)
    console.log(nativeInputValue)
  }
)

watch(nativeInputValue, () => setNativeInputValue())

onMounted(async () => {
  setNativeInputValue()
})

defineExpose({
  input,
  ref: _ref,
  focus,
  blur: handleBlur,
  clear: handleClear,
  select: select
})
</script>
