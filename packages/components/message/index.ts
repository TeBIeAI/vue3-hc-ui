import { withInstallFunction } from '@hc-ui/utils/vue/install'
import Message from './src/method'

export const HcMessage = withInstallFunction(Message, '$message')
export default HcMessage

export * from './src/message'
