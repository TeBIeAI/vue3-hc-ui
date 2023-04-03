import { noop } from 'lodash-es'

export const useSameTarget = (handleClick?: (e: MouseEvent) => void) => {
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
    console.log(e.target, e.currentTarget)
    mousedownTarget = e.target === e.currentTarget
    console.log(mousedownTarget)
  }
  const onMouseup = (e: MouseEvent) => {
    // marking current mouseup target.
    mouseupTarget = e.target === e.currentTarget
    console.log(mouseupTarget)
  }

  return {
    onClick,
    onMousedown,
    onMouseup
  }
}
