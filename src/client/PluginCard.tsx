import { useSyncExternalStore } from 'react'
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
 * Read the aura opt-in state; same ground-truth pattern as the master switch.
 * @param onChange - notified whenever the attribute flips.
 * @returns disposer removing the observer.
 */
function subscribeAuraAttribute(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-dsh-av-aura'] })
  return () => { observer.disconnect() }
}

/** @returns whether the aura backdrop is currently opted in. */
function readAuraAttribute(): boolean {
  return document.documentElement.hasAttribute('data-dsh-av-aura')
}

/**
 * Render the AV Glass row: the master switch plus the aura backdrop sub-switch
 * (visible only while the skin is mounted — the aura rules require both
 * attributes, so a hidden row would otherwise read as a broken toggle).
 * @param props - composed slot props.
 * @returns the row list item.
 */
export function AVGlassPluginCard(props: AVGlassPluginCardComponentProps) {
  const { t, setEnabled, setAura } = props
  const enabled = useSyncExternalStore(subscribeGlassAttribute, readGlassAttribute)
  const aura = useSyncExternalStore(subscribeAuraAttribute, readAuraAttribute)
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
          <div className={css.avg_text}>
            <div className={css.avg_title}>{t('av.auraTitle')}</div>
            <div className={css.avg_description}>{t('av.auraDescription')}</div>
          </div>
          <button
            type="button"
            className={css.avg_toggle}
            aria-pressed={aura}
            onClick={() => { setAura(!aura) }}
          >
            <span className={css.avg_check}>{aura ? '✓' : ''}</span>
            {aura ? t('av.enable') : t('av.disable')}
          </button>
        </div>
      )}
    </li>
  )
}