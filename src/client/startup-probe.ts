/**
 * Startup probe: the glass layer keys off host DOM conventions (stamped
 * data-* seams, semantic trigger selectors). A host refactor that renames any
 * of them fails silently — glass just stops applying to a panel, the hotkey
 * no-ops. This probe re-runs the seam selectors after the shell has mounted,
 * reports per-seam hit counts on `window.__avGlassProbe`, and logs a one-line
 * summary so degradation is diagnosable at a glance (the formalized version
 * of the manual browser diagnosis from log #19).
 */

import { SEAMS } from './seam-stamper.ts'
import { SETTINGS_TRIGGER_SELECTOR } from './settings-hotkey.ts'

/** Per-seam probe result: how many host elements the selector currently matches. */
export interface AVSeamProbeResult {
  /** The seam attribute that would be stamped onto the matches. */
  attribute: string
  /** Number of elements the seam selector matches right now. */
  hits: number
}

/** One probe pass. */
export interface AVGlassProbeReport {
  /** When the pass ran (ISO timestamp). */
  at: string
  /** Every seam, in stamp order. */
  seams: AVSeamProbeResult[]
  /** Attributes with zero matches — the silent-degradation suspects. */
  missing: string[]
  /** Whether the host settings trigger is currently addressable. */
  settingsTrigger: boolean
}

/** The probe surface exposed on `window`. */
export interface AVGlassProbe {
  /** Re-run the probe on demand (e.g. after the shell finished mounting). */
  run: () => AVGlassProbeReport
  /** The most recent pass, `null` before the first run. */
  last: AVGlassProbeReport | null
}

const GLOBAL_KEY = '__avGlassProbe'

type ProbeWindow = Window & Record<string, unknown>

function collect(): AVGlassProbeReport {
  const seams = SEAMS.map((seam) => ({
    attribute: seam.attribute,
    hits: document.querySelectorAll(seam.selector).length,
  }))
  // Only `first` seams are structural — the shell must render them exactly
  // once, so zero hits means a renamed host convention. Non-first seams match
  // stateful controls (new-session, composer add) that may legitimately be
  // absent; their counts are informational and never raise the alarm.
  const missing = SEAMS.flatMap((seam, i) =>
    seam.first === true && seams[i].hits === 0 ? [seam.attribute] : [])
  const trigger =
    document.querySelector(`[data-dsh-sidebar] ${SETTINGS_TRIGGER_SELECTOR}`)
    ?? document.querySelector(SETTINGS_TRIGGER_SELECTOR)
  return { at: new Date().toISOString(), seams, missing, settingsTrigger: trigger !== null }
}

function runOnce(probe: AVGlassProbe): AVGlassProbeReport {
  const report = collect()
  probe.last = report
  const hit = report.seams.length - report.missing.length
  const summary = report.missing.length === 0
    ? `${hit}/${report.seams.length} seams`
    : `${hit}/${report.seams.length} seams, MISSING: ${report.missing.join(', ')}`
  console.info(`[av-glass] probe: ${summary}; settings trigger ${report.settingsTrigger ? 'found' : 'NOT FOUND'}`)
  return report
}

/**
 * Install the probe on `window` and run it once. Intended for a short delay
 * after mount, so the host shell has rendered and the seams are stompable.
 */
export function installStartupProbe(): void {
  const probe: AVGlassProbe = { run: () => runOnce(probe), last: null }
  ;(window as ProbeWindow)[GLOBAL_KEY] = probe
  runOnce(probe)
}

/** Remove the probe global (unmount: plugin off = stock UI, no plugin globals). */
export function removeStartupProbe(): void {
  delete (window as ProbeWindow)[GLOBAL_KEY]
}
