import { MaybeRef } from '@vueuse/core'

export type LoadingOptionsResolved = {
  parent: LoadingParentElement
  background: MaybeRef<string>
  spinner: MaybeRef<boolean | string>
  text: MaybeRef<string>
  fullscreen: boolean
  lock: boolean
  customClass: MaybeRef<string>
  target: HTMLElement
  visible: boolean
}

export interface LoadingParentElement extends HTMLElement {
  vLoadingAddClassList?: () => void
}

export type LoadingOptions = Partial<
  Omit<LoadingOptionsResolved, 'parent' | 'target'> & {
    target: HTMLElement | null
    body: boolean
  }
>
