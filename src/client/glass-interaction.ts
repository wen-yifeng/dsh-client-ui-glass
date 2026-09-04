/** Attribute marking Tier A (top-level) controls for sweep + pointer spot. */
export const TOP_ATTRIBUTE = 'data-av-interaction'

/** Stable DSH seams that identify top-level entry controls. */
const TOP_SELECTOR = [
  'header button',
  '[data-phase] header button',
  '[data-composer-card] button[class*="primary"]',
  'button[class*="add"]',
  'button[class*="newSession"]',
  'button[class*="primary"]',
  '[role="dialog"] button[type="submit"]',
].join(', ')

/**
 * Port of Infinite Canvas static/js/glass-interaction.js.
 * No idle animation: the sweep is driven by CSS :hover/:focus-visible, and
 * this module only feeds the pointer-following spot on mouse/pen hover.
 */
export function startGlassInteraction(): () => void {
  const root = document.documentElement
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')

  const stamp = (): void => {
    for (const el of Array.from(document.querySelectorAll<HTMLElement>(TOP_SELECTOR))) {
      el.setAttribute(TOP_ATTRIBUTE, 'top')
    }
  }

  const clearAll = (): void => {
    for (const el of Array.from(document.querySelectorAll<HTMLElement>(`[${TOP_ATTRIBUTE}]`))) {
      el.removeAttribute(TOP_ATTRIBUTE)
      el.classList.remove('av-pointer-active')
      el.style.removeProperty('--av-glass-x')
      el.style.removeProperty('--av-glass-y')
    }
  }

  let activeTarget: HTMLElement | null = null
  let pendingPointer: PointerEvent | null = null
  let frame = 0

  const clearPointer = (): void => {
    if (activeTarget) {
      activeTarget.style.removeProperty('--av-glass-x')
      activeTarget.style.removeProperty('--av-glass-y')
      activeTarget.classList.remove('av-pointer-active')
    }
    activeTarget = null
    pendingPointer = null
    if (frame) {
      cancelAnimationFrame(frame)
      frame = 0
    }
  }

  const paint = (): void => {
    frame = 0
    const pointer = pendingPointer
    pendingPointer = null
    if (!pointer || reducedMotion?.matches) {
      clearPointer()
      return
    }
    const target = (pointer.target as Element | null)?.closest?.(`[${TOP_ATTRIBUTE}="top"]`) as HTMLElement | null
    if (!target || target.matches?.(':disabled,[aria-disabled="true"],[aria-busy="true"]')) {
      clearPointer()
      return
    }
    if (activeTarget !== target) {
      clearPointer()
      activeTarget = target
      activeTarget.classList.add('av-pointer-active')
    }
    const rect = target.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) {
      clearPointer()
      return
    }
    const x = Math.max(0, Math.min(rect.width, pointer.clientX - rect.left))
    const y = Math.max(0, Math.min(rect.height, pointer.clientY - rect.top))
    target.style.setProperty('--av-glass-x', `${x.toFixed(1)}px`)
    target.style.setProperty('--av-glass-y', `${y.toFixed(1)}px`)
  }

  const onPointerMove = (event: PointerEvent): void => {
    if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
      clearPointer()
      return
    }
    pendingPointer = event
    if (!frame) frame = requestAnimationFrame(paint)
  }

  stamp()
  const observer = new MutationObserver(() => { stamp() })
  observer.observe(root, { childList: true, subtree: true })

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', clearPointer, { passive: true })
  window.addEventListener('pointercancel', clearPointer, { passive: true })
  window.addEventListener('blur', clearPointer, { passive: true })

  return () => {
    observer.disconnect()
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerleave', clearPointer)
    window.removeEventListener('pointercancel', clearPointer)
    window.removeEventListener('blur', clearPointer)
    clearPointer()
    clearAll()
  }
}
