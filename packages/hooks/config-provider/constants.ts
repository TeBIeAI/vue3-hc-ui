import type { InjectionKey, Ref } from 'vue'
import { ConfigProviderProps } from './config-provider-props'

export type ConfigProviderContext = Partial<ConfigProviderProps>

export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol()
