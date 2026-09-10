import type { Context } from '@deepseek-ai/cordis'
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'
import { startDomWatcher, type DomWatcher } from './dom-watcher.ts'
import { normalizeHotkey } from './settings-hotkey.ts'
import { startGlassInteraction } from './glass-interaction.ts'
import { startSeamStamper } from './seam-stamper.ts'
import { installStartupProbe, removeStartupProbe } from './startup-probe.ts'

/** html attribute selecting the AV Glass layer. */
export const AV_ATTRIBUTE = 'data-dsh-av-glass'

/** html attribute showing the aura backdrop stage — set while a user-supplied wallpaper is installed (requires AV_ATTRIBUTE). */
export const AURA_ATTRIBUTE = 'data-dsh-av-aura'

/** html attribute flagging that a user-supplied backdrop image is installed. */
export const AURA_CUSTOM_ATTRIBUTE = 'data-dsh-av-aura-custom'

/** html attribute opting in to blurring the aura stage wallpaper (requires AURA_ATTRIBUTE). */
export const AURA_BLUR_ATTRIBUTE = 'data-dsh-av-aura-blur'

/** Literal class of the aura stage layer (plain glass.css, un-hashed). */
const AURA_STAGE_CLASS = 'av-aura-stage'

/** CSS custom property the aura stage paints the backdrop photo through. */
const AURA_IMAGE_VAR = '--av-aura-stage-image'

/**
 * IndexedDB home of the user-supplied backdrop image. The file is kept
 * verbatim as a Blob — no canvas recompression — because IDB quota scales
 * with free disk (hundreds of MB), unlike the 5MB localStorage the
 * compressed data URL used to fight with.
 */
const AURA_IMAGE_DB_NAME = 'dsh-av-glass'
const AURA_IMAGE_DB_VERSION = 1
const AURA_IMAGE_STORE = 'backdrops'
const AURA_IMAGE_RECORD_KEY = 'aura-image'

/** Pre-IDB storage key; migrated into IndexedDB on restore, then removed. */
const AURA_IMAGE_LEGACY_KEY = 'dsh-av-glass-aura-image'

/**
 * localStorage key of the wallpaper-blur opt-in. Same persistence channel as
 * the other aura prefs; the attribute only matters while the aura stage shows.
 */
const AURA_BLUR_STORAGE_KEY = 'dsh-av-glass-aura-blur'

/**
 * localStorage key of the settings-dialog hotkey (single character, lowercased;
 * the empty string disables the binding). Persisted outside the host settings
 * scope: the card reads the `data-dsh-av-hotkey` mirror as ground truth, the
 * same pattern as the other rows.
 */
const HOTKEY_STORAGE_KEY = 'dsh-av-glass-hotkey'

/** Default hotkey while unset: the bare-z binding from log #56. */
const HOTKEY_DEFAULT = 'z'

/** html attribute mirroring the current hotkey value (removed when disabled). */
const HOTKEY_ATTRIBUTE = 'data-dsh-av-hotkey'

/** Delay before the startup probe runs, letting the host shell mount first. */
const PROBE_DELAY_MS = 3000

/** Default state while the settings scope has not answered yet: on. */
const DEFAULT_ENABLED = true

/** The layer's identity in the theme override stack. */
const OVERRIDE_SOURCE = '@deepseek-ai/dsh-client-ui-glass'

const both = (value: string): { light: string; dark: string } => ({ light: value, dark: value })

/** Theme service surface required by this layer. */
interface AVGlassThemeService {
  overrideTokens(source: string, tokens: ThemeTokenOverrides): () => void
}

type AVGlassContext = Context & { theme: AVGlassThemeService }

/**
 * Alias-token override layer: the dark mother-glass palette.
 * Every value is a `{ light, dark }` pair and both modes resolve to the same
 * dark values, so the skin stays identical when Appearance flips.
 */
