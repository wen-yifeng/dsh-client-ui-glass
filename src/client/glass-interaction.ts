import type { DomWatcher } from './dom-watcher.ts'

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
 * No idle animation: the sweep is driven by CSS :hover/:focus-visible, and
 * this module only feeds the pointer-following spot on mouse/pen hover.
 * Stamping runs through the shared dom watcher (one observer for all stampers,
 * coalesced to one pass per animation frame).
 * @param watcher - the layer's shared mutation watcher.
 * @returns a disposer that unregisters the stamper and clears interaction state.
 */
export function startGlassInteraction(watcher: DomWatcher): () => void {
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')

  const stamp = (): void => {
    for (const el of Array.from(document.querySelectorAll<HTMLElement>(TOP_SELECTOR))) {
      if (el.hasAttribute(TOP_ATTRIBUTE)) continue
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

  const unregister = watcher.register(stamp)

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', clearPointer, { passive: true })
  window.addEventListener('pointercancel', clearPointer, { passive: true })
  window.addEventListener('blur', clearPointer, { passive: true })

  return () => {
    unregister()
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerleave', clearPointer)
    window.removeEventListener('pointercancel', clearPointer)
    window.removeEventListener('blur', clearPointer)
    clearPointer()
    clearAll()
  }
}
