import { isElement } from '@hc-ui/utils'
import { isFunction, isString } from 'lodash-es'
import { createVNode, isVNode, render } from 'vue'
import { MessageContext } from './instance'
import {
  messageDefault,
  MessageFn,
  MessageNormalizeOption,
  MessageOptions,
  MessageParams
} from './message'
import MessageInstance from './message.vue'

let seed = 1

const normalizeOption = (params: MessageParams) => {
  const options: MessageOptions =
    !params || isString(params) || isFunction(params) || isVNode(params)
      ? { message: params }
      : params

  const normalized = {
    ...messageDefault,
    ...options
  }

  if (!normalized.appendTo) {
    normalized.appendTo = document.body
  } else if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector(normalized.appendTo) as HTMLElement

    if (!isElement(appendTo)) {
      console.warn('hc message 错误')

      appendTo = document.body
    }

    normalized.appendTo = appendTo
  }

  return normalized as MessageNormalizeOption
}

const createMessage = ({
  appendTo,
  ...options
}: MessageNormalizeOption): MessageContext => {
  const id = `message_${seed++}`
  const container = document.createElement('div')

  const props = {
    ...options,
    id
  }

  const vnode = createVNode(MessageInstance, props)
  render(vnode, container)

  appendTo?.appendChild(container.firstElementChild!)
  const vm = vnode.component!

  const instance = {
    id,
    vnode,
    vm,
    props
  }

  return instance
}

const message: MessageFn = (options = {}) => {
  const normalized = normalizeOption(options)

  const instance = createMessage(normalized)
}

export default message
