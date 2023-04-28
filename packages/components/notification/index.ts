import { withInstallFunction } from '@hc-ui/utils/vue/install'
import Notify from './src/notify'
import './style'

export const HcNotification = withInstallFunction(Notify, '$notify')

export default HcNotification

export * from './src/notification'
