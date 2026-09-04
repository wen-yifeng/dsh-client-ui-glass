import { defineStore } from '@deepseek-ai/dsh-client-runtime/client'

/** Card state read through the slot's useStore selector. */
export interface AVGlassCardState {
  /** Master switch state, mirrored from the live layer. */
  enabled: boolean
  /** Aura backdrop opt-in, mirrored from the live layer. */
  aura: boolean
}

/** The business face the card's slot entry injects. */
export interface AVGlassCardInjected {
  /** Flip the layer now and persist the choice to localStorage. */
  setEnabled: (enabled: boolean) => void
  /** Flip the aura backdrop now. Only visible while the glass is mounted. */
  setAura: (aura: boolean) => void
}

/**
 * Declare the master-switch store (glass + aura opt-in). The apply-world
 * change listener is the only writer; the card reads through the slot's
 * `useStore` selector.
 * @returns the store handle for the settings.general.item registration.
 */
export function createAVGlassCardStore() {
  return defineStore({
    init: () => ({ enabled: true, aura: false, revision: -1 }),
    actions: {
      sync: (d, next: { enabled: boolean; aura: boolean }, revision: number) => {
        if (revision <= d.revision) return
        d.enabled = next.enabled
        d.aura = next.aura
        d.revision = revision
      },
    },
  })
}
