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

export const classNameToArray = (cls = '') => {
  return cls.split(' ').filter((item) => !!item.trim())
}

export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.add(...classNameToArray(cls))
}
