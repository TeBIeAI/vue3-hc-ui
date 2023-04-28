import Form from './src/form.vue'
import FormItem from './src/form-item.vue'
import { NoopWithInstall, withInstall } from '@hc-ui/utils'

export const HcForm = withInstall(Form, {
  FormItem
})
export default HcForm

export const HcFormItem = NoopWithInstall(FormItem)

export * from './src/hooks'

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>
