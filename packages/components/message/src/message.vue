<template>
  <transition @before-leave="close">
    <div
      v-show="visible"
      :id="id"
      ref="messageRef"
      :class="[ns.b(), customClass]"
      :style="positionStyle"
    >
      <div :class="ns.e('group')">
        <slot>
          <p>{{ message }}</p>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useGlobalComponentSettings } from '@hc-ui/hooks'
import { computed, CSSProperties, onMounted, ref } from 'vue'
import { messageEmits, messageProps } from './message'

defineOptions({
  name: 'HcMessage'
})

defineProps(messageProps)
defineEmits(messageEmits)

const visible = ref(false)
const messageRef = ref<HTMLDivElement>()

const { ns, zIndex } = useGlobalComponentSettings('message')
const { currentZIndex, nextZIndex } = zIndex

const positionStyle = computed<CSSProperties>(() => ({
  zIndex: currentZIndex.value
}))

const close = () => {
  visible.value = false
}

onMounted(() => {
  visible.value = true
  nextZIndex()
})
</script>
