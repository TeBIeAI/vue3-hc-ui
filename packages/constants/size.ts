export const componentSizes = ['', 'large', 'small', 'default'] as const

export type ComponentSize = typeof componentSizes

export const componentSizeMap = {
  large: 40,
  default: 32,
  small: 24
} as const
