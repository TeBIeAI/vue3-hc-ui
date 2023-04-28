import { isString } from 'lodash-es'
import { createLoadingComponent } from './loading'

import type { LoadingInstance } from './loading'
import { LoadingOptions, LoadingOptionsResolved } from './types'
import { CSSProperties, nextTick } from 'vue'
import { UseNamespaceReturn, UseZIndexReturn } from '@hc-ui/hooks'
import { addClass } from '@hc-ui/utils'

const addClassList = (
  options: LoadingOptions,
  parent: HTMLElement,
  instance: LoadingInstance
) => {
  const ns = (instance.vm as any).ns as UseNamespaceReturn
  if (
    !['absolute', 'fixed', 'sticky'].includes(instance.originalPosition.value)
  ) {
    addClass(parent, ns.bm('parent', 'relative'))
  }
}

const addStyle = (
  options: LoadingOptions,
  parent: HTMLElement,
  instance: LoadingInstance
) => {
  const { nextZIndex } = (instance.vm as any).zIndex as UseZIndexReturn
  const maskStyle: CSSProperties = {}
  if (options.fullscreen) {
    maskStyle.zIndex = nextZIndex()
  }

  for (const [key, value] of Object.entries(maskStyle)) {
    instance.$el.style[key as any] = value
  }
}

export const Loading = (options: LoadingOptions): LoadingInstance => {
  const resolved = resolveOptions(options)

  const instance = createLoadingComponent(resolved)

  addStyle(resolved, resolved.parent, instance)
  addClassList(resolved, resolved.parent, instance)

  resolved.parent.appendChild(instance.$el)

  nextTick(() => (instance.visible.value = resolved.visible))

  return instance
}

const resolveOptions = (options: LoadingOptions): LoadingOptionsResolved => {
  let target: HTMLElement
  if (isString(options.target)) {
    target = document.querySelector(options.target) ?? document.body
  } else {
    target = options.target || document.body
  }

  return {
    parent: target === document.body || options.body ? document.body : target,
    background: options.background || '',
    spinner: options.spinner || '',
    text: options.text || '',
    fullscreen: target === document.body && (options.fullscreen ?? true),
    lock: options.lock ?? false,
    customClass: options.customClass || '',
    visible: options.visible ?? true,
    target
  }
}
