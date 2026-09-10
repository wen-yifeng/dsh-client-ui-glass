import z from "@deepseek-ai/schemastery";
//#region src/index.ts
/**
* AV Glass theme-layer plugin, node half.
*
* The browser half ships via exports["./client"] and owns the whole visual
* layer. The host half exists so the settings surface can dispatch this
* plugin's card: `settings.plugin.item` is a keyed slot whose keys are
* settings namespaces served by the Host. Registering `ui-av-glass` here is
* what makes the browser card render at all.
*/
/** Settings namespace owned by this plugin (lowercase hyphenated id). */
const NAMESPACE = "ui-av-glass";
/** Durable section: one master switch, on by default. */
const CONFIG = z.object({ enabled: z.boolean().default(true) });
/**
* Register the namespace when the settings service is present. The
* registration rides the plugin fiber, so it is removed on unload.
* @param ctx - cordis context.
*/
function apply(ctx) {
	ctx.inject(["settings"], (settingsCtx) => {
		settingsCtx.settings.register(NAMESPACE, CONFIG);
	});
}
//#endregion
export { CONFIG, NAMESPACE, apply };

//# sourceMappingURL=index.js.map