import { Loading } from './src/service'
import { vLoading } from './src/directive'
import { App } from 'vue'

import './style'

export const HcLoading = {
  install(app: App) {
    app.directive('loading', vLoading)
    app.config.globalProperties.$loading = Loading
  },
  directive: vLoading,
  service: Loading
}

export default HcLoading

export { vLoading, vLoading as HcLoadingDirective, Loading as HcLoadingService }
