import type { ClientContext, BoundActions } from '@deepseek-ai/dsh-client-runtime/client'
import { AVGlassPluginCard } from './PluginCard.tsx'
import { createAVGlassCardStore, type AVGlassCardInjected } from './settings-store.ts'
import { en, NS, zh } from './locales.ts'
import { AVGlassLayer } from './theme-layer.ts'
import './glass.css'
import './PluginCard.module.css'

/** Required services: theme override stack, slot surface, and locale. */
export const inject = ['theme', 'slots', 'locale']

/**
 * Client plugin body.
 * @param ctx - client cordis context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'av-glass: settings dictionaries')

  const layer = new AVGlassLayer(ctx)
  const store = createAVGlassCardStore()
  let bound: BoundActions<typeof store> | undefined
  let revision = 0

  const sync = (): void => {
    bound?.sync({ enabled: layer.getEnabled(), aura: layer.getAura() }, revision)
    revision += 1
  }

  const injected = (actions: BoundActions<typeof store>): AVGlassCardInjected => {
    bound = actions
    sync()
    return {
      setEnabled: (enabled) => {
        layer.setEnabled(enabled)
        sync()
      },
      setAura: (aura) => {
        layer.setAura(aura)
        sync()
      },
    }
  }

  // Single master switch in the General section, right under Appearance.
  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'av-glass',
    order: 12,
    store,
    locale: NS,
    inject: injected,
  }, AVGlassPluginCard))
}