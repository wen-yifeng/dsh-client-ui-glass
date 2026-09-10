/**
 * AV Glass theme-layer plugin, node half.
 *
 * The browser half ships via exports["./client"] and owns the whole visual
 * layer. The host half exists so the settings surface can dispatch this
 * plugin's card: `settings.plugin.item` is a keyed slot whose keys are
 * settings namespaces served by the Host. Registering `ui-av-glass` here is
 * what makes the browser card render at all.
 */
import z from '@deepseek-ai/schemastery'

/** Settings namespace owned by this plugin (lowercase hyphenated id). */
export const NAMESPACE = 'ui-av-glass'

/** Durable section: one master switch, on by default. */
export const CONFIG = z.object({
  enabled: z.boolean().default(true),
})

/**
 * Register the namespace when the settings service is present. The
 * registration rides the plugin fiber, so it is removed on unload.
 * @param ctx - cordis context.
 */
export function apply(ctx: import('@deepseek-ai/cordis').Context): void {
  ctx.inject(['settings'], (settingsCtx) => {
    settingsCtx.settings.register(NAMESPACE, CONFIG)
  })
}
