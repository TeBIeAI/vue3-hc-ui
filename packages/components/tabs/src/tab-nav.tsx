import { useNamespace } from '@hc-ui/hooks'
import { buildProps, definePropType, mutable } from '@hc-ui/utils'
import { watch, defineComponent, getCurrentInstance } from 'vue'
import { TabsPaneContext } from './constants'
import { HcIcon } from '@hc-ui/components'
import { Close } from '@element-plus/icons-vue'

export const tabNavProps = buildProps({
  panes: {
    type: definePropType<TabsPaneContext[]>(Array),
    default: () => mutable([] as const)
  },
  currentName: {
    type: [String, Number],
    default: ''
  },
  editable: Boolean,
  type: {
    type: String,
    values: ['card', ''],
    default: ''
  }
} as const)

const tabNavEmits = {
  tabClick: (pane: TabsPaneContext, tabName: string | number, ev: Event) =>
    ev instanceof Event,
  tabRemove: (tab: TabsPaneContext, ev: Event) => ev instanceof Event
}

const TabNav = defineComponent({
  name: 'HcTabNav',

  props: tabNavProps,
  emits: tabNavEmits,

  setup(props, { emit }) {
    const ns = useNamespace('tabs')

    const vm = getCurrentInstance()!
    console.log(props.panes)

    watch(
      () => props.panes,
      () => vm.update(),
      { flush: 'post', deep: true }
    )

    return () => {
      const tabs = props.panes.map((pane, index) => {
        const uid = pane.uid
        const disabled = pane.props.disabled
        const tabName = pane.props.name ?? pane.index ?? `${index}`

        const tabLabelContent = pane.props.label
        const tabindex = !disabled && pane.active ? 0 : -1
        const closable = !disabled && (pane.isClosable || props.editable)

        const btnClose = closable ? (
          <HcIcon
            class="is-icon-close"
            onClick={(ev: MouseEvent) => emit('tabRemove', pane, ev)}
          >
            <Close />
          </HcIcon>
        ) : null

        return (
          <div
            class={[
              ns.e('item'),
              ns.is('active', pane.active),
              ns.is('disabled', disabled)
            ]}
            id={`tab-${tabName}`}
            key={`tab-${uid}`}
            tabindex={tabindex}
            onClick={(ev: MouseEvent) => {
              emit('tabClick', pane, tabName, ev)
            }}
          >
            {[tabLabelContent, btnClose]}
          </div>
        )
      })

      return (
        <div class={[ns.e('nav-wrap')]}>
          <div class={ns.e('nav-scroll')}>
            <div class={[ns.e('nav')]}>{...[tabs]}</div>
          </div>
        </div>
      )
    }
  }
})

export default TabNav
