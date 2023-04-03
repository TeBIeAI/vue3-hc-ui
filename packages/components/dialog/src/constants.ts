import { UseNamespaceReturn } from '@hc-ui/hooks'
import type { CSSProperties, ComputedRef, InjectionKey, Ref } from 'vue'

export interface DialogContent {
  ns: UseNamespaceReturn
  dialogRef: Ref<HTMLElement | undefined>
  headerRef: Ref<HTMLElement | undefined>
  style: ComputedRef<CSSProperties>
}

export const dialogInjectionKey: InjectionKey<DialogContent> =
  Symbol('dialogKey')