export const AV_TOKEN_OVERRIDES: ThemeTokenOverrides = {
  // Backgrounds.
  '--dsw-alias-bg-base': both('#0A0C0D'),
  '--dsw-alias-bg-layer-1': both('rgba(24, 26, 28, 0.55)'),
  '--dsw-alias-bg-layer-2': both('rgba(24, 26, 28, 0.44)'),
  '--dsw-alias-bg-layer-3': both('rgba(24, 26, 28, 0.34)'),
  '--dsw-alias-bg-overlay': both('rgba(20, 22, 24, 0.48)'),
  '--dsw-alias-bg-module-platform': both('rgba(24, 26, 28, 0.55)'),
  '--dsw-alias-bg-multi-select': both('rgba(24, 26, 28, 0.44)'),
  '--dsw-alias-bg-skeleton': both('rgba(148, 180, 220, 0.12)'),
  '--dsw-alias-bg-mask-1': both('rgba(4, 8, 14, 0.32)'),
  '--dsw-alias-bg-mask-2': both('rgba(4, 8, 14, 0.25)'),
  '--dsw-alias-bg-mask-3': both('rgba(4, 8, 14, 0.50)'),
  '--dsw-alias-bg-mask-drop': both('rgba(12, 18, 27, 0.70)'),
  '--dsw-alias-bg-mask-photo': both('rgba(4, 8, 14, 0.50)'),
  // Specific fills the app stylesheets fade into (session-list bottom fade,
  // trajectory table header). Left stock they resolve to light #f9fafb and
  // paint a white band over the dark glass.
  '--dsw-specific-sidebar-fill': both('rgba(4, 6, 8, 0.33)'),

  // Hairlines and strokes.
  '--dsw-alias-border-l1': both('rgba(255, 255, 255, 0.07)'),
  '--dsw-alias-border-l2': both('rgba(255, 255, 255, 0.11)'),
  '--dsw-alias-border-l2-darkmode-thin': both('rgba(255, 255, 255, 0.08)'),
  '--dsw-alias-border-l3': both('rgba(255, 255, 255, 0.18)'),
  '--dsw-alias-border-l4': both('rgba(255, 255, 255, 0.28)'),
  '--dsw-alias-border-inverted': both('rgba(255, 255, 255, 0.06)'),
  '--dsw-alias-border-inverted2': both('rgba(255, 255, 255, 0.08)'),

  // Text ink.
  '--dsw-alias-label-primary': both('rgba(249, 252, 250, 0.96)'),
  '--dsw-alias-label-secondary': both('rgba(238, 244, 240, 0.82)'),
  '--dsw-alias-label-tertiary': both('rgba(238, 244, 240, 0.62)'),
  '--dsw-alias-label-caption': both('rgba(238, 244, 240, 0.46)'),
  '--dsw-alias-label-dimmed': both('rgba(238, 244, 240, 0.30)'),
  '--dsw-alias-label-primary-bluish': both('rgba(191, 214, 246, 0.95)'),
  '--dsw-alias-label-primary-dimmed': both('rgba(238, 244, 240, 0.62)'),
  '--dsw-alias-label-primary-foreground': both('#0A0C0D'),
  '--dsw-alias-label-primary-inverted': both('#0A0C0D'),

  // Brand accent: the mother glass teal-green family.
  '--dsw-alias-brand-primary': both('rgba(198, 233, 220, 0.96)'),
  '--dsw-alias-brand-primary-invert': both('#0A0C0D'),
  '--dsw-alias-brand-primary-new-colorprimary-new-color': both('rgba(198, 233, 220, 0.96)'),
  '--dsw-alias-brand-text': both('rgba(198, 233, 220, 0.96)'),

  // Buttons.
  '--dsw-alias-button-primary-fill': both('rgba(198, 233, 220, 0.92)'),
  '--dsw-alias-button-primary-hover': both('rgba(211, 239, 229, 0.98)'),
  '--dsw-alias-button-primary-dimmed': both('rgba(198, 233, 220, 0.55)'),
  '--dsw-alias-button-contrast-fill': both('rgba(238, 244, 240, 0.92)'),
  '--dsw-alias-button-elevated-fill': both('rgba(238, 244, 240, 0.10)'),
  '--dsw-alias-button-floating-fill': both('rgba(24, 26, 28, 0.55)'),
  '--dsw-alias-button-floating-hover': both('rgba(238, 244, 240, 0.10)'),
  '--dsw-alias-button-ghost-active-border': both('rgba(198, 233, 220, 0.34)'),
  '--dsw-alias-button-ghost-active-fill': both('rgba(198, 233, 220, 0.14)'),
  '--dsw-alias-button-ghost-active-hover': both('rgba(198, 233, 220, 0.20)'),
  '--dsw-alias-button-info-fill': both('rgba(59, 130, 246, 0.90)'),
  '--dsw-alias-button-info-hover': both('rgba(96, 165, 250, 0.95)'),
  '--dsw-alias-button-tool-bar-fill': both('rgba(238, 244, 240, 0.08)'),
  '--dsw-alias-button-tool-bar-fill-invisible': both('rgba(238, 244, 240, 0.02)'),
  '--dsw-alias-button-tool-bar-hover': both('rgba(238, 244, 240, 0.12)'),

  // Interactive fills.
  '--dsw-alias-interactive-bg-active': both('rgba(238, 244, 240, 0.12)'),
  '--dsw-alias-interactive-bg-hover': both('rgba(238, 244, 240, 0.08)'),
  '--dsw-alias-interactive-bg-hover-accent': both('rgba(198, 233, 220, 0.14)'),
  '--dsw-alias-interactive-bg-hover-danger': both('rgba(255, 157, 169, 0.12)'),
  '--dsw-alias-interactive-bg-hover-solid': both('rgba(238, 244, 240, 0.16)'),

  // Semantic states.
  '--dsw-alias-state-business-primary': both('rgba(198, 233, 220, 0.96)'),
  '--dsw-alias-state-business-tertiary': both('rgba(198, 233, 220, 0.12)'),
  '--dsw-alias-state-error-primary': both('rgba(255, 157, 169, 0.96)'),
  '--dsw-alias-state-error-secondary': both('rgba(255, 157, 169, 0.22)'),
  '--dsw-alias-state-success-primary': both('rgba(160, 232, 196, 0.96)'),
  '--dsw-alias-state-success-secondary': both('rgba(160, 232, 196, 0.22)'),
  '--dsw-alias-state-success-tertiary': both('rgba(160, 232, 196, 0.10)'),
  '--dsw-alias-state-warn-label': both('rgba(251, 191, 36, 0.96)'),
  '--dsw-alias-state-warn-primary': both('rgba(251, 191, 36, 0.96)'),
  '--dsw-alias-state-warn-secondary': both('rgba(251, 191, 36, 0.22)'),
  '--dsw-alias-state-warn-tertiary': both('rgba(251, 191, 36, 0.10)'),

  // Overlays and scrollbars.
  '--dsw-alias-toast-bg': both('rgba(24, 26, 28, 0.92)'),
  '--dsw-alias-tooltip-bg': both('rgba(24, 26, 28, 0.92)'),
  '--dsw-alias-scrollbar-bg-l1': both('rgba(238, 244, 240, 0.08)'),
  '--dsw-alias-scrollbar-bg-l2': both('rgba(238, 244, 240, 0.10)'),
  '--dsw-alias-scrollbar-hover-l1': both('rgba(238, 244, 240, 0.18)'),
  '--dsw-alias-scrollbar-hover-l2': both('rgba(238, 244, 240, 0.22)'),

  // Markdown surfaces (kept dark under the glass base).
  '--dsw-alias-markdown-citation': both('rgba(198, 233, 220, 0.12)'),
  '--dsw-alias-markdown-code-block': both('rgba(10, 12, 13, 0.55)'),
  '--dsw-alias-markdown-code-block-banner': both('rgba(10, 12, 13, 0.80)'),
  '--dsw-alias-markdown-code-segment-selected': both('rgba(198, 233, 220, 0.16)'),
  '--dsw-alias-markdown-code-segment-unselected': both('rgba(238, 244, 240, 0.04)'),
  '--dsw-alias-markdown-inline-code': both('rgba(238, 244, 240, 0.10)'),
  '--dsw-alias-markdown-tag': both('rgba(198, 233, 220, 0.16)'),
  '--dsw-alias-markdown-placeholder': both('rgba(238, 244, 240, 0.30)'),
}

