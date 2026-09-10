/**
 * Runtime seam stamper for the AV Glass layer.
 *
 * DSH ships hashed CSS-module class names, so the glass stylesheet keys off
 * stable data-* hooks instead. This module stamps those hooks onto the
 * matching stock DOM elements so the stylesheet works with zero base edits.
 * Stamps are idempotent and inert without `data-dsh-av-glass` on <html>.
 */

import type { DomWatcher } from './dom-watcher.ts'

interface Seam {
  attribute: string
  selector: string
  first?: boolean
}

/** The seam table, exported for the startup probe to introspect. */
export const SEAMS: readonly Seam[] = [
  { attribute: 'data-dsh-frame', selector: '[class*="frame"]', first: true },
  { attribute: 'data-dsh-sidebar', selector: '[class*="sidebarCol"]', first: true },
  { attribute: 'data-dsh-sidebar-root', selector: '[class*="sidebarCol"] [class*="root"]', first: true },
  { attribute: 'data-dsh-center', selector: '[class*="centerCol"]', first: true },
  { attribute: 'data-dsh-details', selector: '[class*="detailsCol"] [class*="root"]', first: true },
  { attribute: 'data-dsh-header', selector: '[class*="centerCol"] header', first: true },
  { attribute: 'data-dsh-composer', selector: '[class*="composerSeat"]', first: true },
  { attribute: 'data-dsh-surface', selector: 'button[class*="newSession"]' },
  { attribute: 'data-dsh-add', selector: '[class*="composerSeat"] [class*="add"]', first: true },
]

function stampSeams(): void {
  for (const seam of SEAMS) {
    if (seam.first) {
      const el = document.querySelector(seam.selector)
      if (el !== null && !el.hasAttribute(seam.attribute)) el.setAttribute(seam.attribute, '')
      continue
    }
    for (const el of Array.from(document.querySelectorAll(seam.selector))) {
      if (!el.hasAttribute(seam.attribute)) el.setAttribute(seam.attribute, '')
    }
  }
}

/** Remove every stamped seam attribute. */
function clearSeams(): void {
  for (const seam of SEAMS) {
      for (const el of Array.from(document.querySelectorAll(`[${seam.attribute}]`))) {
      el.removeAttribute(seam.attribute)
    }
  }
}

/**
 * Stamp the seams once, then keep them stamped as React remounts nodes.
 * Stamping runs through the shared dom watcher (one observer for all stampers,
 * coalesced to one pass per animation frame).
 * @param watcher - the layer's shared mutation watcher.
 * @returns a disposer that unregisters the stamper and clears the seams.
 */
export function startSeamStamper(watcher: DomWatcher): () => void {
  const unregister = watcher.register(stampSeams)
  return () => { unregister(); clearSeams() }
}