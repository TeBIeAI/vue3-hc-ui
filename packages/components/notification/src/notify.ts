import { isElement } from '@hc-ui/utils'
import { isString } from 'lodash-es'
import { createVNode, isVNode, render } from 'vue'
import {
  NotificationOptions,
  NotificationProps,
  NotificationQueue,
  NotifyFn
} from './notification'
import NotificationInstance from './notification.vue'

const notifications: Record<string, NotificationQueue> = {
  'top-right': []
}

const GAP_SIZE = 16
let seed = 1

const notify: NotifyFn = function (options = {}) {
  if (typeof options === 'string' || isVNode(options)) {
    options = { message: options }
  }

  const position = options.position || 'top-right'

  let verticalOffset = options.offset || 0

  notifications[position].forEach(({ vm }) => {
    verticalOffset += (vm.el?.offsetHeight || 0) + GAP_SIZE
  })
  verticalOffset += GAP_SIZE

  const id = `notification_${seed++}`
  const props: Partial<NotificationProps> = {
    ...options,
    id,
    offset: verticalOffset,
    onClose: () => {
      close(id, position)
    }
  }

  let appendTo: HTMLElement | null = document.body
  if (isElement(options.appendTo)) {
    appendTo = options.appendTo
  } else if (isString(options.appendTo)) {
    appendTo = document.querySelector(options.appendTo)
  }

  if (!isElement(appendTo)) {
    console.warn(
      'ElNotification',
      'the appendTo option is not an HTMLElement. Falling back to document.body.'
    )
    appendTo = document.body
  }

  const container = document.createElement('div')

  const vm = createVNode(NotificationInstance, props)

  vm.props!.onDestroy = () => {
    render(null, container)
  }

  render(vm, container)
  notifications[position].push({ vm })
  appendTo.appendChild(container.firstElementChild!)
}

export function close(
  id: string,
  position: NotificationOptions['position']
): void {
  const orientedNotifications = notifications[position]
  const idx = orientedNotifications.findIndex(({ vm }) => {
    return vm.component?.props.id === id
  })
  if (idx === -1) return
  const { vm } = orientedNotifications[idx]
  if (!vm) return

  const removedHeight = vm.el!.offsetHeight
  const verticalPos = position.split('-')[0]

  notifications[position].splice(idx, 1)

  const len = orientedNotifications.length
  if (!len) return

  for (let i = 0; i < len; i++) {
    const { el, component } = orientedNotifications[i].vm
    const pos =
      Number.parseInt(el!.style[verticalPos], 10) - removedHeight - GAP_SIZE
    component!.props.offset = pos
  }
}

export default notify
