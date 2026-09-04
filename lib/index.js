import { settingsNamespace } from "@deepseek-ai/dsh-settings";
import z from "@deepseek-ai/schemastery";

/** Settings namespace owned by this plugin. */
export const NAMESPACE = settingsNamespace("ui-av-glass");

/** Durable section: one master switch, on by default. */
export const CONFIG = z.object({ enabled: z.boolean().default(true) });

/**
 * Register the namespace when the settings service is present. The browser
 * card is dispatched by `settings.plugin.item` keyed on this namespace, so the
 * Host must serve it even though it owns no other host-side behavior.
 */
export function apply(ctx) {
  ctx.inject(["settings"], (settingsCtx) => {
    settingsCtx.settings.register(NAMESPACE, CONFIG);
  });
}
