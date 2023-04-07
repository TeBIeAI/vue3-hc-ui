<template>
  <div :class="ns.b()">
    <!-- source data -->
    <hc-transfer-panel
      :data="sourceData"
      :props="props"
      :title="sourceTitle"
      @checked-change="onSourceCheckedChange"
    ></hc-transfer-panel>

    <!-- handle BTN -->
    <div>
      <hc-button
        :disabled="isEmpty(checkedState.rightChecked)"
        :icon="ArrowLeft"
        type="primary"
        @click="addToLeft"
      ></hc-button>
      <hc-button
        :icon="ArrowRight"
        type="primary"
        :disabled="isEmpty(checkedState.leftChecked)"
        @click="addToRight"
      ></hc-button>
    </div>

    <!-- target DATA -->
    <hc-transfer-panel
      :data="targetData"
      :props="props"
      :title="targetTitle"
      @checked-change="onTargetCheckedChange"
    ></hc-transfer-panel>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hc-ui/hooks'
import { transferEmits, TransferKey, transferProps } from './transfer'
import { useMove, useCheckedChange, useComputedData } from './composable'
import HcTransferPanel from './transfer-panel.vue'
import { HcButton } from '@hc-ui/components'
import { computed, reactive } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { isEmpty } from 'lodash-es'

export interface CheckedStats {
  leftChecked: TransferKey[]
  rightChecked: TransferKey[]
}

defineOptions({
  name: 'HcTransfer'
})

const props = defineProps(transferProps)
const emit = defineEmits(transferEmits)

const ns = useNamespace('transfer')

const sourceTitle = computed(() => props.titles[0])
const targetTitle = computed(() => props.titles[1])

const checkedState = reactive<CheckedStats>({
  leftChecked: [],
  rightChecked: []
})

const { onSourceCheckedChange, onTargetCheckedChange } =
  useCheckedChange(checkedState)

const { sourceData, targetData } = useComputedData(props)

const { addToRight, addToLeft } = useMove(props, checkedState, emit)
</script>
