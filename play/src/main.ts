import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import {
  HcInput,
  HcRadio,
  HcButton,
  HcRadioGroup,
  HcDialog,
  HcCheckbox,
  HcCheckboxGroup,
  HcTransfer,
  HcNotification,
  HcMessage,
  HcLoading,
  HcTabs,
  HcTabPane,
  HcPagination,
  HcForm,
  HcFormItem
} from '@hc-ui/components'

const app = createApp(App)

app.use(HcInput)
app.use(HcButton)
app.use(HcRadio)
app.use(HcRadioGroup)
app.use(HcDialog)
app.use(HcCheckbox)
app.use(HcCheckboxGroup)
app.use(HcTransfer)
app.use(HcNotification)
app.use(HcMessage)
app.use(HcLoading)
app.use(HcTabs)
app.use(HcTabPane)
app.use(HcPagination)
app.use(HcForm)
app.use(HcFormItem)

app.mount('#app')
