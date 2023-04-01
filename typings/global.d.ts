declare global {
  interface DefineOptionsParams {
    name: string
    inheritAttrs?: boolean
  }

  // eslint-disable-next-line no-empty
  declare function defineOptions(params: DefineOptionsParams) {}
}

export {}
