import { ComputedRef, InjectionKey, Ref, Slots, UnwrapRef } from 'vue'
import { TabPaneProps } from './tab-pane'
import { TabsProps } from './tabs'

export type TabsPaneContext = UnwrapRef<{
  uid: number
  slots: Slots
  props: TabPaneProps
  paneName: ComputedRef<string | number | undefined>
  active: ComputedRef<boolean>
  index: Ref<string | undefined>
  isClosable: ComputedRef<boolean>
}>

export interface TabsRootContext {
  props: TabsProps
  currentName: Ref<string | number>
  registerPane: (pane: TabsPaneContext) => void
  unregisterPane: (uid: number) => void
}

export const tabsRootContextKey: InjectionKey<TabsRootContext> =
  Symbol('tabsRootContextKey')
