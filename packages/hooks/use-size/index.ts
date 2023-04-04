import { componentSizes } from '@hc-ui/constants'
import { buildProp } from '@hc-ui/utils'

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false
})