/**
 * AV Glass theme layer: one toggleable visual skin over the whole Web surface.
 * The durable enable flag lives in the Host settings scope (`ui-av-glass`);
 * this layer only owns the in-memory state and its reversible DOM effects.
 */
export class AVGlassLayer {
  private readonly ctx: AVGlassContext
  private enabled: boolean
  private auraImageBlob: Blob | null
  private auraImageUrl: string | null
  private auraBlur: boolean
  private hotkey: string
  private auraStage?: HTMLElement
  private tokenDisposer?: () => void
  private interactionDisposer?: () => void
  private seamDisposer?: () => void
  private domWatcher?: DomWatcher
  private probeTimer?: ReturnType<typeof setTimeout>
  private readonly listeners = new Set<() => void>()

  constructor(ctx: AVGlassContext) {
    this.ctx = ctx
    this.enabled = DEFAULT_ENABLED
    this.auraImageBlob = null
    this.auraImageUrl = null
    this.auraBlur = this.readAuraBlurPref()
    this.hotkey = this.readHotkeyPref()
    if (this.enabled) this.mount()
    void this.restoreAuraImage()
  }

  getEnabled(): boolean {
    return this.enabled
  }

  /** @returns whether a user-supplied backdrop image is currently installed. */
  getAuraCustom(): boolean {
    return this.auraImageBlob !== null
  }

