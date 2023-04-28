export const mutable = <T extends readonly any[] | Record<string, unknown>>(
  val: T
) => val as Mutable<typeof val>

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}

export type Arrayable<T> = T | T[]
