import { isNumber, isString } from 'lodash-es'

export const addUnit = (value?: string | number, defaultUnit = 'px') => {
  if (!value) return ''

  if (isNumber(value)) {
    return `${value}${defaultUnit}`
  } else if (isString(value)) {
    return value
  }

  console.warn('binding value must be a string or number')
}
