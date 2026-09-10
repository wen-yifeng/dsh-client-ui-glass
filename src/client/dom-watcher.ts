/**
 * Shared DOM mutation watcher for the glass runtime stampers.
 *
 * The seam stamper and the glass interaction each used to run their own
 * document-wide MutationObserver and re-query the whole document on every
 * mutation batch — two full-document scans per batch while streaming replies
 * mutate the DOM every frame. One shared observer now fans out to every
 * registered stamper, coalesced to at most one pass per animation frame.
 * rAF callbacks still run before the next paint, so stamping stays pre-paint
 * exactly like the microtask callbacks it replaces.
 */

/** A stamper: an idempotent DOM pass that (re)stamps runtime hooks. */
export type DomStamp = () => void

/** Registration surface shared by the glass runtime stampers. */
export interface DomWatcher {
  /**
   * Register a stamper and run it once immediately.
   * @returns the unregister disposer.
   */
  register(stamp: DomStamp): () => void
  /** Disconnect the observer and drop every registration. */
  dispose(): void
}

/** Start the shared document watcher (`childList`, subtree of `<html>`). */
export function startDomWatcher(): DomWatcher {
  const stamps = new Set<DomStamp>()
  let frame = 0

  const flush = (): void => {
    frame = 0
    for (const stamp of stamps) stamp()
  }

  const observer = new MutationObserver(() => {
    if (!frame) frame = requestAnimationFrame(flush)
  })
  observer.observe(document.documentElement, { childList: true, subtree: true })

  return {
    register(stamp) {
      stamps.add(stamp)
      stamp()
      return () => { stamps.delete(stamp) }
    },
    dispose() {
      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
      stamps.clear()
      observer.disconnect()
    },
  }
}
