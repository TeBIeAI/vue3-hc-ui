<template>
  <div :class="ns.b('panel')">
    <p :class="ns.be('panel', 'header')">
      <hc-checkbox v-model="allChecked"> </hc-checkbox>
    </p>

    <div :class="ns.be('panel', 'body')">
      <hc-checkbox-group v-model="checked">
        <hc-checkbox
          v-for="item in filterData"
          :key="item[propsAlias.key]"
          :label="item[propsAlias.key]"
        ></hc-checkbox>
      </hc-checkbox-group>
    </div>

    <p :class="ns.be('panel', 'footer')"></p>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import { HcCheckboxGroup, HcCheckbox } from '@hc-ui/components'
import { reactive, toRefs } from 'vue'
import { useChecked, usePropsAlias } from './composable'
import {
  transferPanelEmits,
  transferPanelProps,
  TransferPanelState
} from './transfer-panel'

defineOptions({
  name: 'HcTransferPanel'
})

const props = defineProps(transferPanelProps)
const emit = defineEmits(transferPanelEmits)

const propsAlias = usePropsAlias(props)

const ns = useNamespace('transfer')

const panelState = reactive<TransferPanelState>({
  checked: [],
  allChecked: false
})

const { filterData } = useChecked(props, panelState, emit)

const { checked, allChecked } = toRefs(panelState)
</script>
