import type { Context } from '@deepseek-ai/cordis'
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'
import { startGlassInteraction } from './glass-interaction.ts'
import { startSeamStamper } from './seam-stamper.ts'

/** html attribute selecting the AV Glass layer. */
export const AV_ATTRIBUTE = 'data-dsh-av-glass'

/** html attribute opting in to the aura backdrop stage (requires AV_ATTRIBUTE). */
export const AURA_ATTRIBUTE = 'data-dsh-av-aura'

/** Literal class of the aura stage layer (plain glass.css, un-hashed). */
const AURA_STAGE_CLASS = 'av-aura-stage'

/**
 * localStorage key of the aura opt-in. The host settings scope persists the
 * card store, but nothing reads it back into the layer — the durable aura
 * choice lives here instead (log #36 persistence follow-up).
 */
const AURA_STORAGE_KEY = 'dsh-av-glass-aura'

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
 * Alias-token override layer: the Infinite Canvas dark mother-glass palette.
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
  '--dsw-alias-bg-mask-1': both('rgba(4, 8, 14, 0.55)'),
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
  private aura: boolean
  private auraStage?: HTMLElement
  private tokenDisposer?: () => void
  private interactionDisposer?: () => void
  private seamDisposer?: () => void
  private readonly listeners = new Set<() => void>()

  constructor(ctx: AVGlassContext) {
    this.ctx = ctx
    this.enabled = DEFAULT_ENABLED
    this.aura = this.readAuraPref()
    if (this.enabled) this.mount()
  }

  getEnabled(): boolean {
    return this.enabled
  }

  getAura(): boolean {
    return this.aura
  }

  /** Stored aura choice; unreadable storage (privacy modes) falls back to off. */
  private readAuraPref(): boolean {
    try {
      return localStorage.getItem(AURA_STORAGE_KEY) === '1'
    } catch {
      // localStorage access can throw in privacy modes; default off is safe.
      return false
    }
  }

  private writeAuraPref(value: boolean): void {
    try {
      localStorage.setItem(AURA_STORAGE_KEY, value ? '1' : '0')
    } catch {
      // Same as readAuraPref: the choice stays session-only, toggling still works.
    }
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

  /** Flip the aura backdrop. The attribute only matters while the glass is mounted. */
  setAura(value: boolean): void {
    if (value === this.aura) return
    this.aura = value
    this.writeAuraPref(value)
    const el = document.documentElement
    if (value) el.setAttribute(AURA_ATTRIBUTE, '')
    else el.removeAttribute(AURA_ATTRIBUTE)
    for (const listener of this.listeners) listener()
  }

  private mount(): void {
    const el = document.documentElement
    el.setAttribute(AV_ATTRIBUTE, '')
    el.style.setProperty('color-scheme', 'dark')
    if (this.aura) el.setAttribute(AURA_ATTRIBUTE, '')
    this.mountAuraStage()
    this.applyTokens()
    this.seamDisposer = startSeamStamper()
    this.interactionDisposer = startGlassInteraction()
  }

  private unmount(): void {
    const el = document.documentElement
    el.removeAttribute(AV_ATTRIBUTE)
    el.removeAttribute(AURA_ATTRIBUTE)
    el.style.removeProperty('color-scheme')
    this.auraStage?.remove()
    this.auraStage = undefined
    this.tokenDisposer?.()
    this.tokenDisposer = undefined
    this.interactionDisposer?.()
    this.interactionDisposer = undefined
    this.seamDisposer?.()
    this.seamDisposer = undefined
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
