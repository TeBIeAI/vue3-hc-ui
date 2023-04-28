import { buildProps, definePropType, Mutable, mutable } from '@hc-ui/utils'
import { ExtractPropTypes, VNode } from 'vue'

const messageTypes = ['success', 'warning', 'info', 'error'] as const

export const messageDefault = mutable({
  id: '',
  offset: 16,
  type: 'info',
  customClass: '',
  duration: 3000,
  showClose: false,
  onClose: undefined,
  appendTo: document.body,
  message: ''
} as const)

export const messageProps = buildProps({
  id: {
    type: String,
    default: messageDefault.id
  },
  offset: {
    type: Number,
    default: messageDefault.offset
  },
  type: {
    type: String,
    values: [...messageTypes],
    default: 'info'
  },
  customClass: {
    type: String,
    default: messageDefault.customClass
  },
  duration: {
    type: Number,
    default: messageDefault.duration
  },
  showClose: {
    type: Boolean,
    default: messageDefault.showClose
  },
  onClose: {
    type: definePropType<() => void>(Function),
    required: false
  },
  message: {
    type: definePropType<string | VNode | (() => void)>([
      String,
      Object,
      Function
    ])
  }
})

export const messageEmits = {
  close: () => true
}

export type MessageProps = ExtractPropTypes<typeof messageProps>
export type MessageEmits = typeof messageEmits

export type MessageOptions = Partial<Mutable<Omit<MessageProps, 'id'>>>

export type MessageParams = MessageOptions | MessageOptions['message']

export type MessageFn = {
  (options: MessageParams): void
}

export type MessageNormalizeOption = Omit<MessageProps, 'id'> & {
  appendTo?: HTMLElement
}
