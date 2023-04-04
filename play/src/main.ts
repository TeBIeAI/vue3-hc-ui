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
  HcCheckboxGroup
} from '@hc-ui/components'

const app = createApp(App)

app.use(HcInput)
app.use(HcButton)
app.use(HcRadio)
app.use(HcRadioGroup)
app.use(HcDialog)
app.use(HcCheckbox)
app.use(HcCheckboxGroup)

app.mount('#app')
