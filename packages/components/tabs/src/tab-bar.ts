import { ExtractPropTypes } from 'vue'
import { buildProps, definePropType, mutable } from '@hc-ui/utils'
import { TabsPaneContext } from './constants'

export const tabBarProps = buildProps({
  tabs: {
    type: definePropType<TabsPaneContext>(Array),
    default: () => mutable([] as const)
  }
} as const)

export type TabBarProps = ExtractPropTypes<typeof tabBarProps>
