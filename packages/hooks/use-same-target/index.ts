import { noop } from 'lodash-es'

export const useSameTarget = (handleClick?: (e: MouseEvent) => void) => {
  debugger
  if (!handleClick) {
    return { onClick: noop, onMousedown: noop, onMouseup: noop }
  }

  let mousedownTarget = false
  let mouseupTarget = false

  const onClick = (e: MouseEvent) => {
    if (mousedownTarget && mouseupTarget) {
      handleClick(e)
    }
    mousedownTarget = mouseupTarget = false
  }

  const onMousedown = (e: MouseEvent) => {
    // marking current mousedown target.
    mousedownTarget = e.target === e.currentTarget
  }
  const onMouseup = (e: MouseEvent) => {
    // marking current mouseup target.
    mouseupTarget = e.target === e.currentTarget
  }

  return {
    onClick,
    onMousedown,
    onMouseup
  }
}
