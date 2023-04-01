import { UseNamespaceReturn } from '@hc-ui/hooks'
import type { InjectionKey, Ref } from 'vue'

export interface DialogContent {
  ns: UseNamespaceReturn
  dialogRef: Ref<HTMLElement | undefined>
  headerRef: Ref<HTMLElement | undefined>
}

export const dialogInjectionKey: InjectionKey<DialogContent> =
  Symbol('dialogKey')
