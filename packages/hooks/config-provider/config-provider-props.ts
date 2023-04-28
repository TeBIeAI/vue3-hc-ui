import { buildProps } from '@hc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import { useSizeProp } from '..'

export type ExperimentalFeatures = {
  // TO BE Defined
}

export const configProviderProps = buildProps({
  size: useSizeProp
} as const)

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
