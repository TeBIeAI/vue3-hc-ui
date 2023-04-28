import { buildProps, definePropType, iconPropType } from '@hc-ui/utils'
import type { ExtractPropTypes, VNode } from 'vue'
import type Notification from './notification.vue'

export const notificationTypes = [
  'success',
  'info',
  'warning',
  'error'
] as const

export const notificationProps = buildProps({
  customClass: {
    type: String,
    default: ''
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 4500
  },
  icon: {
    type: iconPropType
  },
  id: {
    type: String,
    default: ''
  },
  message: {
    type: definePropType<string | VNode>([String, Object]),
    default: ''
  },
  offset: {
    type: Number,
    default: 0
  },
  onClick: {
    type: definePropType<() => void>(Function),
    default: () => undefined
  },
  onClose: {
    type: definePropType<() => void>(Function),
    required: true
  },
  position: {
    type: String,
    values: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    default: 'top-right'
  },
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    values: [...notificationTypes, ''],
    default: ''
  },
  zIndex: {
    type: Number,
    default: 0
  }
} as const)
export type NotificationProps = ExtractPropTypes<typeof notificationProps>

export const notificationEmits = {
  destroy: () => true
}
export type NotificationEmits = typeof notificationEmits

export type NotificationInstance = InstanceType<typeof Notification>

export type NotificationOptions = Omit<NotificationProps, 'id'> & {
  appendTo?: HTMLElement
}

export type NotificationParams = Partial<NotificationOptions>

export type NotifyFn = (options?: NotificationParams) => void

export type NotificationQueueItem = {
  vm: VNode
}

export type NotificationQueue = NotificationQueueItem[]
