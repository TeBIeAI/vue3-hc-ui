import { NoopWithInstall, withInstall } from '@hc-ui/utils/vue/install'
import TabPane from './src/tab-pane.vue'
import Tabs from './src/tabs'

import './style'

export const HcTabs = withInstall(Tabs, {
  TabPane
})
export const HcTabPane = NoopWithInstall(TabPane)

export default HcTabs

export * from './src/tab-pane'
