import { defineStore } from '@deepseek-ai/dsh-client-store'

/** Card state read through the slot's useStore selector. */
export interface AVGlassCardState {
  /** Master switch state, mirrored from the live layer. */
  enabled: boolean
}

/** The business face the card's slot entry injects. */
export interface AVGlassCardInjected {
  /** Flip the layer now and persist the choice to localStorage. */
  setEnabled: (enabled: boolean) => void
  /**
   * Install a user-supplied backdrop image (kept verbatim in IndexedDB) or
   * clear it (`null` restores the shipped wallpaper). Only visible while the
   * aura backdrop itself is on.
   * @returns whether the choice persisted; a failed write keeps it session-only.
   */
  setAuraImage: (file: File | null) => Promise<boolean>
  /** Flip the wallpaper blur now. Only visible while the aura backdrop is on. */
  setAuraBlur: (blur: boolean) => void
  /**
   * Rebind the settings-dialog hotkey (normalized to one lowercase character;
   * `''` disables the binding).
   */
  setHotkey: (key: string) => void
}

/**
 * Declare the master-switch store (glass + aura opt-in). The apply-world
 * change listener is the only writer; the card reads through the slot's
 * `useStore` selector.
 * @returns the store handle for the settings.general.item registration.
 */
export function createAVGlassCardStore() {
  return defineStore({
    init: () => ({ enabled: true, revision: -1 }),
    actions: {
      sync: (d, next: { enabled: boolean }, revision: number) => {
        if (revision <= d.revision) return
        d.enabled = next.enabled
        d.revision = revision
      },
    },
  })
}
