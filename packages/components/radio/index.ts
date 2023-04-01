import { NoopWithInstall, withInstall } from '@hc-ui/utils/vue/install'
import Radio from './src/radio.vue'
import RadioGroup from './src/radio-group.vue'

import './style'

export const HcRadio = withInstall(Radio, {
  RadioGroup
})

const HcRadioGroup = NoopWithInstall(RadioGroup)

export default HcRadio
export { HcRadioGroup }

export * from './src/radio'
