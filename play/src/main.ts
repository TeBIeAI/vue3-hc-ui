import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { HcInput, HcRadio, HcRadioGroup, HcDialog } from '@hc-ui/components'

const app = createApp(App)

app.use(HcInput)
app.use(HcRadio)
app.use(HcRadioGroup)
app.use(HcDialog)

app.mount('#app')
