import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { ChangeEvent } from 'react'
import type { InjectFace, PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type { AVGlassCardInjected, createAVGlassCardStore } from './settings-store.ts'
import css from './PluginCard.module.css'

/** Full component props: runtime share + locale seat + store + injected business face. */
export type AVGlassPluginCardComponentProps =
  PropsRuntime<'settings.general.item'> & PropsLocale<'settings.avglass'> & PropsStore<ReturnType<typeof createAVGlassCardStore>> & InjectFace<AVGlassCardInjected>

/**
 * Read the mounted skin state. The `data-dsh-av-glass` attribute on `<html>`
 * is the ground truth — what the user actually sees — so the toggle mirrors
 * it directly instead of a store mirror that can desync from the layer.
 * @param onChange - notified whenever the attribute flips.
 * @returns disposer removing the observer.
 */
function subscribeGlassAttribute(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-dsh-av-glass'] })
  return () => { observer.disconnect() }
}

/** @returns whether the glass skin is currently mounted. */
function readGlassAttribute(): boolean {
  return document.documentElement.hasAttribute('data-dsh-av-glass')
}

/**
 * Read the custom-backdrop state; same ground-truth pattern as the other rows.
 * @param onChange - notified whenever the attribute flips.
 * @returns disposer removing the observer.
 */
function subscribeAuraCustomAttribute(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-dsh-av-aura-custom'] })
  return () => { observer.disconnect() }
}

/** @returns whether a user-supplied backdrop image is currently installed. */
function readAuraCustomAttribute(): boolean {
  return document.documentElement.hasAttribute('data-dsh-av-aura-custom')
}

/** @returns the inline stage-image value (`url("blob:…")`), '' when absent. */
function readAuraImageVar(): string {
  return getComputedStyle(document.documentElement).getPropertyValue('--av-aura-stage-image').trim()
}

/**
 * Read the wallpaper-blur state; same ground-truth pattern as the other rows.
 * @param onChange - notified whenever the attribute flips.
 * @returns disposer removing the observer.
 */
function subscribeAuraBlurAttribute(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-dsh-av-aura-blur'] })
  return () => { observer.disconnect() }
}

/** @returns whether the wallpaper blur is currently opted in. */
function readAuraBlurAttribute(): boolean {
  return document.documentElement.hasAttribute('data-dsh-av-aura-blur')
}

/**
 * Read the settings-hotkey state; same ground-truth pattern as the other rows.
 * The attribute carries the bound key and is absent while the binding is off.
 * @param onChange - notified whenever the hotkey changes.
 * @returns disposer removing the observer.
 */
function subscribeHotkeyAttribute(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-dsh-av-hotkey'] })
  return () => { observer.disconnect() }
}

/** @returns the current hotkey (`''` = binding disabled). */
function readHotkeyAttribute(): string {
  return document.documentElement.getAttribute('data-dsh-av-hotkey') ?? ''
}

/**
 * Render the AV Glass row: the master switch, the custom-backdrop row (with a
 * live thumbnail), the wallpaper-blur sub-switch, and the settings-hotkey
 * recorder last — visible only while the skin is mounted. The blur row
 * further requires an installed custom image — with no wallpaper on the
 * stage there is nothing to blur.
 * @param props - composed slot props.
 * @returns the row list item.
 */
export function AVGlassPluginCard(props: AVGlassPluginCardComponentProps) {
  const { t, setEnabled, setAuraImage, setAuraBlur, setHotkey } = props
  const enabled = useSyncExternalStore(subscribeGlassAttribute, readGlassAttribute)
  const custom = useSyncExternalStore(subscribeAuraCustomAttribute, readAuraCustomAttribute)
  const imageVar = useSyncExternalStore(subscribeAuraCustomAttribute, readAuraImageVar)
  const blur = useSyncExternalStore(subscribeAuraBlurAttribute, readAuraBlurAttribute)
  const hotkey = useSyncExternalStore(subscribeHotkeyAttribute, readHotkeyAttribute)
  const fileRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [recording, setRecording] = useState(false)
  const [note, setNote] = useState<string | null>(null)

  // Record mode: capture the next key (capture phase, so the plugin owns it
  // before the hotkey binding). Escape cancels, Delete/Backspace clears,
  // modifiers and IME composition are ignored, any printable key binds.
  useEffect(() => {
    if (!recording) return
    const onKey = (event: KeyboardEvent): void => {
      event.preventDefault()
      event.stopPropagation()
      if (event.key === 'Escape') { setRecording(false); return }
      if (event.key === 'Delete' || event.key === 'Backspace') { setHotkey(''); setRecording(false); return }
      if (event.ctrlKey || event.altKey || event.metaKey) return
      if (event.isComposing || event.keyCode === 229) return
      if (event.key.length === 1) { setHotkey(event.key); setRecording(false) }
    }
    window.addEventListener('keydown', onKey, true)
    return () => { window.removeEventListener('keydown', onKey, true) }
  }, [recording, setHotkey])

  const description = note ?? (custom ? t('av.customActive') : t('av.customDescription'))

  const onPickFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file || busy) return
    setBusy(true)
    setNote(t('av.processing'))
    try {
      const persisted = await setAuraImage(file)
      setNote(persisted ? null : t('av.storageSessionOnly'))
    } catch {
      setNote(t('av.imageFailed'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <li className={css.avg_card}>
      <div className={css.avg_head}>
        <div className={css.avg_text}>
          <div className={css.avg_title}>{t('av.title')}</div>
          <div className={css.avg_description}>{t('av.description')}</div>
        </div>
        <button
          type="button"
          className={css.avg_toggle}
          aria-pressed={enabled}
          onClick={() => { setEnabled(!enabled) }}
        >
          <span className={css.avg_check}>{enabled ? '✓' : ''}</span>
          {enabled ? t('av.enable') : t('av.disable')}
        </button>
      </div>
      {enabled && (
        <div className={css.avg_head}>
          {custom && imageVar && (
            <div className={css.avg_thumb} style={{ backgroundImage: imageVar }} aria-hidden="true" />
          )}
          <div className={css.avg_text}>
            <div className={css.avg_title}>{t('av.customTitle')}</div>
            <div className={css.avg_description}>{description}</div>
          </div>
          <div className={css.avg_actions}>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickFile} />
            <button
              type="button"
              className={css.avg_toggle}
              disabled={busy}
              onClick={() => { fileRef.current?.click() }}
            >
              {t('av.upload')}
            </button>
            {custom && (
              <button
                type="button"
                className={css.avg_toggle}
                disabled={busy}
                onClick={() => { void setAuraImage(null); setNote(null) }}
              >
                {t('av.reset')}
              </button>
            )}
          </div>
        </div>
      )}
      {enabled && custom && (
        <div className={css.avg_head}>
          <div className={css.avg_text}>
            <div className={css.avg_title}>{t('av.blurTitle')}</div>
            <div className={css.avg_description}>{t('av.blurDescription')}</div>
          </div>
          <button
            type="button"
            className={css.avg_toggle}
            aria-pressed={blur}
            onClick={() => { setAuraBlur(!blur) }}
          >
            <span className={css.avg_check}>{blur ? '✓' : ''}</span>
            {blur ? t('av.enable') : t('av.disable')}
          </button>
        </div>
      )}
      {enabled && (
        <div className={css.avg_head}>
          <div className={css.avg_text}>
            <div className={css.avg_title}>{t('av.hotkeyTitle')}</div>
            <div className={css.avg_description}>{t('av.hotkeyDescription')}</div>
          </div>
          <button
            type="button"
            className={css.avg_toggle}
            aria-pressed={recording}
            onBlur={() => { setRecording(false) }}
            onClick={() => { setRecording(true) }}
          >
            <span className={css.avg_check}>{recording ? '•' : ''}</span>
            {recording ? t('av.hotkeyRecording') : hotkey === '' ? t('av.hotkeyOff') : hotkey.toUpperCase()}
          </button>
        </div>
      )}
    </li>
  )
}
