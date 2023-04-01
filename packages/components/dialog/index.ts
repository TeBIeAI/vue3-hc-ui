import { withInstall } from '@hc-ui/utils/vue/install'
import Dialog from './src/dialog.vue'
import './style'

export const HcDialog = withInstall(Dialog)

export default HcDialog

export * from './src/dialog'
export * from './src/dialog-content'

export type HcDialogInstance = InstanceType<typeof Dialog>
