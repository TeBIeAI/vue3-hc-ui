import { InjectionKey, WritableComputedRef, ComputedRef } from 'vue'

export type HcPaginationContext = {
  currentPage?: WritableComputedRef<number>
  pageCount?: ComputedRef<number>
  disabled?: ComputedRef<boolean>
  changeEvent?: (val: number) => void
}

export const hcPaginationKey: InjectionKey<HcPaginationContext> =
  Symbol('hcPaginationKey')
