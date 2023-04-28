// @ts-nocheck
import { isObject, isString } from 'lodash-es'
import type { Directive, DirectiveBinding, UnwrapRef } from 'vue'
import { createLoadingComponent, LoadingInstance } from './loading'
import { Loading } from './service'
import { LoadingOptions } from './types'

const INSTANCE_KEY = Symbol('HcLoading')

export interface ElementLoading extends HTMLElement {
  [INSTANCE_KEY]?: {
    instance: LoadingInstance
    options: LoadingOptions
  }
}

export type LoadingBing = boolean | UnwrapRef<LoadingOptions>

const createInstance = (
  el: ElementLoading,
  binging: DirectiveBinding<LoadingBing>
) => {
  const vm = binging.instance

  const getBingingProps = <K extends keyof LoadingOptions>(
    key: K
  ): LoadingOptions[K] => {
    return isObject(binging.value) ? binging.value[key] : undefined
  }

  const resolveExpression = (key: any) => {
    const data = (isString(key) && vm?.[key]) || key
    if (data) return ref(data)
    else return data
  }

  const getProp = <K extends keyof LoadingOptions>(name: K) => {
    resolveExpression(getBingingProps(name))
  }

  const fullscreen =
    getBingingProps('fullscreen') || binging.modifiers.fullscreen

  const options: LoadingOptions = {
    text: getProp('text'),
    background: getProp('background'),
    fullscreen,
    target: getBingingProps('target') ?? (fullscreen ? undefined : el),
    body: getBingingProps('body') ?? binging.modifiers.body
  }

  el[INSTANCE_KEY] = {
    options,
    instance: Loading(options)
  }
}

export const vLoading: Directive<ElementLoading, LoadingBing> = {
  mounted(el, binging) {
    if (binging.value) {
      createInstance(el, binging)
    }
  },
  updated(el, binging) {
    const instance = el[INSTANCE_KEY]
    if (!binging.value) {
      instance?.instance.close()
    }
  },
  unmounted(el) {
    el[INSTANCE_KEY]?.instance.close()
  }
}
