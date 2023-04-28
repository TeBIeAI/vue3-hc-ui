<template>
  <div v-if="shouldBeRender" v-show="active" :class="ns.b()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import {
  computed,
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useSlots
} from 'vue'
import { tabsRootContextKey } from './constants'
import { tabPaneProps } from './tab-pane'

defineOptions({
  name: 'HcTabPane'
})

const props = defineProps(tabPaneProps)
const slots = useSlots()
const instance = getCurrentInstance()!

const ns = useNamespace('tab-pane')

const tabsRoot = inject(tabsRootContextKey)!

const index = ref<string>()

const active = computed(
  () => tabsRoot.currentName.value === (props.name ?? index.value)
)

const isClosable = computed(() => props.closable || tabsRoot.props.closable)

const paneName = computed(() => props.name ?? index.value)

const shouldBeRender = computed(() => !props.lazy || active.value)

const pane = reactive({
  uid: instance.uid,
  props,
  active,
  paneName,
  index,
  slots,
  isClosable
})

onMounted(() => {
  tabsRoot.registerPane(pane)
})

onUnmounted(() => {
  tabsRoot.unregisterPane(pane.uid)
})
</script>
