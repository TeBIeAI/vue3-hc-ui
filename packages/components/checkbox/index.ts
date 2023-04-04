import Checkbox from './src/checkbox.vue'
import CheckboxGroup from './src/checkbox-group.vue'
import { NoopWithInstall, withInstall } from '@hc-ui/utils/vue/install'
import './style'

export const HcCheckbox = withInstall(Checkbox, {
  CheckboxGroup
})
export default HcCheckbox

export const HcCheckboxGroup = NoopWithInstall(CheckboxGroup)

export * from './src/checkbox-group'
export * from './src/checkbox'
export * from './src/constants'
