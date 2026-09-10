/**
 * Settings hotkey: a bare key press (default `z`; no modifiers, not during IME
 * composition, outside editable targets) opens the host settings dialog.
 *
 * The host keeps the settings modal's open state component-local (no store to
 * call), so the only lever is its sidebar-foot trigger button, found
 * semantically — `button[class*="trigger"][aria-haspopup="dialog"]` — and
 * actuated only while closed (`aria-expanded="false"`). Any open dialog owns
 * the keyboard (Escape closes it), so this binding never fights a modal. The
 * listener is inert while the glass layer is off: plugin off = stock UI.
 */

/** Structural anchor of the host settings trigger, expanded-state agnostic (probe reuse). */
export const SETTINGS_TRIGGER_SELECTOR = 'button[class*="trigger"][aria-haspopup="dialog"]'

const EDITABLE = 'input, textarea, select, [contenteditable="true"], [contenteditable="plaintext-only"]'

/**
 * Normalize a user-supplied hotkey: trimmed, lowercased, single character.
 * The empty string means "binding disabled".
 */
export function normalizeHotkey(value: string): string {
  const trimmed = value.trim().toLowerCase()
  return trimmed.length <= 1 ? trimmed : trimmed.slice(0, 1)
}

/** Live state the binding reads on every keypress. */
export interface SettingsHotkeyOptions {
  /** Liveness probe for the glass layer; inert while it reports false. */
  isActive: () => boolean
  /** Current hotkey key (compared case-insensitively); `''` disables the binding. */
  getKey: () => string
}

/**
 * Locate the settings trigger. The sidebar-scoped probe runs first (the
 * stamped `data-dsh-sidebar` column is its home), with an unscoped fallback
 * in case the shell remounts the trigger row outside the column.
 */
function findSettingsTrigger(): HTMLButtonElement | null {
  return (
    document.querySelector<HTMLButtonElement>(
      `[data-dsh-sidebar] ${SETTINGS_TRIGGER_SELECTOR}[aria-expanded="false"]`,
    )
    ?? document.querySelector<HTMLButtonElement>(
      `${SETTINGS_TRIGGER_SELECTOR}[aria-expanded="false"]`,
    )
  )
}

/**
 * Bind the global keydown (capture, so the plugin owns the key before host
 * handlers) and keep the actuation gated on the layer's live state.
 * @param options - liveness probe and the current hotkey getter.
 * @returns a disposer that removes the listener.
 */
export function startSettingsHotkey(options: SettingsHotkeyOptions): () => void {
  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.defaultPrevented || e.repeat || e.isComposing || e.keyCode === 229) return
    if (e.ctrlKey || e.altKey || e.metaKey) return
    const key = normalizeHotkey(options.getKey())
    if (key === '' || e.key.toLowerCase() !== key) return
    if (!options.isActive()) return
    const target = e.target
    if (target instanceof Element && target.closest(EDITABLE) !== null) return
    if (document.querySelector('[role="dialog"]') !== null) return
    const trigger = findSettingsTrigger()
    if (trigger === null) return
    e.preventDefault()
    trigger.click()
  }
  window.addEventListener('keydown', onKeyDown, true)
  return () => { window.removeEventListener('keydown', onKeyDown, true) }
}
