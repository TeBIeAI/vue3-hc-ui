import { withInstall } from '@hc-ui/utils/vue/install'

import Input from './src/input.vue'
import './style'

export const HcInput = withInstall(Input)
export default HcInput

export * from './src/input'

export type InputInstance = InstanceType<typeof Input>
