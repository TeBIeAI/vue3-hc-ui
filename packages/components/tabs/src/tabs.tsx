import { buildProps } from '@hc-ui/utils'
import {
  defineComponent,
  getCurrentInstance,
  provide,
  ref,
  renderSlot
} from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useNamespace, useOrderedChildren } from '@hc-ui/hooks'
import { TabsPaneContext, tabsRootContextKey } from './constants'
import TabNav from './tab-nav'
import { isNumber, isString, isUndefined } from 'lodash-es'
import { UPDATE_MODEL_EVENT } from '@hc-ui/constants'

export type TabPaneName = string | number

export const tabsProps = buildProps({
  type: {
    type: String,
    values: ['card', ''],
    default: ''
  },
  activeName: {
    type: [String, Number]
  },
  closable: Boolean,
  modelValue: {
    type: [String, Number]
  },
  editable: Boolean,
  tabPosition: {
    type: String,
    values: ['top', 'right', 'bottom'],
    default: 'top'
  }
} as const)

export type TabsProps = ExtractPropTypes<typeof tabsProps>

const isPaneName = (value: unknown): value is TabPaneName =>
  isString(value) || isNumber(value)

export const tabsEmits = {
  [UPDATE_MODEL_EVENT]: (name: TabPaneName) => isPaneName(name),
  tabClick: (pane: TabsPaneContext, ev: Event) => ev instanceof Event,
  tabChange: (name: TabPaneName) => isPaneName(name),
  tabRemove: (name: TabPaneName) => isPaneName(name),
  edit: (name: TabPaneName) => isPaneName(name)
}

export type TabsEmits = typeof tabsEmits

export default defineComponent({
  name: 'HcTabs',

  props: tabsProps,
  emits: tabsEmits,

  setup(props, { slots, emit }) {
    const ns = useNamespace('tabs')

    const currentName = ref(props.modelValue ?? props.activeName ?? '0')

    const {
      children: panes,
      addChild: registerPane,
      removeChild: unregisterPane
    } = useOrderedChildren<TabsPaneContext>(getCurrentInstance()!, 'HcTabPane')

    const changeCurrentName = (value: TabPaneName) => {
      currentName.value = value
      emit(UPDATE_MODEL_EVENT, value)
      emit('tabChange', value)
    }

    const setCurrentName = (tabName?: TabPaneName) => {
      if (currentName.value === tabName || isUndefined(tabName)) return
      try {
        changeCurrentName(tabName)
      } catch {}
    }

    const handleTabClick = (
      tab: TabsPaneContext,
      tabName: TabPaneName,
      ev: Event
    ) => {
      if (tab.props.disabled) return
      setCurrentName(tabName)
      emit('tabClick', tab, ev)
    }

    const handleTabRemove = (pane: TabsPaneContext, ev: Event) => {
      if (pane.props.disabled || isUndefined(pane.props.name)) return
      ev.stopPropagation()
      emit('tabRemove', pane.props.name)
      emit('edit', pane.props.name)
    }

    provide(tabsRootContextKey, {
      props,
      currentName,
      registerPane,
      unregisterPane
    })

    return () => {
      const header = (
        <div class={[ns.e('header')]}>
          <TabNav
            currentName={currentName.value}
            type={props.type}
            panes={panes.value}
            editable={props.editable}
            onTabClick={handleTabClick}
            onTabRemove={handleTabRemove}
          />
        </div>
      )

      const panels = (
        <div class={ns.e('content')}>{renderSlot(slots, 'default')}</div>
      )

      return (
        <div
          class={[
            ns.b(),
            {
              [ns.m('card')]: props.type === 'card'
            }
          ]}
        >
          {...props.tabPosition !== 'bottom'
            ? [header, panels]
            : [panels, header]}
        </div>
      )
    }
  }
})
