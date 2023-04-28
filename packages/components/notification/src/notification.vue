<template>
  <transition
    :name="ns.b('fade')"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :class="[ns.b(), horizontalClass]"
      :style="positionStyle"
    >
      <div :class="ns.e('group')">
        <h2 :class="ns.e('title')">{{ title }}</h2>
        <div :class="ns.e('content')">
          {{ message }}
        </div>
        <hc-icon v-if="showClose" @click.stop="close">
          <Close />
        </hc-icon>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useGlobalComponentSettings } from '@hc-ui/hooks'
import { computed, CSSProperties, onMounted, ref } from 'vue'
import { notificationEmits, notificationProps } from './notification'
import { HcIcon } from '@hc-ui/components'
import { Close } from '@element-plus/icons-vue'

const props = defineProps(notificationProps)
defineEmits(notificationEmits)

const visible = ref(false)

const { zIndex, ns } = useGlobalComponentSettings('notification')
const { currentZIndex, nextZIndex } = zIndex

const horizontalClass = computed(() =>
  props.position.endsWith('right') ? 'right' : 'left'
)

const positionStyle = computed<CSSProperties>(() => {
  return {
    top: `${props.offset}px`,
    zIndex: currentZIndex.value
  }
})

const close = () => {
  visible.value = false
}

const startTimer = () => {
  if (props.duration > 0) {
    setTimeout(() => {
      close()
    }, props.duration)
  }
}

onMounted(() => {
  startTimer()
  nextZIndex()
  visible.value = true
})
</script>
