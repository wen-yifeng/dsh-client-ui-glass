window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-glass",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region virtual:dsh-module-css:D:\dsh\.dsh\plugins\@deepseek-ai\dsh-client-ui-glass\src\client\PluginCard.module.css.mjs
		const css$1 = ".z7TMwG_avg_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:12px;flex-direction:column;padding:16px;display:flex}.z7TMwG_avg_head{justify-content:space-between;align-items:center;gap:16px;display:flex}.z7TMwG_avg_head+.z7TMwG_avg_head{margin-top:14px}.z7TMwG_avg_text{flex-direction:column;gap:2px;min-width:0;display:flex}.z7TMwG_avg_title{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;line-height:22px}.z7TMwG_avg_description{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.z7TMwG_avg_toggle{border:1px solid var(--dsw-alias-border-l2);height:28px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:14px;flex:none;align-items:center;gap:6px;padding:0 10px 0 6px;font-size:12px;line-height:18px;display:inline-flex}.z7TMwG_avg_toggle:hover{background:var(--dsw-alias-interactive-bg-hover)}.z7TMwG_avg_toggle[aria-pressed=true]{background:var(--dsw-alias-state-business-tertiary);color:var(--dsw-alias-state-business-primary);border-color:#0000}.z7TMwG_avg_check{justify-content:center;align-items:center;width:16px;height:16px;display:inline-flex}";
		const tagId$1 = "@deepseek-ai/dsh-client-ui-glass/PluginCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-glass";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var PluginCard_module_css_default = {
			"avg_text": "z7TMwG_avg_text",
			"avg_head": "z7TMwG_avg_head",
			"avg_title": "z7TMwG_avg_title",
			"avg_description": "z7TMwG_avg_description",
			"avg_toggle": "z7TMwG_avg_toggle",
			"avg_check": "z7TMwG_avg_check",
			"avg_card": "z7TMwG_avg_card"
		};
		//#endregion
		//#region src/client/PluginCard.tsx
		/**
		* Read the mounted skin state. The `data-dsh-av-glass` attribute on `<html>`
		* is the ground truth — what the user actually sees — so the toggle mirrors
		* it directly instead of a store mirror that can desync from the layer.
		* @param onChange - notified whenever the attribute flips.
		* @returns disposer removing the observer.
		*/
		function subscribeGlassAttribute(onChange) {
			const observer = new MutationObserver(onChange);
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["data-dsh-av-glass"]
			});
			return () => {
				observer.disconnect();
			};
		}
		/** @returns whether the glass skin is currently mounted. */
		function readGlassAttribute() {
			return document.documentElement.hasAttribute("data-dsh-av-glass");
		}
		/**
		* Read the aura opt-in state; same ground-truth pattern as the master switch.
		* @param onChange - notified whenever the attribute flips.
		* @returns disposer removing the observer.
		*/
		function subscribeAuraAttribute(onChange) {
			const observer = new MutationObserver(onChange);
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["data-dsh-av-aura"]
			});
			return () => {
				observer.disconnect();
			};
		}
		/** @returns whether the aura backdrop is currently opted in. */
		function readAuraAttribute() {
			return document.documentElement.hasAttribute("data-dsh-av-aura");
		}
		/**
		* Render the AV Glass row: the master switch plus the aura backdrop sub-switch
		* (visible only while the skin is mounted — the aura rules require both
		* attributes, so a hidden row would otherwise read as a broken toggle).
		* @param props - composed slot props.
		* @returns the row list item.
		*/
		function AVGlassPluginCard(props) {
			const { t, setEnabled, setAura } = props;
			const enabled = (0, react.useSyncExternalStore)(subscribeGlassAttribute, readGlassAttribute);
			const aura = (0, react.useSyncExternalStore)(subscribeAuraAttribute, readAuraAttribute);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: PluginCard_module_css_default.avg_card,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: PluginCard_module_css_default.avg_head,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: PluginCard_module_css_default.avg_text,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: PluginCard_module_css_default.avg_title,
							children: t("av.title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: PluginCard_module_css_default.avg_description,
							children: t("av.description")
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: PluginCard_module_css_default.avg_toggle,
						"aria-pressed": enabled,
						onClick: () => {
							setEnabled(!enabled);
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: PluginCard_module_css_default.avg_check,
							children: enabled ? "✓" : ""
						}), enabled ? t("av.enable") : t("av.disable")]
					})]
				}), enabled && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: PluginCard_module_css_default.avg_head,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: PluginCard_module_css_default.avg_text,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: PluginCard_module_css_default.avg_title,
							children: t("av.auraTitle")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: PluginCard_module_css_default.avg_description,
							children: t("av.auraDescription")
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: PluginCard_module_css_default.avg_toggle,
						"aria-pressed": aura,
						onClick: () => {
							setAura(!aura);
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: PluginCard_module_css_default.avg_check,
							children: aura ? "✓" : ""
						}), aura ? t("av.enable") : t("av.disable")]
					})]
				})]
			});
		}
		//#endregion
		//#region src/client/settings-store.ts
		/**
		* Declare the master-switch store (glass + aura opt-in). The apply-world
		* change listener is the only writer; the card reads through the slot's
		* `useStore` selector.
		* @returns the store handle for the settings.general.item registration.
		*/
		function createAVGlassCardStore() {
			return (0, _deepseek_ai_dsh_client_runtime_client.defineStore)({
				init: () => ({
					enabled: true,
					aura: false,
					revision: -1
				}),
				actions: { sync: (d, next, revision) => {
					if (revision <= d.revision) return;
					d.enabled = next.enabled;
					d.aura = next.aura;
					d.revision = revision;
				} }
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `settings.avglass` namespace dictionaries (the settings-row copy). */
		/** Dictionary namespace owned by this plugin. */
		const NS = "settings.avglass";
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"av.title": "玻璃模式",
			"av.description": "为整个界面套用单一母材质的暗色玻璃：分层材质、悬停扫光与极光背板",
			"av.enable": "开启",
			"av.disable": "关闭",
			"av.auraTitle": "背板光晕",
			"av.auraDescription": "在纯黑舞台叠加三枚静态冷光斑，让磨砂玻璃透出更明显的层次"
		};
		/** English dictionary. */
		const en = {
			"av.title": "Glass mode",
			"av.description": "A global dark glass UI: layered mother material, hover sweep and aurora backdrop",
			"av.enable": "On",
			"av.disable": "Off",
			"av.auraTitle": "Backdrop aura",
			"av.auraDescription": "Three static cool light spots on the black stage for a stronger frosted read"
		};
		//#endregion
		//#region src/client/glass-interaction.ts
		/** Attribute marking Tier A (top-level) controls for sweep + pointer spot. */
		const TOP_ATTRIBUTE = "data-av-interaction";
		/** Stable DSH seams that identify top-level entry controls. */
		const TOP_SELECTOR = [
			"header button",
			"[data-phase] header button",
			"[data-composer-card] button[class*=\"primary\"]",
			"button[class*=\"add\"]",
			"button[class*=\"newSession\"]",
			"button[class*=\"primary\"]",
			"[role=\"dialog\"] button[type=\"submit\"]"
		].join(", ");
		/**
		* Port of Infinite Canvas static/js/glass-interaction.js.
		* No idle animation: the sweep is driven by CSS :hover/:focus-visible, and
		* this module only feeds the pointer-following spot on mouse/pen hover.
		*/
		function startGlassInteraction() {
			const root = document.documentElement;
			const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
			const stamp = () => {
				for (const el of Array.from(document.querySelectorAll(TOP_SELECTOR))) el.setAttribute(TOP_ATTRIBUTE, "top");
			};
			const clearAll = () => {
				for (const el of Array.from(document.querySelectorAll(`[${TOP_ATTRIBUTE}]`))) {
					el.removeAttribute(TOP_ATTRIBUTE);
					el.classList.remove("av-pointer-active");
					el.style.removeProperty("--av-glass-x");
					el.style.removeProperty("--av-glass-y");
				}
			};
			let activeTarget = null;
			let pendingPointer = null;
			let frame = 0;
			const clearPointer = () => {
				if (activeTarget) {
					activeTarget.style.removeProperty("--av-glass-x");
					activeTarget.style.removeProperty("--av-glass-y");
					activeTarget.classList.remove("av-pointer-active");
				}
				activeTarget = null;
				pendingPointer = null;
				if (frame) {
					cancelAnimationFrame(frame);
					frame = 0;
				}
			};
			const paint = () => {
				frame = 0;
				const pointer = pendingPointer;
				pendingPointer = null;
				if (!pointer || reducedMotion?.matches) {
					clearPointer();
					return;
				}
				const target = pointer.target?.closest?.(`[${TOP_ATTRIBUTE}="top"]`);
				if (!target || target.matches?.(":disabled,[aria-disabled=\"true\"],[aria-busy=\"true\"]")) {
					clearPointer();
					return;
				}
				if (activeTarget !== target) {
					clearPointer();
					activeTarget = target;
					activeTarget.classList.add("av-pointer-active");
				}
				const rect = target.getBoundingClientRect();
				if (rect.width <= 0 || rect.height <= 0) {
					clearPointer();
					return;
				}
				const x = Math.max(0, Math.min(rect.width, pointer.clientX - rect.left));
				const y = Math.max(0, Math.min(rect.height, pointer.clientY - rect.top));
				target.style.setProperty("--av-glass-x", `${x.toFixed(1)}px`);
				target.style.setProperty("--av-glass-y", `${y.toFixed(1)}px`);
			};
			const onPointerMove = (event) => {
				if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") {
					clearPointer();
					return;
				}
				pendingPointer = event;
				if (!frame) frame = requestAnimationFrame(paint);
			};
			stamp();
			const observer = new MutationObserver(() => {
				stamp();
			});
			observer.observe(root, {
				childList: true,
				subtree: true
			});
			window.addEventListener("pointermove", onPointerMove, { passive: true });
			window.addEventListener("pointerleave", clearPointer, { passive: true });
			window.addEventListener("pointercancel", clearPointer, { passive: true });
			window.addEventListener("blur", clearPointer, { passive: true });
			return () => {
				observer.disconnect();
				window.removeEventListener("pointermove", onPointerMove);
				window.removeEventListener("pointerleave", clearPointer);
				window.removeEventListener("pointercancel", clearPointer);
				window.removeEventListener("blur", clearPointer);
				clearPointer();
				clearAll();
			};
		}
		//#endregion
		//#region src/client/seam-stamper.ts
		const SEAMS = [
			{
				attribute: "data-dsh-frame",
				selector: "[class*=\"frame\"]",
				first: true
			},
			{
				attribute: "data-dsh-sidebar",
				selector: "[class*=\"sidebarCol\"]",
				first: true
			},
			{
				attribute: "data-dsh-sidebar-root",
				selector: "[class*=\"sidebarCol\"] [class*=\"root\"]",
				first: true
			},
			{
				attribute: "data-dsh-center",
				selector: "[class*=\"centerCol\"]",
				first: true
			},
			{
				attribute: "data-dsh-details",
				selector: "[class*=\"detailsCol\"] [class*=\"root\"]",
				first: true
			},
			{
				attribute: "data-dsh-header",
				selector: "[class*=\"centerCol\"] header",
				first: true
			},
			{
				attribute: "data-dsh-composer",
				selector: "[class*=\"composerSeat\"]",
				first: true
			},
			{
				attribute: "data-dsh-surface",
				selector: "button[class*=\"newSession\"]"
			},
			{
				attribute: "data-dsh-add",
				selector: "[class*=\"composerSeat\"] [class*=\"add\"]",
				first: true
			}
		];
		function stampSeams() {
			for (const seam of SEAMS) {
				if (seam.first) {
					const el = document.querySelector(seam.selector);
					if (el !== null && !el.hasAttribute(seam.attribute)) el.setAttribute(seam.attribute, "");
					continue;
				}
				for (const el of Array.from(document.querySelectorAll(seam.selector))) if (!el.hasAttribute(seam.attribute)) el.setAttribute(seam.attribute, "");
			}
		}
		/** Remove every stamped seam attribute. */
		function clearSeams() {
			for (const seam of SEAMS) for (const el of Array.from(document.querySelectorAll(`[${seam.attribute}]`))) el.removeAttribute(seam.attribute);
		}
		/**
		* Stamp the seams once, then keep them stamped as React remounts nodes.
		* @returns a disposer that disconnects the observer.
		*/
		function startSeamStamper() {
			stampSeams();
			const observer = new MutationObserver(() => {
				stampSeams();
			});
			observer.observe(document.documentElement, {
				childList: true,
				subtree: true
			});
			return () => {
				observer.disconnect();
				clearSeams();
			};
		}
		//#endregion
		//#region src/client/theme-layer.ts
		/** html attribute selecting the AV Glass layer. */
		const AV_ATTRIBUTE = "data-dsh-av-glass";
		/** html attribute opting in to the aura backdrop stage (requires AV_ATTRIBUTE). */
		const AURA_ATTRIBUTE = "data-dsh-av-aura";
		/** Literal class of the aura stage layer (plain glass.css, un-hashed). */
		const AURA_STAGE_CLASS = "av-aura-stage";
		/**
		* localStorage key of the aura opt-in. The host settings scope persists the
		* card store, but nothing reads it back into the layer — the durable aura
		* choice lives here instead (log #36 persistence follow-up).
		*/
		const AURA_STORAGE_KEY = "dsh-av-glass-aura";
		/** Default state while the settings scope has not answered yet: on. */
		const DEFAULT_ENABLED = true;
		/** The layer's identity in the theme override stack. */
		const OVERRIDE_SOURCE = "@deepseek-ai/dsh-client-ui-glass";
		const both = (value) => ({
			light: value,
			dark: value
		});
		/**
		* Alias-token override layer: the Infinite Canvas dark mother-glass palette.
		* Every value is a `{ light, dark }` pair and both modes resolve to the same
		* dark values, so the skin stays identical when Appearance flips.
		*/
		const AV_TOKEN_OVERRIDES = {
			"--dsw-alias-bg-base": both("#0A0C0D"),
			"--dsw-alias-bg-layer-1": both("rgba(24, 26, 28, 0.55)"),
			"--dsw-alias-bg-layer-2": both("rgba(24, 26, 28, 0.44)"),
			"--dsw-alias-bg-layer-3": both("rgba(24, 26, 28, 0.34)"),
			"--dsw-alias-bg-overlay": both("rgba(20, 22, 24, 0.48)"),
			"--dsw-alias-bg-module-platform": both("rgba(24, 26, 28, 0.55)"),
			"--dsw-alias-bg-multi-select": both("rgba(24, 26, 28, 0.44)"),
			"--dsw-alias-bg-skeleton": both("rgba(148, 180, 220, 0.12)"),
			"--dsw-alias-bg-mask-1": both("rgba(4, 8, 14, 0.55)"),
			"--dsw-alias-bg-mask-2": both("rgba(4, 8, 14, 0.25)"),
			"--dsw-alias-bg-mask-3": both("rgba(4, 8, 14, 0.50)"),
			"--dsw-alias-bg-mask-drop": both("rgba(12, 18, 27, 0.70)"),
			"--dsw-alias-bg-mask-photo": both("rgba(4, 8, 14, 0.50)"),
			"--dsw-specific-sidebar-fill": both("rgba(4, 6, 8, 0.33)"),
			"--dsw-alias-border-l1": both("rgba(255, 255, 255, 0.07)"),
			"--dsw-alias-border-l2": both("rgba(255, 255, 255, 0.11)"),
			"--dsw-alias-border-l2-darkmode-thin": both("rgba(255, 255, 255, 0.08)"),
			"--dsw-alias-border-l3": both("rgba(255, 255, 255, 0.18)"),
			"--dsw-alias-border-l4": both("rgba(255, 255, 255, 0.28)"),
			"--dsw-alias-border-inverted": both("rgba(255, 255, 255, 0.06)"),
			"--dsw-alias-border-inverted2": both("rgba(255, 255, 255, 0.08)"),
			"--dsw-alias-label-primary": both("rgba(249, 252, 250, 0.96)"),
			"--dsw-alias-label-secondary": both("rgba(238, 244, 240, 0.82)"),
			"--dsw-alias-label-tertiary": both("rgba(238, 244, 240, 0.62)"),
			"--dsw-alias-label-caption": both("rgba(238, 244, 240, 0.46)"),
			"--dsw-alias-label-dimmed": both("rgba(238, 244, 240, 0.30)"),
			"--dsw-alias-label-primary-bluish": both("rgba(191, 214, 246, 0.95)"),
			"--dsw-alias-label-primary-dimmed": both("rgba(238, 244, 240, 0.62)"),
			"--dsw-alias-label-primary-foreground": both("#0A0C0D"),
			"--dsw-alias-label-primary-inverted": both("#0A0C0D"),
			"--dsw-alias-brand-primary": both("rgba(198, 233, 220, 0.96)"),
			"--dsw-alias-brand-primary-invert": both("#0A0C0D"),
			"--dsw-alias-brand-primary-new-colorprimary-new-color": both("rgba(198, 233, 220, 0.96)"),
			"--dsw-alias-brand-text": both("rgba(198, 233, 220, 0.96)"),
			"--dsw-alias-button-primary-fill": both("rgba(198, 233, 220, 0.92)"),
			"--dsw-alias-button-primary-hover": both("rgba(211, 239, 229, 0.98)"),
			"--dsw-alias-button-primary-dimmed": both("rgba(198, 233, 220, 0.55)"),
			"--dsw-alias-button-contrast-fill": both("rgba(238, 244, 240, 0.92)"),
			"--dsw-alias-button-elevated-fill": both("rgba(238, 244, 240, 0.10)"),
			"--dsw-alias-button-floating-fill": both("rgba(24, 26, 28, 0.55)"),
			"--dsw-alias-button-floating-hover": both("rgba(238, 244, 240, 0.10)"),
			"--dsw-alias-button-ghost-active-border": both("rgba(198, 233, 220, 0.34)"),
			"--dsw-alias-button-ghost-active-fill": both("rgba(198, 233, 220, 0.14)"),
			"--dsw-alias-button-ghost-active-hover": both("rgba(198, 233, 220, 0.20)"),
			"--dsw-alias-button-info-fill": both("rgba(59, 130, 246, 0.90)"),
			"--dsw-alias-button-info-hover": both("rgba(96, 165, 250, 0.95)"),
			"--dsw-alias-button-tool-bar-fill": both("rgba(238, 244, 240, 0.08)"),
			"--dsw-alias-button-tool-bar-fill-invisible": both("rgba(238, 244, 240, 0.02)"),
			"--dsw-alias-button-tool-bar-hover": both("rgba(238, 244, 240, 0.12)"),
			"--dsw-alias-interactive-bg-active": both("rgba(238, 244, 240, 0.12)"),
			"--dsw-alias-interactive-bg-hover": both("rgba(238, 244, 240, 0.08)"),
			"--dsw-alias-interactive-bg-hover-accent": both("rgba(198, 233, 220, 0.14)"),
			"--dsw-alias-interactive-bg-hover-danger": both("rgba(255, 157, 169, 0.12)"),
			"--dsw-alias-interactive-bg-hover-solid": both("rgba(238, 244, 240, 0.16)"),
			"--dsw-alias-state-business-primary": both("rgba(198, 233, 220, 0.96)"),
			"--dsw-alias-state-business-tertiary": both("rgba(198, 233, 220, 0.12)"),
			"--dsw-alias-state-error-primary": both("rgba(255, 157, 169, 0.96)"),
			"--dsw-alias-state-error-secondary": both("rgba(255, 157, 169, 0.22)"),
			"--dsw-alias-state-success-primary": both("rgba(160, 232, 196, 0.96)"),
			"--dsw-alias-state-success-secondary": both("rgba(160, 232, 196, 0.22)"),
			"--dsw-alias-state-success-tertiary": both("rgba(160, 232, 196, 0.10)"),
			"--dsw-alias-state-warn-label": both("rgba(251, 191, 36, 0.96)"),
			"--dsw-alias-state-warn-primary": both("rgba(251, 191, 36, 0.96)"),
			"--dsw-alias-state-warn-secondary": both("rgba(251, 191, 36, 0.22)"),
			"--dsw-alias-state-warn-tertiary": both("rgba(251, 191, 36, 0.10)"),
			"--dsw-alias-toast-bg": both("rgba(24, 26, 28, 0.92)"),
			"--dsw-alias-tooltip-bg": both("rgba(24, 26, 28, 0.92)"),
			"--dsw-alias-scrollbar-bg-l1": both("rgba(238, 244, 240, 0.08)"),
			"--dsw-alias-scrollbar-bg-l2": both("rgba(238, 244, 240, 0.10)"),
			"--dsw-alias-scrollbar-hover-l1": both("rgba(238, 244, 240, 0.18)"),
			"--dsw-alias-scrollbar-hover-l2": both("rgba(238, 244, 240, 0.22)"),
			"--dsw-alias-markdown-citation": both("rgba(198, 233, 220, 0.12)"),
			"--dsw-alias-markdown-code-block": both("rgba(10, 12, 13, 0.55)"),
			"--dsw-alias-markdown-code-block-banner": both("rgba(10, 12, 13, 0.80)"),
			"--dsw-alias-markdown-code-segment-selected": both("rgba(198, 233, 220, 0.16)"),
			"--dsw-alias-markdown-code-segment-unselected": both("rgba(238, 244, 240, 0.04)"),
			"--dsw-alias-markdown-inline-code": both("rgba(238, 244, 240, 0.10)"),
			"--dsw-alias-markdown-tag": both("rgba(198, 233, 220, 0.16)"),
			"--dsw-alias-markdown-placeholder": both("rgba(238, 244, 240, 0.30)")
		};
		/**
		* AV Glass theme layer: one toggleable visual skin over the whole Web surface.
		* The durable enable flag lives in the Host settings scope (`ui-av-glass`);
		* this layer only owns the in-memory state and its reversible DOM effects.
		*/
		var AVGlassLayer = class {
			ctx;
			enabled;
			aura;
			auraStage;
			tokenDisposer;
			interactionDisposer;
			seamDisposer;
			listeners = /* @__PURE__ */ new Set();
			constructor(ctx) {
				this.ctx = ctx;
				this.enabled = DEFAULT_ENABLED;
				this.aura = this.readAuraPref();
				if (this.enabled) this.mount();
			}
			getEnabled() {
				return this.enabled;
			}
			getAura() {
				return this.aura;
			}
			/** Stored aura choice; unreadable storage (privacy modes) falls back to off. */
			readAuraPref() {
				try {
					return localStorage.getItem(AURA_STORAGE_KEY) === "1";
				} catch {
					return false;
				}
			}
			writeAuraPref(value) {
				try {
					localStorage.setItem(AURA_STORAGE_KEY, value ? "1" : "0");
				} catch {}
			}
			/**
			* Observe enable flips so the settings card can mirror the layer.
			* @param listener - invoked after the flag changes.
			* @returns the disposer removing this listener.
			*/
			subscribe(listener) {
				this.listeners.add(listener);
				return () => this.listeners.delete(listener);
			}
			setEnabled(value) {
				if (value === this.enabled) return;
				this.enabled = value;
				if (value) this.mount();
				else this.unmount();
				for (const listener of this.listeners) listener();
			}
			/** Flip the aura backdrop. The attribute only matters while the glass is mounted. */
			setAura(value) {
				if (value === this.aura) return;
				this.aura = value;
				this.writeAuraPref(value);
				const el = document.documentElement;
				if (value) el.setAttribute(AURA_ATTRIBUTE, "");
				else el.removeAttribute(AURA_ATTRIBUTE);
				for (const listener of this.listeners) listener();
			}
			mount() {
				const el = document.documentElement;
				el.setAttribute(AV_ATTRIBUTE, "");
				el.style.setProperty("color-scheme", "dark");
				if (this.aura) el.setAttribute(AURA_ATTRIBUTE, "");
				this.mountAuraStage();
				this.applyTokens();
				this.seamDisposer = startSeamStamper();
				this.interactionDisposer = startGlassInteraction();
			}
			unmount() {
				const el = document.documentElement;
				el.removeAttribute(AV_ATTRIBUTE);
				el.removeAttribute(AURA_ATTRIBUTE);
				el.style.removeProperty("color-scheme");
				this.auraStage?.remove();
				this.auraStage = void 0;
				this.tokenDisposer?.();
				this.tokenDisposer = void 0;
				this.interactionDisposer?.();
				this.interactionDisposer = void 0;
				this.seamDisposer?.();
				this.seamDisposer = void 0;
			}
			/**
			* The aura stage is a dedicated fixed layer, not a body background: body
			* background propagation rendered unpredictably under the panel stack
			* (log #16). `z-index: -1` paints it above the body background and below
			* every app node, so panel frosts sample it through backdrop-filter.
			*/
			mountAuraStage() {
				if (this.auraStage?.isConnected) return;
				const stage = document.createElement("div");
				stage.className = AURA_STAGE_CLASS;
				document.body.prepend(stage);
				this.auraStage = stage;
			}
			applyTokens() {
				this.tokenDisposer?.();
				this.tokenDisposer = this.ctx.theme.overrideTokens(OVERRIDE_SOURCE, AV_TOKEN_OVERRIDES);
			}
		};
		//#endregion
		//#region virtual:dsh-css:D:\dsh\.dsh\plugins\@deepseek-ai\dsh-client-ui-glass\src\client\glass.css.mjs
		const css = "html[data-dsh-av-glass]{color-scheme:dark;--av-glass-x:50%;--av-glass-y:0%;--av-mother-edge:#f5fcf910;--av-mother-surface:radial-gradient(ellipse 12px 66% at 0 0, #0000004a, #0000001f 44%, transparent 100%), radial-gradient(ellipse 18% 50% at 101% 72%, #d3efe518, transparent 76%), radial-gradient(ellipse 64% 9% at 78% 101%, #edf8f336, #b3e2d60d 44%, transparent 80%), radial-gradient(ellipse 38% 10% at 14% 0%, #ffffff17, transparent 74%), radial-gradient(ellipse 42% 27% at 103% 102%, #b3e1d512, transparent 74%), linear-gradient(153deg, #1f232533 0%, #0b0e103d 38%, #04060854 100%);--av-mother-shadow:0 40px 96px #000000a8, 0 12px 34px #00000057, inset 0 1px 0 #ffffff2b, inset 1px 0 0 #effaf60b, inset 0 2px 0 #0000003d, inset 2px 0 0 #00000024, inset 0 5px 0 #ebfaf407, inset 0 10px 15px #e8f8f10b, inset 6px 0 11px #d3f0e707, inset -1px 0 0 #cae7dd12, inset 0 -2px 0 #dff2e924, inset 0 -7px 12px #b8e4d808, inset 0 0 24px #daf2ea08, inset 1px 0 0 #e8f9f20d, inset 3px 0 0 #0000001f, inset 6px 0 10px #d3f1e70a;--av-mother-shadow-dock:inset 0 1px 0 #ffffff2b, inset 1px 0 0 #effaf60b, inset 0 2px 0 #0000003d, inset 2px 0 0 #00000024, inset 0 5px 0 #ebfaf407, inset 0 10px 15px #e8f8f10b, inset 6px 0 11px #d3f0e707, inset -1px 0 0 #cae7dd12, inset 0 -2px 0 #dff2e924, inset 0 -7px 12px #b8e4d808, inset 0 0 24px #daf2ea08, inset 1px 0 0 #e8f9f20d, inset 3px 0 0 #0000001f, inset 6px 0 10px #d3f1e70a;--av-mother-tool:var(--av-mother-surface);--av-mother-tool-hover:var(--av-mother-surface);--av-mother-tool-shadow:var(--av-mother-shadow);--av-mother-control:var(--av-mother-surface);--av-mother-control-hover:var(--av-mother-surface);--av-mother-control-shadow:var(--av-mother-shadow);--av-mother-control-hover-shadow:var(--av-mother-shadow);--av-mother-surface-compact:var(--av-mother-surface);--av-mother-surface-compact-hover:var(--av-mother-surface);--av-mother-nested-shadow:var(--av-mother-shadow);--av-mother-nested-shadow-hover:var(--av-mother-shadow);--av-mother-text:#eef4f0d1;--av-mother-text-strong:#f9fcfaf5;--av-mother-danger:#ff9da9d6;--av-danger-copy:#fecacaf5;--av-danger-edge:#f8717170;--av-mother-panel-filter:blur(18px) saturate(1.18) brightness(1.04) contrast(1.04);--av-mother-tool-filter:none;--av-mother-control-filter:none;--av-mother-control-light-filter:blur(12px) saturate(.92);--av-mother-compact-filter:blur(10px);--av-mother-nested-filter:blur(8px);--av-mother-dock-filter:blur(12px) saturate(1.18) brightness(1.04) contrast(1.04)}html[data-dsh-av-glass] body{color:var(--av-mother-text);background:#070809}html[data-dsh-av-glass] .av-aura-stage{z-index:-1;pointer-events:none;background:radial-gradient(680px at 280px,#6eaae124,#6eaae117 38%,#0000 82%),radial-gradient(700px at calc(50% + 307px) -12%,#6eaae133,#6eaae121 38%,#0000 82%),radial-gradient(640px at calc(50% + 570px) 88%,#6eaae12b,#6eaae11c 38%,#0000 82%);display:none;position:fixed;inset:0}html[data-dsh-av-glass][data-dsh-av-aura] .av-aura-stage{display:block}html[data-dsh-av-glass][data-dsh-av-aura] [data-dsh-sidebar-root]:before{backdrop-filter:var(--av-mother-dock-filter)!important}html[data-dsh-av-glass] :is([data-dsh-frame],[data-dsh-sidebar],[data-dsh-center],[data-dsh-composer]),html[data-dsh-av-glass] [data-dsh-center] [data-phase]{background:0 0!important}html[data-dsh-av-glass] [data-conversation-scroll]{margin-top:-75px;padding-top:75px;scroll-padding-top:75px}html[data-dsh-av-glass] [data-dsh-header]{z-index:8}html[data-dsh-av-glass] :is([data-dsh-sidebar-root],[data-dsh-details],[data-dsh-header]){outline-offset:-1px;border-radius:16px;position:relative;outline:1px solid var(--av-mother-edge)!important;background:var(--av-mother-surface)!important;box-shadow:var(--av-mother-shadow)!important;color:var(--av-mother-text)!important;backdrop-filter:none!important;border:0!important}html[data-dsh-av-glass] :is([data-dsh-sidebar-root],[data-dsh-details],[data-dsh-header]):before{content:\"\";border-radius:inherit;z-index:-1;pointer-events:none;position:absolute;inset:0;backdrop-filter:var(--av-mother-panel-filter)!important}html[data-dsh-av-glass] [data-dsh-sidebar-root]{box-shadow:var(--av-mother-shadow-dock)!important}html[data-dsh-av-glass] [data-dsh-sidebar]{box-shadow:28px 0 60px #0000006b,8px 0 18px #00000047!important}html[data-dsh-av-glass] [data-dsh-header]{box-shadow:var(--av-mother-shadow), inset 0 -10px 14px #0000004d!important}html[data-dsh-av-glass] [data-dsh-header]:after{--dsw-glass-panel-border:linear-gradient(90deg, #f5fcf900, #f5fcf942 24px, #f5fcf942 calc(100% - 24px), #f5fcf900)}html[data-dsh-av-glass] [data-dsh-header]:before{backdrop-filter:var(--av-mother-dock-filter)!important}html[data-dsh-av-glass] :is([class$=_card],[class*=_card\\ ],[class$=_sessionRow],[class*=_sessionRow\\ ]){background:var(--av-mother-tool)!important;box-shadow:var(--av-mother-tool-shadow)!important;backdrop-filter:var(--av-mother-tool-filter)!important;color:var(--av-mother-text)!important;border:1px solid #ffffff1c!important}html[data-dsh-av-glass] [data-chat-flow] :is([data-tool],[data-state][class*=_root]){border-radius:12px;padding:2px 10px 4px;background:var(--av-mother-tool)!important;box-shadow:var(--av-mother-tool-shadow)!important;backdrop-filter:var(--av-mother-tool-filter)!important;color:var(--av-mother-text)!important;border:1px solid #ffffff1c!important}html[data-dsh-av-glass] [data-testid=todo-panel]{background:var(--av-mother-tool)!important;box-shadow:var(--av-mother-tool-shadow)!important;backdrop-filter:var(--av-mother-tool-filter)!important;color:var(--av-mother-text)!important;border:1px solid #ffffff1c!important}html[data-dsh-av-glass] [data-testid=todo-panel] button:not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]):not([data-av-interaction]):not([class*=_brand]):not([role=tab]):not([class*=fileLink]):not([class*=fileMention]):not([aria-pressed]):not([class*=sessionOverflow]):not([data-av-tone]){box-shadow:none!important;background:0 0!important;border:0!important;outline:none!important}html[data-dsh-av-glass] :is([role=dialog],[role=menu],[role=tooltip],[class*=popover],[class*=dropdown],[class*=bubble],[class*=composerSeat] [class*=card]){outline-offset:-1px;outline:1px solid var(--av-mother-edge)!important;background:var(--av-mother-surface)!important;box-shadow:var(--av-mother-shadow)!important;backdrop-filter:var(--av-mother-panel-filter)!important;color:var(--av-mother-text)!important;border:0!important}html[data-dsh-av-glass] [class*=composerSeat] [class*=card]{backdrop-filter:var(--av-mother-dock-filter)!important}html[data-dsh-av-glass] :is(button,[role=button]):not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]):not([data-av-interaction]):not([class*=_brand]):not([role=tab]):not([class*=fileLink]):not([class*=fileMention]):not([aria-pressed]):not([class*=sessionOverflow]){border:1px solid var(--av-mother-edge)!important;background:var(--av-mother-control)!important;box-shadow:var(--av-mother-control-shadow)!important;backdrop-filter:var(--av-mother-control-filter)!important;color:var(--av-mother-text-strong)!important}html[data-dsh-av-glass] :is([class*=iconButton],[class*=searchButton],[class*=close],[class$=_add],[class*=_add\\ ]){border:1px solid var(--av-mother-edge)!important;background:var(--av-mother-surface-compact)!important;box-shadow:var(--av-mother-nested-shadow)!important;backdrop-filter:var(--av-mother-control-filter)!important;color:var(--av-mother-text-strong)!important}html[data-dsh-av-glass] :is(input,textarea,select){border-color:var(--av-mother-edge)!important;color:var(--av-mother-text-strong)!important;background:0 0!important}html[data-dsh-av-glass] [class$=_inUse]{color:#c6e9dcfa!important;background:#c6e9dc24!important}html[data-dsh-av-glass] :is(button,[role=button]):not([data-disclosure-row]):not([class*=cardMain]):not([data-av-interaction]):not([class*=_brand]):not([role=tab]):not([class*=fileLink]):not([class*=fileMention]):not([aria-pressed]):not([class*=sessionOverflow]):hover:not(:disabled){background:var(--av-mother-control-hover)!important}@keyframes av-top-specular-sweep{0%{transform:translate(-38%)}to{transform:translate(38%)}}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]{--av-top-sweep:#ffffff9e;--av-top-sweep-opacity:.72;--av-top-sweep-duration:.8s;--av-top-spot-core:#ffffff4d;--av-top-spot-mid:#ffffff16;isolation:isolate;outline-offset:-1px;text-shadow:0 1px 2px #00000061;background-size:auto;position:relative;transform:none;outline:1px solid var(--av-mother-edge)!important;color:var(--av-mother-text)!important;background:var(--av-mother-surface-compact)!important;box-shadow:var(--av-mother-nested-shadow)!important;backdrop-filter:var(--av-mother-control-filter)!important;filter:none!important;border:0!important;transition:outline-color .16s,color .16s,box-shadow .18s,background .18s!important;overflow:hidden!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:before{transform:translate(-38%);content:\"\"!important;z-index:1!important;pointer-events:none!important;border-radius:inherit!important;opacity:0!important;background:linear-gradient(105deg, transparent 38%, var(--av-top-sweep) 49%, transparent 60%)!important;filter:none!important;animation:none!important;display:block!important;position:absolute!important;inset:-40% -70%!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:after{content:\"\"!important;z-index:0!important;pointer-events:none!important;border-radius:inherit!important;opacity:0!important;background:radial-gradient(ellipse 112px 76px at var(--av-glass-x,50%) var(--av-glass-y,0%), var(--av-top-spot-core), var(--av-top-spot-mid) 31%, transparent 72%)!important;transition:opacity .16s!important;animation:none!important;display:block!important;position:absolute!important;inset:1px!important;transform:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]>*{z-index:2;position:relative}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top] :is(svg,i){color:currentColor;filter:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:not(:disabled):not([aria-disabled=true]):not([aria-busy=true]):is(:hover,:focus-visible,.active,[aria-pressed=true],[aria-selected=true],[aria-expanded=true]){outline-color:#f5fcf91c;color:var(--av-mother-text-strong)!important;background:var(--av-mother-surface-compact-hover)!important;box-shadow:var(--av-mother-nested-shadow-hover)!important;transform:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:not(:disabled):not([aria-disabled=true]):not([aria-busy=true]):is(:hover,:focus-visible):before{opacity:var(--av-top-sweep-opacity)!important;animation:av-top-specular-sweep var(--av-top-sweep-duration) cubic-bezier(.16, 1, .3, 1) both!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top].av-pointer-active:not(:disabled):not([aria-disabled=true]):not([aria-busy=true]):hover:after{opacity:.82!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:focus-visible:after{opacity:.52!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:focus-visible{outline-offset:2px!important;box-shadow:0 0 0 4px #ffffff12, var(--av-mother-nested-shadow-hover)!important;outline:2px solid #ffffffd1!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:not(:disabled):not([aria-disabled=true]):not([aria-busy=true]):active{transform:translateY(.75px)scale(.988)!important;box-shadow:inset 0 4px 10px #0000006b,inset 0 -1px #ffffff13,0 2px 5px #0003!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top][data-av-pointer=off]{--av-top-sweep:#ffffffd1;--av-top-sweep-opacity:.9;--av-top-sweep-duration:.92s}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top][data-av-pointer=off]:after{display:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top][data-av-tone=danger]{--av-top-sweep:#ffcdd675;--av-top-spot-core:#ffa4b238;--av-top-spot-mid:#ff7e9412;color:var(--av-danger-copy);outline-color:var(--av-danger-edge)}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top][data-av-tone=danger]:not(:disabled):is(:hover,:focus-visible){color:var(--av-danger-copy)!important;outline-color:var(--av-danger-edge)!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:is(:disabled,[aria-disabled=true]){color:#d6d6d257;filter:saturate(.2);outline-color:#f5fcf90a;box-shadow:var(--av-mother-nested-shadow)!important;text-shadow:none!important;transform:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:is(:disabled,[aria-disabled=true],[aria-busy=true],.loading,.is-loading,.running,.is-running):before,html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:is(:disabled,[aria-disabled=true],[aria-busy=true],.loading,.is-loading,.running,.is-running):after{opacity:0!important;animation:none!important}html[data-dsh-av-glass] [data-av-interaction=top][role=tab]:not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]){box-shadow:none!important;background:0 0!important;border:0!important;outline:none!important}html[data-dsh-av-glass] [data-av-interaction=top][role=tab]:not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]):before,html[data-dsh-av-glass] [data-av-interaction=top][role=tab]:not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]):after{display:none!important}html[data-dsh-av-glass] [data-av-interaction=top][role=tab][aria-selected=true]:not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]){position:relative;color:var(--av-mother-text-strong)!important}html[data-dsh-av-glass] [data-av-interaction=top][role=tab][aria-selected=true]:not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]):after{content:\"\";pointer-events:none;position:absolute;opacity:1!important;background:#ffffffeb!important;border-radius:2px!important;height:2px!important;display:block!important;inset:auto 0 1px!important}html[data-dsh-av-glass] :focus-visible{outline-offset:1px;outline:2px solid #c6e9dcd9!important}html[data-dsh-av-glass] ::selection{background:#c6e9dc59}@media (prefers-reduced-motion:reduce){html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]{transition:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:before{opacity:0!important;animation:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:after{opacity:0!important;transition:none!important}}";
		const tagId = "@deepseek-ai/dsh-client-ui-glass/glass.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-glass";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region src/client/index.ts
		/** Required services: theme override stack, slot surface, and locale. */
		const inject = [
			"theme",
			"slots",
			"locale"
		];
		/**
		* Client plugin body.
		* @param ctx - client cordis context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "av-glass: settings dictionaries");
			const layer = new AVGlassLayer(ctx);
			const store = createAVGlassCardStore();
			let bound;
			let revision = 0;
			const sync = () => {
				bound?.sync({
					enabled: layer.getEnabled(),
					aura: layer.getAura()
				}, revision);
				revision += 1;
			};
			const injected = (actions) => {
				bound = actions;
				sync();
				return {
					setEnabled: (enabled) => {
						layer.setEnabled(enabled);
						sync();
					},
					setAura: (aura) => {
						layer.setAura(aura);
						sync();
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "av-glass",
				order: 12,
				store,
				locale: NS,
				inject: injected
			}, AVGlassPluginCard));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map