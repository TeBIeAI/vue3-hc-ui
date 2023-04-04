import { withInstall } from '@hc-ui/utils/vue/install'
import Button from './src/button.vue'
import './style'

export const HcButton = withInstall(Button)

export default HcButton

export type HcButtonInstance = InstanceType<typeof Button>
