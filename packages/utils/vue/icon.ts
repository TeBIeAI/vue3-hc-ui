import {
  CircleCloseFilled,
  InfoFilled,
  SuccessFilled,
  WarningFilled
} from '@element-plus/icons-vue'
import type { Component } from 'vue'
import { definePropType } from './props'

export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function
])

export const TypeComponentsMap = {
  success: SuccessFilled,
  warning: WarningFilled,
  error: CircleCloseFilled,
  info: InfoFilled
}
