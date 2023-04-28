import { Mutable } from '@hc-ui/utils'
import type { ComponentInternalInstance, VNode } from 'vue'
import { MessageProps } from './message'

export interface MessageContext {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  props: Mutable<MessageProps>
}