  /** @returns whether the wallpaper blur is currently opted in. */
  getAuraBlur(): boolean {
    return this.auraBlur
  }

  /** @returns the current settings-dialog hotkey (`''` = binding disabled). */
  getHotkey(): string {
    return this.hotkey
  }

  /**
   * Set the settings-dialog hotkey (normalized to one lowercase character;
   * `''` disables). Mirrors onto `data-dsh-av-hotkey` on `<html>` so the
   * settings card reads it as ground truth.
   */
  setHotkey(value: string): void {
    const next = normalizeHotkey(value)
    if (next === this.hotkey) return
    this.hotkey = next
    this.writeHotkeyPref(next)
    if (this.enabled) this.applyHotkeyAttribute()
    for (const listener of this.listeners) listener()
  }

  /** Open (creating on first use) the backdrop image database. */
  private openImageDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const open = indexedDB.open(AURA_IMAGE_DB_NAME, AURA_IMAGE_DB_VERSION)
      open.onupgradeneeded = () => { open.result.createObjectStore(AURA_IMAGE_STORE) }
      open.onsuccess = () => resolve(open.result)
      open.onerror = () => reject(open.error ?? new Error('indexedDB unavailable'))
    })
  }

  /** Read the stored backdrop blob; null means none (or a foreign record). */
  private async readStoredImage(): Promise<Blob | null> {
    const db = await this.openImageDb()
    try {
      return await new Promise<Blob | null>((resolve, reject) => {
        const get = db.transaction(AURA_IMAGE_STORE, 'readonly')
          .objectStore(AURA_IMAGE_STORE)
          .get(AURA_IMAGE_RECORD_KEY)
        get.onsuccess = () => resolve(get.result instanceof Blob ? get.result : null)
        get.onerror = () => reject(get.error ?? new Error('read failed'))
      })
    } finally {
      db.close()
    }
  }

  /**
   * Persist the backdrop blob. A failed write (quota, privacy mode) keeps
   * the image for this session only and reports `false` so the card can
   * surface it.
   */
  private async writeStoredImage(blob: Blob | null): Promise<boolean> {
    try {
      const db = await this.openImageDb()
      try {
        return await new Promise<boolean>((resolve, reject) => {
          const tx = db.transaction(AURA_IMAGE_STORE, 'readwrite')
          const store = tx.objectStore(AURA_IMAGE_STORE)
          if (blob === null) store.delete(AURA_IMAGE_RECORD_KEY)
          else store.put(blob, AURA_IMAGE_RECORD_KEY)
          tx.oncomplete = () => resolve(true)
          tx.onerror = () => reject(tx.error ?? new Error('write failed'))
          tx.onabort = () => reject(tx.error ?? new Error('write aborted'))
        })
      } finally {
        db.close()
      }
    } catch {
      return false
    }
  }

  /**
   * One-shot migration: the pre-IDB compressed data URL in localStorage
   * moves into IndexedDB so the storage swap doesn't drop an installed
   * backdrop. Failures are silent — the user just re-uploads.
   */
  private async migrateLegacyImage(): Promise<Blob | null> {
    try {
      const value = localStorage.getItem(AURA_IMAGE_LEGACY_KEY)
      if (value === null || !value.startsWith('data:image/')) return null
      const blob = await (await fetch(value)).blob()
      localStorage.removeItem(AURA_IMAGE_LEGACY_KEY)
      await this.writeStoredImage(blob)
      return blob
    } catch {
      return null
    }
  }

  /**
   * Pull the persisted backdrop back in after startup. Async — on cold start
   * the stage stays black until the record lands. A live pick that completes
   * first wins over the restored record.
   */
  private async restoreAuraImage(): Promise<void> {
    try {
      const blob = (await this.readStoredImage()) ?? (await this.migrateLegacyImage())
      if (blob === null || this.auraImageBlob !== null) return
      this.auraImageBlob = blob
      this.applyAuraImage()
      for (const listener of this.listeners) listener()
    } catch {
      // IndexedDB unavailable (privacy modes etc.): ship without the custom image.
    }
  }

  /** Stored blur opt-in; unreadable storage (privacy modes) falls back to off. */
  private readAuraBlurPref(): boolean {
    try {
      return localStorage.getItem(AURA_BLUR_STORAGE_KEY) === '1'
    } catch {
      // localStorage access can throw in privacy modes; default off is safe.
      return false
    }
  }

  private writeAuraBlurPref(value: boolean): void {
    try {
      localStorage.setItem(AURA_BLUR_STORAGE_KEY, value ? '1' : '0')
    } catch {
      // Same as readAuraBlurPref: the choice stays session-only, toggling still works.
    }
  }

  /** Stored hotkey; unreadable storage (privacy modes) falls back to the default. */
  private readHotkeyPref(): string {
    try {
      const value = localStorage.getItem(HOTKEY_STORAGE_KEY)
      return value === null ? HOTKEY_DEFAULT : normalizeHotkey(value)
    } catch {
      return HOTKEY_DEFAULT
    }
  }

  private writeHotkeyPref(value: string): void {
    try {
      localStorage.setItem(HOTKEY_STORAGE_KEY, value)
    } catch {
      // Same as readHotkeyPref: the choice stays session-only, rebinding still works.
    }
  }

  /** Mirror the hotkey onto `<html>` (attribute carries the key, removed when disabled). */
  private applyHotkeyAttribute(): void {
    const el = document.documentElement
    if (this.hotkey === '') el.removeAttribute(HOTKEY_ATTRIBUTE)
    else el.setAttribute(HOTKEY_ATTRIBUTE, this.hotkey)
  }

  /**
   * Observe enable flips so the settings card can mirror the layer.
   * @param listener - invoked after the flag changes.
   * @returns the disposer removing this listener.
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  setEnabled(value: boolean): void {
    if (value === this.enabled) return
    this.enabled = value
    if (value) this.mount()
    else this.unmount()
    for (const listener of this.listeners) listener()
  }

  /**
   * Install a user-supplied backdrop image (`null` clears it, back to the
   * plain-black stage). The original file is kept verbatim: a blob URL rides
   * the inline `--av-aura-stage-image` on `<html>` — inline beats the
   * stylesheet value and survives stage remounts — while the aura/custom
   * attributes mirror the install state for the settings card.
   * @returns whether the choice persisted; a failed write keeps it session-only.
   */
  async setAuraImage(file: File | null): Promise<boolean> {
    if (file !== null && !file.type.startsWith('image/')) {
      throw new Error('not an image file')
    }
    if (this.auraImageUrl !== null) {
      URL.revokeObjectURL(this.auraImageUrl)
      this.auraImageUrl = null
    }
    this.auraImageBlob = file
    if (file !== null) {
      this.auraImageUrl = URL.createObjectURL(file)
      // Front-load the photo decode off the apply frame: installing a
      // wallpaper repaints the full-viewport stage and every panel frost
      // re-samples it in that same frame — decoding first keeps the JPEG/PNG
      // decode out of that frame's budget.
      try {
        const probe = new Image()
        probe.src = this.auraImageUrl
        await probe.decode()
      } catch {
        // Decode probe failed (exotic format?): apply anyway and let CSS try.
      }
    }
    this.applyAuraImage()
    for (const listener of this.listeners) listener()
    return this.writeStoredImage(file)
  }

  /** Mirror the in-memory backdrop blob onto <html> (inline var + attribute). */
  private applyAuraImage(): void {
    if (this.auraImageBlob !== null && this.auraImageUrl === null) {
      this.auraImageUrl = URL.createObjectURL(this.auraImageBlob)
    }
    if (!this.enabled) return
    const el = document.documentElement
    if (this.auraImageBlob === null) {
      el.style.removeProperty(AURA_IMAGE_VAR)
      el.removeAttribute(AURA_ATTRIBUTE)
      el.removeAttribute(AURA_CUSTOM_ATTRIBUTE)
    } else {
      el.style.setProperty(AURA_IMAGE_VAR, `url("${this.auraImageUrl}")`)
      el.setAttribute(AURA_ATTRIBUTE, '')
      el.setAttribute(AURA_CUSTOM_ATTRIBUTE, '')
    }
  }

  /** Flip the wallpaper blur. The attribute only matters while the aura stage shows. */
  setAuraBlur(value: boolean): void {
    if (value === this.auraBlur) return
    this.auraBlur = value
    this.writeAuraBlurPref(value)
    const el = document.documentElement
    if (value) el.setAttribute(AURA_BLUR_ATTRIBUTE, '')
    else el.removeAttribute(AURA_BLUR_ATTRIBUTE)
    for (const listener of this.listeners) listener()
  }

  private mount(): void {
    const el = document.documentElement
    el.setAttribute(AV_ATTRIBUTE, '')
    el.style.setProperty('color-scheme', 'dark')
    if (this.auraBlur) el.setAttribute(AURA_BLUR_ATTRIBUTE, '')
    this.applyAuraImage()
    this.applyHotkeyAttribute()
    this.mountAuraStage()
    this.applyTokens()
    // One shared watcher fans out to both stampers, coalesced to one pass per
    // animation frame (each stamper used to run its own document-wide observer).
    this.domWatcher = startDomWatcher()
    this.seamDisposer = startSeamStamper(this.domWatcher)
    this.interactionDisposer = startGlassInteraction(this.domWatcher)
    this.scheduleProbe()
  }

  private unmount(): void {
    const el = document.documentElement
    el.removeAttribute(AV_ATTRIBUTE)
    el.removeAttribute(AURA_ATTRIBUTE)
    el.removeAttribute(AURA_CUSTOM_ATTRIBUTE)
    el.removeAttribute(AURA_BLUR_ATTRIBUTE)
    el.removeAttribute(HOTKEY_ATTRIBUTE)
    el.style.removeProperty('color-scheme')
    el.style.removeProperty(AURA_IMAGE_VAR)
    if (this.auraImageUrl !== null) {
      URL.revokeObjectURL(this.auraImageUrl)
      this.auraImageUrl = null
    }
    this.auraStage?.remove()
    this.auraStage = undefined
    this.cancelProbe()
    removeStartupProbe()
    // Disconnect the shared watcher before the cleanups: a queued flush must
    // not re-stamp attributes that the disposers below are about to clear.
    this.domWatcher?.dispose()
    this.domWatcher = undefined
    this.tokenDisposer?.()
    this.tokenDisposer = undefined
    this.interactionDisposer?.()
    this.interactionDisposer = undefined
    this.seamDisposer?.()
    this.seamDisposer = undefined
  }

  /** Run the seam/trigger probe once the host shell has had time to mount. */
  private scheduleProbe(): void {
    this.cancelProbe()
    this.probeTimer = setTimeout(() => {
      this.probeTimer = undefined
      installStartupProbe()
    }, PROBE_DELAY_MS)
  }

  private cancelProbe(): void {
    if (this.probeTimer !== undefined) {
      clearTimeout(this.probeTimer)
      this.probeTimer = undefined
    }
  }

  /**
   * The aura stage is a dedicated fixed layer, not a body background: body
   * background propagation rendered unpredictably under the panel stack
   * (log #16). `z-index: -1` paints it above the body background and below
   * every app node, so panel frosts sample it through backdrop-filter.
   */
  private mountAuraStage(): void {
    if (this.auraStage?.isConnected) return
    const stage = document.createElement('div')
    stage.className = AURA_STAGE_CLASS
    document.body.prepend(stage)
    this.auraStage = stage
  }

  private applyTokens(): void {
    this.tokenDisposer?.()
    this.tokenDisposer = this.ctx.theme.overrideTokens(OVERRIDE_SOURCE, AV_TOKEN_OVERRIDES)
  }
}
