window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-glass",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		//#region virtual:dsh-module-css:D:\dsh\.dsh\plugins\@deepseek-ai\dsh-client-ui-glass\src\client\PluginCard.module.css.mjs
		const css$1 = ".z7TMwG_avg_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:12px;flex-direction:column;padding:16px;display:flex}.z7TMwG_avg_head{justify-content:space-between;align-items:center;gap:16px;display:flex}.z7TMwG_avg_head+.z7TMwG_avg_head{margin-top:14px}.z7TMwG_avg_text{flex-direction:column;gap:2px;min-width:0;display:flex}.z7TMwG_avg_title{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;line-height:22px}.z7TMwG_avg_description{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.z7TMwG_avg_toggle{border:1px solid var(--dsw-alias-border-l2);height:28px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:14px;flex:none;align-items:center;gap:6px;padding:0 10px 0 6px;font-size:12px;line-height:18px;display:inline-flex}.z7TMwG_avg_toggle:hover{background:var(--dsw-alias-interactive-bg-hover)}.z7TMwG_avg_toggle[aria-pressed=true]{background:var(--dsw-alias-state-business-tertiary);color:var(--dsw-alias-state-business-primary);border-color:#0000}.z7TMwG_avg_check{justify-content:center;align-items:center;width:16px;height:16px;display:inline-flex}.z7TMwG_avg_actions{flex:none;align-items:center;gap:8px;display:flex}.z7TMwG_avg_actions .z7TMwG_avg_toggle{padding:0 10px}.z7TMwG_avg_toggle:disabled{cursor:default;opacity:.6}.z7TMwG_avg_thumb{border:1px solid var(--dsw-alias-border-l2);background-color:#070809;background-position:50%;background-size:cover;border-radius:6px;flex:none;width:44px;height:30px}";
		const tagId$1 = "@deepseek-ai/dsh-client-ui-glass/PluginCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-glass";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var PluginCard_module_css_default = {
			"avg_card": "z7TMwG_avg_card",
			"avg_title": "z7TMwG_avg_title",
			"avg_actions": "z7TMwG_avg_actions",
			"avg_check": "z7TMwG_avg_check",
			"avg_thumb": "z7TMwG_avg_thumb",
			"avg_toggle": "z7TMwG_avg_toggle",
			"avg_text": "z7TMwG_avg_text",
			"avg_description": "z7TMwG_avg_description",
			"avg_head": "z7TMwG_avg_head"
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
		* Read the custom-backdrop state; same ground-truth pattern as the other rows.
		* @param onChange - notified whenever the attribute flips.
		* @returns disposer removing the observer.
		*/
		function subscribeAuraCustomAttribute(onChange) {
			const observer = new MutationObserver(onChange);
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["data-dsh-av-aura-custom"]
			});
			return () => {
				observer.disconnect();
			};
		}
		/** @returns whether a user-supplied backdrop image is currently installed. */
		function readAuraCustomAttribute() {
			return document.documentElement.hasAttribute("data-dsh-av-aura-custom");
		}
		/** @returns the inline stage-image value (`url("blob:…")`), '' when absent. */
		function readAuraImageVar() {
			return getComputedStyle(document.documentElement).getPropertyValue("--av-aura-stage-image").trim();
		}
		/**
		* Read the wallpaper-blur state; same ground-truth pattern as the other rows.
		* @param onChange - notified whenever the attribute flips.
		* @returns disposer removing the observer.
		*/
		function subscribeAuraBlurAttribute(onChange) {
			const observer = new MutationObserver(onChange);
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["data-dsh-av-aura-blur"]
			});
			return () => {
				observer.disconnect();
			};
		}
		/** @returns whether the wallpaper blur is currently opted in. */
		function readAuraBlurAttribute() {
			return document.documentElement.hasAttribute("data-dsh-av-aura-blur");
		}
		/**
		* Read the settings-hotkey state; same ground-truth pattern as the other rows.
		* The attribute carries the bound key and is absent while the binding is off.
		* @param onChange - notified whenever the hotkey changes.
		* @returns disposer removing the observer.
		*/
		function subscribeHotkeyAttribute(onChange) {
			const observer = new MutationObserver(onChange);
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["data-dsh-av-hotkey"]
			});
			return () => {
				observer.disconnect();
			};
		}
		/** @returns the current hotkey (`''` = binding disabled). */
		function readHotkeyAttribute() {
			return document.documentElement.getAttribute("data-dsh-av-hotkey") ?? "";
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
		function AVGlassPluginCard(props) {
			const { t, setEnabled, setAuraImage, setAuraBlur, setHotkey } = props;
			const enabled = (0, react.useSyncExternalStore)(subscribeGlassAttribute, readGlassAttribute);
			const custom = (0, react.useSyncExternalStore)(subscribeAuraCustomAttribute, readAuraCustomAttribute);
			const imageVar = (0, react.useSyncExternalStore)(subscribeAuraCustomAttribute, readAuraImageVar);
			const blur = (0, react.useSyncExternalStore)(subscribeAuraBlurAttribute, readAuraBlurAttribute);
			const hotkey = (0, react.useSyncExternalStore)(subscribeHotkeyAttribute, readHotkeyAttribute);
			const fileRef = (0, react.useRef)(null);
			const [busy, setBusy] = (0, react.useState)(false);
			const [recording, setRecording] = (0, react.useState)(false);
			const [note, setNote] = (0, react.useState)(null);
			(0, react.useEffect)(() => {
				if (!recording) return;
				const onKey = (event) => {
					event.preventDefault();
					event.stopPropagation();
					if (event.key === "Escape") {
						setRecording(false);
						return;
					}
					if (event.key === "Delete" || event.key === "Backspace") {
						setHotkey("");
						setRecording(false);
						return;
					}
					if (event.ctrlKey || event.altKey || event.metaKey) return;
					if (event.isComposing || event.keyCode === 229) return;
					if (event.key.length === 1) {
						setHotkey(event.key);
						setRecording(false);
					}
				};
				window.addEventListener("keydown", onKey, true);
				return () => {
					window.removeEventListener("keydown", onKey, true);
				};
			}, [recording, setHotkey]);
			const description = note ?? (custom ? t("av.customActive") : t("av.customDescription"));
			const onPickFile = async (event) => {
				const file = event.target.files?.[0];
				event.target.value = "";
				if (!file || busy) return;
				setBusy(true);
				setNote(t("av.processing"));
				try {
					setNote(await setAuraImage(file) ? null : t("av.storageSessionOnly"));
				} catch {
					setNote(t("av.imageFailed"));
				} finally {
					setBusy(false);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: PluginCard_module_css_default.avg_card,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
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
					}),
					enabled && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: PluginCard_module_css_default.avg_head,
						children: [
							custom && imageVar && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: PluginCard_module_css_default.avg_thumb,
								style: { backgroundImage: imageVar },
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: PluginCard_module_css_default.avg_text,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: PluginCard_module_css_default.avg_title,
									children: t("av.customTitle")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: PluginCard_module_css_default.avg_description,
									children: description
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: PluginCard_module_css_default.avg_actions,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										ref: fileRef,
										type: "file",
										accept: "image/*",
										hidden: true,
										onChange: onPickFile
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: PluginCard_module_css_default.avg_toggle,
										disabled: busy,
										onClick: () => {
											fileRef.current?.click();
										},
										children: t("av.upload")
									}),
									custom && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: PluginCard_module_css_default.avg_toggle,
										disabled: busy,
										onClick: () => {
											setAuraImage(null);
											setNote(null);
										},
										children: t("av.reset")
									})
								]
							})
						]
					}),
					enabled && custom && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: PluginCard_module_css_default.avg_head,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: PluginCard_module_css_default.avg_text,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: PluginCard_module_css_default.avg_title,
								children: t("av.blurTitle")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: PluginCard_module_css_default.avg_description,
								children: t("av.blurDescription")
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: PluginCard_module_css_default.avg_toggle,
							"aria-pressed": blur,
							onClick: () => {
								setAuraBlur(!blur);
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: PluginCard_module_css_default.avg_check,
								children: blur ? "✓" : ""
							}), blur ? t("av.enable") : t("av.disable")]
						})]
					}),
					enabled && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: PluginCard_module_css_default.avg_head,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: PluginCard_module_css_default.avg_text,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: PluginCard_module_css_default.avg_title,
								children: t("av.hotkeyTitle")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: PluginCard_module_css_default.avg_description,
								children: t("av.hotkeyDescription")
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: PluginCard_module_css_default.avg_toggle,
							"aria-pressed": recording,
							onBlur: () => {
								setRecording(false);
							},
							onClick: () => {
								setRecording(true);
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: PluginCard_module_css_default.avg_check,
								children: recording ? "•" : ""
							}), recording ? t("av.hotkeyRecording") : hotkey === "" ? t("av.hotkeyOff") : hotkey.toUpperCase()]
						})]
					})
				]
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
			return (0, _deepseek_ai_dsh_client_store.defineStore)({
				init: () => ({
					enabled: true,
					revision: -1
				}),
				actions: { sync: (d, next, revision) => {
					if (revision <= d.revision) return;
					d.enabled = next.enabled;
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
			"av.description": "为整个界面应用统一的暗色玻璃质感，带磨砂层次、柔和扫光与细腻反光",
			"av.enable": "开启",
			"av.disable": "关闭",
			"av.customTitle": "自定义背景",
			"av.customDescription": "上传自己的图片作为壁纸背板，原图完整保存、重启不丢；未上传时为纯黑背板",
			"av.customActive": "已使用自定义壁纸",
			"av.upload": "上传壁纸",
			"av.reset": "清除壁纸",
			"av.blurTitle": "壁纸模糊",
			"av.blurDescription": "将背板壁纸整体虚化，让前景玻璃层次更柔和",
			"av.hotkeyTitle": "设置快捷键",
			"av.hotkeyDescription": "非输入状态下按该键打开设置弹窗；Esc 取消录制，Delete 清除",
			"av.hotkeyRecording": "按下按键…",
			"av.hotkeyOff": "未设置",
			"av.processing": "处理中…",
			"av.imageFailed": "图片读取失败，换一张试试",
			"av.storageSessionOnly": "浏览器存储空间不足，图片仅本次会话生效"
		};
		/** English dictionary. */
		const en = {
			"av.title": "Glass mode",
			"av.description": "A unified dark glass finish for the interface: frosted depth, soft sheen, and subtle reflections",
			"av.enable": "On",
			"av.disable": "Off",
			"av.customTitle": "Custom backdrop",
			"av.customDescription": "Use your own image as the wallpaper backdrop — kept at full resolution; the stage stays plain black until you upload one",
			"av.customActive": "Custom wallpaper in use",
			"av.upload": "Upload wallpaper",
			"av.reset": "Clear wallpaper",
			"av.blurTitle": "Wallpaper blur",
			"av.blurDescription": "Blur the backdrop wallpaper for a softer glass look",
			"av.hotkeyTitle": "Settings hotkey",
			"av.hotkeyDescription": "Press this key outside text fields to open the settings dialog; Esc cancels, Delete clears",
			"av.hotkeyRecording": "Press a key…",
			"av.hotkeyOff": "Not set",
			"av.processing": "Processing…",
			"av.imageFailed": "Couldn't read that image — try another file",
			"av.storageSessionOnly": "Browser storage is full; the image applies to this session only"
		};
		const EDITABLE = "input, textarea, select, [contenteditable=\"true\"], [contenteditable=\"plaintext-only\"]";
		/**
		* Normalize a user-supplied hotkey: trimmed, lowercased, single character.
		* The empty string means "binding disabled".
		*/
		function normalizeHotkey(value) {
			const trimmed = value.trim().toLowerCase();
			return trimmed.length <= 1 ? trimmed : trimmed.slice(0, 1);
		}
		/**
		* Locate the settings trigger. The sidebar-scoped probe runs first (the
		* stamped `data-dsh-sidebar` column is its home), with an unscoped fallback
		* in case the shell remounts the trigger row outside the column.
		*/
		function findSettingsTrigger() {
			return document.querySelector(`[data-dsh-sidebar] button[class*="trigger"][aria-haspopup="dialog"][aria-expanded="false"]`) ?? document.querySelector(`button[class*="trigger"][aria-haspopup="dialog"][aria-expanded="false"]`);
		}
		/**
		* Bind the global keydown (capture, so the plugin owns the key before host
		* handlers) and keep the actuation gated on the layer's live state.
		* @param options - liveness probe and the current hotkey getter.
		* @returns a disposer that removes the listener.
		*/
		function startSettingsHotkey(options) {
			const onKeyDown = (e) => {
				if (e.defaultPrevented || e.repeat || e.isComposing || e.keyCode === 229) return;
				if (e.ctrlKey || e.altKey || e.metaKey) return;
				const key = normalizeHotkey(options.getKey());
				if (key === "" || e.key.toLowerCase() !== key) return;
				if (!options.isActive()) return;
				const target = e.target;
				if (target instanceof Element && target.closest(EDITABLE) !== null) return;
				if (document.querySelector("[role=\"dialog\"]") !== null) return;
				const trigger = findSettingsTrigger();
				if (trigger === null) return;
				e.preventDefault();
				trigger.click();
			};
			window.addEventListener("keydown", onKeyDown, true);
			return () => {
				window.removeEventListener("keydown", onKeyDown, true);
			};
		}
		//#endregion
		//#region src/client/dom-watcher.ts
		/** Start the shared document watcher (`childList`, subtree of `<html>`). */
		function startDomWatcher() {
			const stamps = /* @__PURE__ */ new Set();
			let frame = 0;
			const flush = () => {
				frame = 0;
				for (const stamp of stamps) stamp();
			};
			const observer = new MutationObserver(() => {
				if (!frame) frame = requestAnimationFrame(flush);
			});
			observer.observe(document.documentElement, {
				childList: true,
				subtree: true
			});
			return {
				register(stamp) {
					stamps.add(stamp);
					stamp();
					return () => {
						stamps.delete(stamp);
					};
				},
				dispose() {
					if (frame) {
						cancelAnimationFrame(frame);
						frame = 0;
					}
					stamps.clear();
					observer.disconnect();
				}
			};
		}
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
		* No idle animation: the sweep is driven by CSS :hover/:focus-visible, and
		* this module only feeds the pointer-following spot on mouse/pen hover.
		* Stamping runs through the shared dom watcher (one observer for all stampers,
		* coalesced to one pass per animation frame).
		* @param watcher - the layer's shared mutation watcher.
		* @returns a disposer that unregisters the stamper and clears interaction state.
		*/
		function startGlassInteraction(watcher) {
			const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
			const stamp = () => {
				for (const el of Array.from(document.querySelectorAll(TOP_SELECTOR))) {
					if (el.hasAttribute("data-av-interaction")) continue;
					el.setAttribute(TOP_ATTRIBUTE, "top");
				}
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
			const unregister = watcher.register(stamp);
			window.addEventListener("pointermove", onPointerMove, { passive: true });
			window.addEventListener("pointerleave", clearPointer, { passive: true });
			window.addEventListener("pointercancel", clearPointer, { passive: true });
			window.addEventListener("blur", clearPointer, { passive: true });
			return () => {
				unregister();
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
		/** The seam table, exported for the startup probe to introspect. */
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
		* Stamping runs through the shared dom watcher (one observer for all stampers,
		* coalesced to one pass per animation frame).
		* @param watcher - the layer's shared mutation watcher.
		* @returns a disposer that unregisters the stamper and clears the seams.
		*/
		function startSeamStamper(watcher) {
			const unregister = watcher.register(stampSeams);
			return () => {
				unregister();
				clearSeams();
			};
		}
		//#endregion
		//#region src/client/startup-probe.ts
		/**
		* Startup probe: the glass layer keys off host DOM conventions (stamped
		* data-* seams, semantic trigger selectors). A host refactor that renames any
		* of them fails silently — glass just stops applying to a panel, the hotkey
		* no-ops. This probe re-runs the seam selectors after the shell has mounted,
		* reports per-seam hit counts on `window.__avGlassProbe`, and logs a one-line
		* summary so degradation is diagnosable at a glance (the formalized version
		* of the manual browser diagnosis from log #19).
		*/
		const GLOBAL_KEY = "__avGlassProbe";
		function collect() {
			const seams = SEAMS.map((seam) => ({
				attribute: seam.attribute,
				hits: document.querySelectorAll(seam.selector).length
			}));
			const missing = SEAMS.flatMap((seam, i) => seam.first === true && seams[i].hits === 0 ? [seam.attribute] : []);
			const trigger = document.querySelector(`[data-dsh-sidebar] button[class*="trigger"][aria-haspopup="dialog"]`) ?? document.querySelector("button[class*=\"trigger\"][aria-haspopup=\"dialog\"]");
			return {
				at: (/* @__PURE__ */ new Date()).toISOString(),
				seams,
				missing,
				settingsTrigger: trigger !== null
			};
		}
		function runOnce(probe) {
			const report = collect();
			probe.last = report;
			const hit = report.seams.length - report.missing.length;
			const summary = report.missing.length === 0 ? `${hit}/${report.seams.length} seams` : `${hit}/${report.seams.length} seams, MISSING: ${report.missing.join(", ")}`;
			console.info(`[av-glass] probe: ${summary}; settings trigger ${report.settingsTrigger ? "found" : "NOT FOUND"}`);
			return report;
		}
		/**
		* Install the probe on `window` and run it once. Intended for a short delay
		* after mount, so the host shell has rendered and the seams are stompable.
		*/
		function installStartupProbe() {
			const probe = {
				run: () => runOnce(probe),
				last: null
			};
			window[GLOBAL_KEY] = probe;
			runOnce(probe);
		}
		/** Remove the probe global (unmount: plugin off = stock UI, no plugin globals). */
		function removeStartupProbe() {
			delete window[GLOBAL_KEY];
		}
		//#endregion
		//#region src/client/theme-layer.ts
		/** html attribute selecting the AV Glass layer. */
		const AV_ATTRIBUTE = "data-dsh-av-glass";
		/** html attribute showing the aura backdrop stage — set while a user-supplied wallpaper is installed (requires AV_ATTRIBUTE). */
		const AURA_ATTRIBUTE = "data-dsh-av-aura";
		/** html attribute flagging that a user-supplied backdrop image is installed. */
		const AURA_CUSTOM_ATTRIBUTE = "data-dsh-av-aura-custom";
		/** html attribute opting in to blurring the aura stage wallpaper (requires AURA_ATTRIBUTE). */
		const AURA_BLUR_ATTRIBUTE = "data-dsh-av-aura-blur";
		/** Literal class of the aura stage layer (plain glass.css, un-hashed). */
		const AURA_STAGE_CLASS = "av-aura-stage";
		/** CSS custom property the aura stage paints the backdrop photo through. */
		const AURA_IMAGE_VAR = "--av-aura-stage-image";
		/**
		* IndexedDB home of the user-supplied backdrop image. The file is kept
		* verbatim as a Blob — no canvas recompression — because IDB quota scales
		* with free disk (hundreds of MB), unlike the 5MB localStorage the
		* compressed data URL used to fight with.
		*/
		const AURA_IMAGE_DB_NAME = "dsh-av-glass";
		const AURA_IMAGE_DB_VERSION = 1;
		const AURA_IMAGE_STORE = "backdrops";
		const AURA_IMAGE_RECORD_KEY = "aura-image";
		/** Pre-IDB storage key; migrated into IndexedDB on restore, then removed. */
		const AURA_IMAGE_LEGACY_KEY = "dsh-av-glass-aura-image";
		/**
		* localStorage key of the wallpaper-blur opt-in. Same persistence channel as
		* the other aura prefs; the attribute only matters while the aura stage shows.
		*/
		const AURA_BLUR_STORAGE_KEY = "dsh-av-glass-aura-blur";
		/**
		* localStorage key of the settings-dialog hotkey (single character, lowercased;
		* the empty string disables the binding). Persisted outside the host settings
		* scope: the card reads the `data-dsh-av-hotkey` mirror as ground truth, the
		* same pattern as the other rows.
		*/
		const HOTKEY_STORAGE_KEY = "dsh-av-glass-hotkey";
		/** Default hotkey while unset: the bare-z binding from log #56. */
		const HOTKEY_DEFAULT = "z";
		/** html attribute mirroring the current hotkey value (removed when disabled). */
		const HOTKEY_ATTRIBUTE = "data-dsh-av-hotkey";
		/** Delay before the startup probe runs, letting the host shell mount first. */
		const PROBE_DELAY_MS = 3e3;
		/** Default state while the settings scope has not answered yet: on. */
		const DEFAULT_ENABLED = true;
		/** The layer's identity in the theme override stack. */
		const OVERRIDE_SOURCE = "@deepseek-ai/dsh-client-ui-glass";
		const both = (value) => ({
			light: value,
			dark: value
		});
		/**
		* Alias-token override layer: the dark mother-glass palette.
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
			"--dsw-alias-bg-mask-1": both("rgba(4, 8, 14, 0.32)"),
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
			auraImageBlob;
			auraImageUrl;
			auraBlur;
			hotkey;
			auraStage;
			tokenDisposer;
			interactionDisposer;
			seamDisposer;
			domWatcher;
			probeTimer;
			listeners = /* @__PURE__ */ new Set();
			constructor(ctx) {
				this.ctx = ctx;
				this.enabled = DEFAULT_ENABLED;
				this.auraImageBlob = null;
				this.auraImageUrl = null;
				this.auraBlur = this.readAuraBlurPref();
				this.hotkey = this.readHotkeyPref();
				if (this.enabled) this.mount();
				this.restoreAuraImage();
			}
			getEnabled() {
				return this.enabled;
			}
			/** @returns whether a user-supplied backdrop image is currently installed. */
			getAuraCustom() {
				return this.auraImageBlob !== null;
			}
			/** @returns whether the wallpaper blur is currently opted in. */
			getAuraBlur() {
				return this.auraBlur;
			}
			/** @returns the current settings-dialog hotkey (`''` = binding disabled). */
			getHotkey() {
				return this.hotkey;
			}
			/**
			* Set the settings-dialog hotkey (normalized to one lowercase character;
			* `''` disables). Mirrors onto `data-dsh-av-hotkey` on `<html>` so the
			* settings card reads it as ground truth.
			*/
			setHotkey(value) {
				const next = normalizeHotkey(value);
				if (next === this.hotkey) return;
				this.hotkey = next;
				this.writeHotkeyPref(next);
				if (this.enabled) this.applyHotkeyAttribute();
				for (const listener of this.listeners) listener();
			}
			/** Open (creating on first use) the backdrop image database. */
			openImageDb() {
				return new Promise((resolve, reject) => {
					const open = indexedDB.open(AURA_IMAGE_DB_NAME, AURA_IMAGE_DB_VERSION);
					open.onupgradeneeded = () => {
						open.result.createObjectStore(AURA_IMAGE_STORE);
					};
					open.onsuccess = () => resolve(open.result);
					open.onerror = () => reject(open.error ?? /* @__PURE__ */ new Error("indexedDB unavailable"));
				});
			}
			/** Read the stored backdrop blob; null means none (or a foreign record). */
			async readStoredImage() {
				const db = await this.openImageDb();
				try {
					return await new Promise((resolve, reject) => {
						const get = db.transaction(AURA_IMAGE_STORE, "readonly").objectStore(AURA_IMAGE_STORE).get(AURA_IMAGE_RECORD_KEY);
						get.onsuccess = () => resolve(get.result instanceof Blob ? get.result : null);
						get.onerror = () => reject(get.error ?? /* @__PURE__ */ new Error("read failed"));
					});
				} finally {
					db.close();
				}
			}
			/**
			* Persist the backdrop blob. A failed write (quota, privacy mode) keeps
			* the image for this session only and reports `false` so the card can
			* surface it.
			*/
			async writeStoredImage(blob) {
				try {
					const db = await this.openImageDb();
					try {
						return await new Promise((resolve, reject) => {
							const tx = db.transaction(AURA_IMAGE_STORE, "readwrite");
							const store = tx.objectStore(AURA_IMAGE_STORE);
							if (blob === null) store.delete(AURA_IMAGE_RECORD_KEY);
							else store.put(blob, AURA_IMAGE_RECORD_KEY);
							tx.oncomplete = () => resolve(true);
							tx.onerror = () => reject(tx.error ?? /* @__PURE__ */ new Error("write failed"));
							tx.onabort = () => reject(tx.error ?? /* @__PURE__ */ new Error("write aborted"));
						});
					} finally {
						db.close();
					}
				} catch {
					return false;
				}
			}
			/**
			* One-shot migration: the pre-IDB compressed data URL in localStorage
			* moves into IndexedDB so the storage swap doesn't drop an installed
			* backdrop. Failures are silent — the user just re-uploads.
			*/
			async migrateLegacyImage() {
				try {
					const value = localStorage.getItem(AURA_IMAGE_LEGACY_KEY);
					if (value === null || !value.startsWith("data:image/")) return null;
					const blob = await (await fetch(value)).blob();
					localStorage.removeItem(AURA_IMAGE_LEGACY_KEY);
					await this.writeStoredImage(blob);
					return blob;
				} catch {
					return null;
				}
			}
			/**
			* Pull the persisted backdrop back in after startup. Async — on cold start
			* the stage stays black until the record lands. A live pick that completes
			* first wins over the restored record.
			*/
			async restoreAuraImage() {
				try {
					const blob = await this.readStoredImage() ?? await this.migrateLegacyImage();
					if (blob === null || this.auraImageBlob !== null) return;
					this.auraImageBlob = blob;
					this.applyAuraImage();
					for (const listener of this.listeners) listener();
				} catch {}
			}
			/** Stored blur opt-in; unreadable storage (privacy modes) falls back to off. */
			readAuraBlurPref() {
				try {
					return localStorage.getItem(AURA_BLUR_STORAGE_KEY) === "1";
				} catch {
					return false;
				}
			}
			writeAuraBlurPref(value) {
				try {
					localStorage.setItem(AURA_BLUR_STORAGE_KEY, value ? "1" : "0");
				} catch {}
			}
			/** Stored hotkey; unreadable storage (privacy modes) falls back to the default. */
			readHotkeyPref() {
				try {
					const value = localStorage.getItem(HOTKEY_STORAGE_KEY);
					return value === null ? HOTKEY_DEFAULT : normalizeHotkey(value);
				} catch {
					return HOTKEY_DEFAULT;
				}
			}
			writeHotkeyPref(value) {
				try {
					localStorage.setItem(HOTKEY_STORAGE_KEY, value);
				} catch {}
			}
			/** Mirror the hotkey onto `<html>` (attribute carries the key, removed when disabled). */
			applyHotkeyAttribute() {
				const el = document.documentElement;
				if (this.hotkey === "") el.removeAttribute(HOTKEY_ATTRIBUTE);
				else el.setAttribute(HOTKEY_ATTRIBUTE, this.hotkey);
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
			/**
			* Install a user-supplied backdrop image (`null` clears it, back to the
			* plain-black stage). The original file is kept verbatim: a blob URL rides
			* the inline `--av-aura-stage-image` on `<html>` — inline beats the
			* stylesheet value and survives stage remounts — while the aura/custom
			* attributes mirror the install state for the settings card.
			* @returns whether the choice persisted; a failed write keeps it session-only.
			*/
			async setAuraImage(file) {
				if (file !== null && !file.type.startsWith("image/")) throw new Error("not an image file");
				if (this.auraImageUrl !== null) {
					URL.revokeObjectURL(this.auraImageUrl);
					this.auraImageUrl = null;
				}
				this.auraImageBlob = file;
				if (file !== null) {
					this.auraImageUrl = URL.createObjectURL(file);
					try {
						const probe = new Image();
						probe.src = this.auraImageUrl;
						await probe.decode();
					} catch {}
				}
				this.applyAuraImage();
				for (const listener of this.listeners) listener();
				return this.writeStoredImage(file);
			}
			/** Mirror the in-memory backdrop blob onto <html> (inline var + attribute). */
			applyAuraImage() {
				if (this.auraImageBlob !== null && this.auraImageUrl === null) this.auraImageUrl = URL.createObjectURL(this.auraImageBlob);
				if (!this.enabled) return;
				const el = document.documentElement;
				if (this.auraImageBlob === null) {
					el.style.removeProperty(AURA_IMAGE_VAR);
					el.removeAttribute(AURA_ATTRIBUTE);
					el.removeAttribute(AURA_CUSTOM_ATTRIBUTE);
				} else {
					el.style.setProperty(AURA_IMAGE_VAR, `url("${this.auraImageUrl}")`);
					el.setAttribute(AURA_ATTRIBUTE, "");
					el.setAttribute(AURA_CUSTOM_ATTRIBUTE, "");
				}
			}
			/** Flip the wallpaper blur. The attribute only matters while the aura stage shows. */
			setAuraBlur(value) {
				if (value === this.auraBlur) return;
				this.auraBlur = value;
				this.writeAuraBlurPref(value);
				const el = document.documentElement;
				if (value) el.setAttribute(AURA_BLUR_ATTRIBUTE, "");
				else el.removeAttribute(AURA_BLUR_ATTRIBUTE);
				for (const listener of this.listeners) listener();
			}
			mount() {
				const el = document.documentElement;
				el.setAttribute(AV_ATTRIBUTE, "");
				el.style.setProperty("color-scheme", "dark");
				if (this.auraBlur) el.setAttribute(AURA_BLUR_ATTRIBUTE, "");
				this.applyAuraImage();
				this.applyHotkeyAttribute();
				this.mountAuraStage();
				this.applyTokens();
				this.domWatcher = startDomWatcher();
				this.seamDisposer = startSeamStamper(this.domWatcher);
				this.interactionDisposer = startGlassInteraction(this.domWatcher);
				this.scheduleProbe();
			}
			unmount() {
				const el = document.documentElement;
				el.removeAttribute(AV_ATTRIBUTE);
				el.removeAttribute(AURA_ATTRIBUTE);
				el.removeAttribute(AURA_CUSTOM_ATTRIBUTE);
				el.removeAttribute(AURA_BLUR_ATTRIBUTE);
				el.removeAttribute(HOTKEY_ATTRIBUTE);
				el.style.removeProperty("color-scheme");
				el.style.removeProperty(AURA_IMAGE_VAR);
				if (this.auraImageUrl !== null) {
					URL.revokeObjectURL(this.auraImageUrl);
					this.auraImageUrl = null;
				}
				this.auraStage?.remove();
				this.auraStage = void 0;
				this.cancelProbe();
				removeStartupProbe();
				this.domWatcher?.dispose();
				this.domWatcher = void 0;
				this.tokenDisposer?.();
				this.tokenDisposer = void 0;
				this.interactionDisposer?.();
				this.interactionDisposer = void 0;
				this.seamDisposer?.();
				this.seamDisposer = void 0;
			}
			/** Run the seam/trigger probe once the host shell has had time to mount. */
			scheduleProbe() {
				this.cancelProbe();
				this.probeTimer = setTimeout(() => {
					this.probeTimer = void 0;
					installStartupProbe();
				}, PROBE_DELAY_MS);
			}
			cancelProbe() {
				if (this.probeTimer !== void 0) {
					clearTimeout(this.probeTimer);
					this.probeTimer = void 0;
				}
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
		const css = "html[data-dsh-av-glass]{color-scheme:dark;--av-glass-x:50%;--av-glass-y:0%;--av-mother-edge:#f5fcf910;--av-mother-surface:radial-gradient(ellipse 12px 66% at 0 0, #0000004a, #0000001f 44%, transparent 100%), radial-gradient(ellipse 18% 50% at 101% 72%, #d3efe518, transparent 76%), radial-gradient(ellipse 64% 9% at 78% 101%, #edf8f336, #b3e2d60d 44%, transparent 80%), radial-gradient(ellipse 38% 10% at 14% 0%, #ffffff17, transparent 74%), radial-gradient(ellipse 42% 27% at 103% 102%, #b3e1d512, transparent 74%);--av-mother-shadow:0 15px 36px #00000038, 0 5px 14px #00000026, inset 0 1px 0 #ffffff2b, inset 1px 0 0 #effaf60b, inset 0 2px 0 #00000021, inset 2px 0 0 #00000014, inset 0 5px 0 #ebfaf407, inset 0 10px 15px #e8f8f10b, inset 6px 0 11px #d3f0e707, inset -1px 0 0 #cae7dd12, inset 0 -2px 0 #dff2e924, inset 0 -7px 12px #b8e4d808, inset 0 0 24px #daf2ea08, inset 1px 0 0 #e8f9f20d, inset 3px 0 0 #00000012, inset 6px 0 10px #d3f1e70a;--av-mother-shadow-dock:inset 0 1px 0 #ffffff2b, inset 1px 0 0 #effaf60b, inset 0 2px 0 #00000021, inset 2px 0 0 #00000014, inset 0 5px 0 #ebfaf407, inset 0 10px 15px #e8f8f10b, inset 6px 0 11px #d3f0e707, inset -1px 0 0 #ffffff2b, inset -2px 0 0 #00000021, inset -5px 0 0 #ebfaf407, inset -10px 0 15px #e8f8f10b, inset 0 -2px 0 #dff2e924, inset 0 -3px 0 #0000001a, inset 0 -8px 14px #b8e4d80b, inset 0 0 24px #daf2ea08, inset 1px 0 0 #e8f9f20d, inset 3px 0 0 #00000012, inset 6px 0 10px #d3f1e70a;--av-mother-shadow-item:0 6px 16px #00000026, 0 2px 4px #0000001c, inset 0 1px 0 #ffffff2b, inset 1px 0 0 #effaf60b, inset 0 2px 0 #00000021, inset 2px 0 0 #00000014, inset 0 5px 0 #ebfaf407, inset 0 10px 15px #e8f8f10b, inset 6px 0 11px #d3f0e707, inset -1px 0 0 #cae7dd12, inset 0 -2px 0 #dff2e924, inset 0 -7px 12px #b8e4d808, inset 0 0 24px #daf2ea08, inset 1px 0 0 #e8f9f20d, inset 3px 0 0 #00000012, inset 6px 0 10px #d3f1e70a;--av-mother-shadow-top:0 3px 9px #0000001c, 0 1px 3px #00000014, inset 0 1px 0 #ffffff2b, inset 1px 0 0 #effaf60b, inset 0 2px 0 #00000021, inset 2px 0 0 #00000014, inset 0 5px 0 #ebfaf407, inset 0 10px 15px #e8f8f10b, inset 6px 0 11px #d3f0e707, inset -1px 0 0 #cae7dd12, inset 0 -2px 0 #dff2e924, inset 0 -7px 12px #b8e4d808, inset 0 0 24px #daf2ea08, inset 1px 0 0 #e8f9f20d, inset 3px 0 0 #00000012, inset 6px 0 10px #d3f1e70a;--av-mother-tool:var(--av-mother-surface);--av-mother-tool-hover:var(--av-mother-surface);--av-mother-tool-shadow:var(--av-mother-shadow-item);--av-mother-control:var(--av-mother-surface);--av-mother-control-hover:var(--av-mother-surface);--av-mother-control-shadow:var(--av-mother-shadow-item);--av-mother-control-hover-shadow:var(--av-mother-shadow-item);--av-mother-surface-compact:var(--av-mother-surface);--av-mother-surface-compact-hover:var(--av-mother-surface);--av-mother-nested-shadow:var(--av-mother-shadow-item);--av-mother-nested-shadow-hover:var(--av-mother-shadow-item);--av-mother-text:#eef4f0d1;--av-mother-text-strong:#f9fcfaf5;--av-mother-danger:#ff9da9d6;--av-danger-copy:#fecacaf5;--av-danger-edge:#f8717170;--av-mother-panel-filter:blur(12px) saturate(1.18) brightness(1.04) contrast(1.04);--av-mother-tool-filter:none;--av-mother-control-filter:none;--av-mother-dock-filter:blur(12px) saturate(1.18) brightness(1.04) contrast(1.04);--av-mother-dialog-filter:blur(12px) saturate(1.12) brightness(1.3) contrast(.95);--av-mother-dialog-veil:linear-gradient(180deg, #eef4f014, #eef4f00d 55%, #eef4f011);--dsw-glass-stage-bottom:#070809;--dsw-glass-stage-fill:#070809;--dsw-glass-panel-fill:var(--av-mother-surface);--dsw-glass-panel-border:var(--av-mother-edge);--dsw-glass-panel-shadow:var(--av-mother-shadow);--dsw-glass-panel-filter:var(--av-mother-panel-filter);--dsw-glass-modal-filter:var(--av-mother-dialog-filter);--dsw-glass-tool-fill:var(--av-mother-tool);--dsw-glass-tool-border:#ffffff1c;--dsw-glass-tool-hover-border:#ffffff1c;--dsw-glass-tool-hover:var(--av-mother-tool-hover);--dsw-glass-tool-shadow:var(--av-mother-tool-shadow);--dsw-glass-tool-hover-shadow:var(--av-mother-tool-shadow);--dsw-glass-tool-filter:none;--dsw-glass-control-fill:var(--av-mother-control);--dsw-glass-control-border:var(--av-mother-edge);--dsw-glass-control-hover-border:var(--av-mother-edge);--dsw-glass-control-hover:var(--av-mother-control-hover);--dsw-glass-control-shadow:var(--av-mother-control-shadow);--dsw-glass-control-hover-shadow:var(--av-mother-control-hover-shadow);--dsw-glass-control-active-shadow:inset 0 4px 10px #0000003d, inset 0 -1px 0 #ffffff13, 0 2px 4px #0000001c;--dsw-glass-control-focus-shadow:0 0 0 4px #ffffff12, var(--av-mother-shadow-item);--dsw-glass-control-filter:none;--dsw-glass-motion:1;--dsw-glass-ink:var(--av-mother-text-strong);--dsw-glass-focus-ring:#c6e9dcd9;--dsw-glass-input-shadow:inset 0 2px 7px #0000002e, inset 0 1px 0 #ffffff14;--dsw-glass-selection:#c6e9dc59;--dsw-glass-tier-sweep:#ffffff9e;--dsw-glass-tier-spot-core:#ffffff4d;--dsw-glass-tier-spot-mid:#ffffff16}html[data-dsh-av-glass] body{color:var(--av-mother-text);background:#070809}html[data-dsh-av-glass] .av-aura-stage{z-index:-1;pointer-events:none;background-color:#070809;background-image:linear-gradient(180deg, #0708098c 0%, #07080957 55%, #07080947 100%), var(--av-aura-stage-image);background-position:50%;background-repeat:no-repeat;background-size:cover;display:none;position:fixed;inset:0}html[data-dsh-av-glass][data-dsh-av-aura] .av-aura-stage{display:block}html[data-dsh-av-glass][data-dsh-av-aura][data-dsh-av-aura-blur] .av-aura-stage{filter:blur(4px);transform:scale(1.06)}html[data-dsh-av-glass][data-dsh-av-aura] [data-dsh-sidebar-root]:before{backdrop-filter:var(--av-mother-dock-filter)!important}html[data-dsh-av-glass] [class*=headerActions]{overflow:visible!important}html[data-dsh-av-glass] :is([data-dsh-frame],[data-dsh-sidebar],[data-dsh-center],[data-dsh-composer]),html[data-dsh-av-glass] [data-dsh-center] [data-phase]{background:0 0!important}html[data-dsh-av-glass] [data-conversation-scroll]{margin-top:-75px;padding-top:75px;scroll-padding-top:75px}html[data-dsh-av-glass] [data-dsh-header]{z-index:8}html[data-dsh-av-glass] :is([data-dsh-sidebar-root],[data-dsh-details],[data-dsh-header]){outline-offset:-1px;border-radius:16px;position:relative;outline:1px solid var(--av-mother-edge)!important;background:var(--av-mother-surface)!important;box-shadow:var(--av-mother-shadow)!important;color:var(--av-mother-text)!important;backdrop-filter:none!important;border:0!important}html[data-dsh-av-glass] :is([data-dsh-sidebar-root],[data-dsh-details],[data-dsh-header]):before{content:\"\";border-radius:inherit;z-index:-1;pointer-events:none;position:absolute;inset:0;backdrop-filter:var(--av-mother-panel-filter)!important}html[data-dsh-av-glass] [data-dsh-sidebar-root]{box-shadow:var(--av-mother-shadow-dock)!important}html[data-dsh-av-glass] [data-dsh-sidebar]{box-shadow:2px 0 4px #0000001c,14px 0 33px #00000024,4px 0 9px #0000001a!important}html[data-dsh-av-glass] [data-dsh-header]{box-shadow:var(--av-mother-shadow-dock), 0 2px 4px #0000001c, 0 14px 33px #00000024, 0 4px 9px #0000001a, inset 0 -12px 16px #0003!important}html[data-dsh-av-glass] [data-dsh-header]:after{--dsw-glass-panel-border:transparent}html[data-dsh-av-glass] [data-dsh-header]:before{background:linear-gradient(#0000 calc(100% - 18px),#0000000d calc(100% - 10px),#00000017 calc(100% - 4px),#0000 calc(100% - 1px)),linear-gradient(#eef4f000 calc(100% - 18px),#e8f8f106 calc(100% - 12px),#dff2e912 calc(100% - 4px),#dff2e924 calc(100% - 2px),#f5fcf92b 100%);backdrop-filter:var(--av-mother-dock-filter)!important}html[data-dsh-av-glass] [data-dsh-sidebar-root]:before{background:linear-gradient(90deg,#0000 calc(100% - 18px),#0000000f calc(100% - 10px),#00000021 calc(100% - 3px),#0000 calc(100% - 1px)),linear-gradient(90deg,#eef4f000 calc(100% - 18px),#e8f8f108 calc(100% - 12px),#ebfaf40f calc(100% - 5px),#effaf61f calc(100% - 2px),#ffffff2b 100%)}html[data-dsh-av-glass] [data-dsh-sidebar-root]{border-radius:0 16px 16px 0}html[data-dsh-av-glass] [data-dsh-header]{border-radius:0 0 16px 16px}html[data-dsh-av-glass] :is([class$=_card],[class*=_card\\ ],[class$=_sessionRow],[class*=_sessionRow\\ ]){background:var(--av-mother-tool)!important;box-shadow:var(--av-mother-tool-shadow)!important;backdrop-filter:var(--av-mother-tool-filter)!important;color:var(--av-mother-text)!important;border:1px solid #ffffff1c!important}html[data-dsh-av-glass] [data-chat-flow] :is([data-tool],[data-state][class*=_root]){border-radius:12px;padding:2px 10px 4px;background:var(--av-mother-tool)!important;box-shadow:var(--av-mother-tool-shadow)!important;backdrop-filter:var(--av-mother-tool-filter)!important;color:var(--av-mother-text)!important;border:1px solid #ffffff1c!important}html[data-dsh-av-glass] [data-testid=todo-panel]{background:var(--av-mother-tool)!important;box-shadow:var(--av-mother-tool-shadow)!important;backdrop-filter:var(--av-mother-tool-filter)!important;color:var(--av-mother-text)!important;border:1px solid #ffffff1c!important}html[data-dsh-av-glass] [data-testid=todo-panel] button:not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]):not([data-av-interaction]):not([class*=_brand]):not([role=tab]):not([class*=fileLink]):not([class*=fileMention]):not([aria-pressed]):not([class*=sessionOverflow]):not([data-turn-process]):not([data-av-tone]){box-shadow:none!important;background:0 0!important;border:0!important;outline:none!important}html[data-dsh-av-glass] .md-code-block{backdrop-filter:var(--av-mother-dock-filter)!important;background:linear-gradient(153deg,#1f23258c 0%,#0b0e1099 38%,#040608a8 100%)!important;border:1px solid #ffffff12!important}html[data-dsh-av-glass] .md-code-block :where(pre,pre.shiki){background:0 0!important}html[data-dsh-av-glass] .md-code-block [class*=bannerWrap]{backdrop-filter:var(--av-mother-dock-filter)!important;background:#06090b61!important}html[data-dsh-av-glass] .md-code-block [class*=banner]:not([class*=bannerWrap]){background:0 0!important}html[data-dsh-av-glass] :is([role=dialog],[role=menu],[role=tooltip],[class*=popover],[class*=dropdown],[class*=bubble],[class*=composerSeat] [class*=card]){outline-offset:-1px;outline:1px solid var(--av-mother-edge)!important;background:var(--av-mother-surface)!important;box-shadow:var(--av-mother-shadow)!important;backdrop-filter:var(--av-mother-panel-filter)!important;color:var(--av-mother-text)!important;border:0!important}html[data-dsh-av-glass] [class*=composerSeat] [class*=card]{backdrop-filter:var(--av-mother-dock-filter)!important}html[data-dsh-av-glass] [role=dialog]{background:var(--av-mother-dialog-veil), var(--av-mother-surface)!important;backdrop-filter:var(--av-mother-dialog-filter)!important}html[data-dsh-av-glass] :is(button,[role=button]):not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]):not([data-av-interaction]):not([class*=_brand]):not([role=tab]):not([class*=fileLink]):not([class*=fileMention]):not([aria-pressed]):not([class*=sessionOverflow]):not([data-turn-process]){border:1px solid var(--av-mother-edge)!important;background:var(--av-mother-control)!important;box-shadow:var(--av-mother-control-shadow)!important;backdrop-filter:var(--av-mother-control-filter)!important;color:var(--av-mother-text-strong)!important}html[data-dsh-av-glass] :is([class*=iconButton],[class*=searchButton],[class*=close],[class$=_add],[class*=_add\\ ]){border:1px solid var(--av-mother-edge)!important;background:var(--av-mother-surface-compact)!important;box-shadow:var(--av-mother-nested-shadow)!important;backdrop-filter:var(--av-mother-control-filter)!important;color:var(--av-mother-text-strong)!important}html[data-dsh-av-glass] :is(input,textarea,select){border-color:var(--av-mother-edge)!important;color:var(--av-mother-text-strong)!important;background:0 0!important}html[data-dsh-av-glass] [class$=_inUse]{color:#c6e9dcfa!important;background:#c6e9dc24!important}html[data-dsh-av-glass] :is(button,[role=button]):not([data-disclosure-row]):not([class*=cardMain]):not([data-av-interaction]):not([class*=_brand]):not([role=tab]):not([class*=fileLink]):not([class*=fileMention]):not([aria-pressed]):not([class*=sessionOverflow]):not([data-turn-process]):hover:not(:disabled){background:var(--av-mother-control-hover)!important}html[data-dsh-av-glass] [class$=_fade]{background:0 0!important}html[data-dsh-av-glass] [class$=_treeBody]>[class$=_list]{-webkit-mask-image:linear-gradient(#000 calc(100% - 24px),#0000)!important;mask-image:linear-gradient(#000 calc(100% - 24px),#0000)!important}@keyframes av-top-specular-sweep{0%{transform:translate(-38%)}to{transform:translate(38%)}}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]{--av-top-sweep:#ffffff9e;--av-top-sweep-opacity:.72;--av-top-sweep-duration:.8s;--av-top-spot-core:#ffffff4d;--av-top-spot-mid:#ffffff16;isolation:isolate;outline-offset:-1px;text-shadow:0 1px 2px #00000038;background-size:auto;position:relative;transform:none;outline:1px solid var(--av-mother-edge)!important;color:var(--av-mother-text)!important;background:var(--av-mother-surface-compact)!important;box-shadow:var(--av-mother-shadow-top)!important;backdrop-filter:var(--av-mother-control-filter)!important;filter:none!important;border:0!important;transition:outline-color .16s,color .16s,box-shadow .18s,background .18s!important;overflow:hidden!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:before{transform:translate(-38%);content:\"\"!important;z-index:1!important;pointer-events:none!important;border-radius:inherit!important;opacity:0!important;background:linear-gradient(105deg, transparent 38%, var(--av-top-sweep) 49%, transparent 60%)!important;filter:none!important;animation:none!important;display:block!important;position:absolute!important;inset:-40% -70%!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:after{content:\"\"!important;z-index:0!important;pointer-events:none!important;border-radius:inherit!important;opacity:0!important;background:radial-gradient(ellipse 112px 76px at var(--av-glass-x,50%) var(--av-glass-y,0%), var(--av-top-spot-core), var(--av-top-spot-mid) 31%, transparent 72%)!important;transition:opacity .16s!important;animation:none!important;display:block!important;position:absolute!important;inset:1px!important;transform:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]>*{z-index:2;position:relative}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top] :is(svg,i){color:currentColor;filter:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:not(:disabled):not([aria-disabled=true]):not([aria-busy=true]):is(:hover,:focus-visible,.active,[aria-pressed=true],[aria-selected=true],[aria-expanded=true]){outline-color:#f5fcf91c;color:var(--av-mother-text-strong)!important;background:var(--av-mother-surface-compact-hover)!important;box-shadow:var(--av-mother-shadow-top)!important;transform:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:not(:disabled):not([aria-disabled=true]):not([aria-busy=true]):is(:hover,:focus-visible):before{opacity:var(--av-top-sweep-opacity)!important;animation:av-top-specular-sweep var(--av-top-sweep-duration) cubic-bezier(.16, 1, .3, 1) both!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top].av-pointer-active:not(:disabled):not([aria-disabled=true]):not([aria-busy=true]):hover:after{opacity:.82!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:focus-visible:after{opacity:.52!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:focus-visible{outline-offset:2px!important;box-shadow:0 0 0 4px #ffffff12, var(--av-mother-shadow-top)!important;outline:2px solid #ffffffd1!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:not(:disabled):not([aria-disabled=true]):not([aria-busy=true]):active{transform:translateY(.75px)scale(.988)!important;box-shadow:inset 0 4px 10px #0000003d,inset 0 -1px #ffffff13,0 2px 4px #0000001c!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top][data-av-pointer=off]{--av-top-sweep:#ffffffd1;--av-top-sweep-opacity:.9;--av-top-sweep-duration:.92s}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top][data-av-pointer=off]:after{display:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top][data-av-tone=danger]{--av-top-sweep:#ffcdd675;--av-top-spot-core:#ffa4b238;--av-top-spot-mid:#ff7e9412;color:var(--av-danger-copy);outline-color:var(--av-danger-edge)}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top][data-av-tone=danger]:not(:disabled):is(:hover,:focus-visible){color:var(--av-danger-copy)!important;outline-color:var(--av-danger-edge)!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:is(:disabled,[aria-disabled=true]){color:#d6d6d257;filter:saturate(.2);outline-color:#f5fcf90a;box-shadow:var(--av-mother-shadow-top)!important;text-shadow:none!important;transform:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:is(:disabled,[aria-disabled=true],[aria-busy=true],.loading,.is-loading,.running,.is-running):before,html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:is(:disabled,[aria-disabled=true],[aria-busy=true],.loading,.is-loading,.running,.is-running):after{opacity:0!important;animation:none!important}html[data-dsh-av-glass] [data-av-interaction=top][role=tab]:not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]){box-shadow:none!important;background:0 0!important;border:0!important;outline:none!important}html[data-dsh-av-glass] [data-av-interaction=top][role=tab]:not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]):before,html[data-dsh-av-glass] [data-av-interaction=top][role=tab]:not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]):after{display:none!important}html[data-dsh-av-glass] [data-av-interaction=top][role=tab][aria-selected=true]:not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]){position:relative;color:var(--av-mother-text-strong)!important}html[data-dsh-av-glass] [data-av-interaction=top][role=tab][aria-selected=true]:not([class*=iconButton]):not([class*=searchButton]):not([class*=close]):not([class*=add]):not([data-disclosure-row]):not([class*=cardMain]):after{content:\"\";pointer-events:none;position:absolute;opacity:1!important;background:#ffffffeb!important;border-radius:2px!important;height:2px!important;display:block!important;inset:auto 0 1px!important}html[data-dsh-av-glass] :focus-visible{outline-offset:1px;outline:2px solid #c6e9dcd9!important}html[data-dsh-av-glass] ::selection{background:#c6e9dc59}@media (prefers-reduced-motion:reduce){html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]{transition:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:before{opacity:0!important;animation:none!important}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:after{opacity:0!important;transition:none!important}}@media (prefers-reduced-transparency:reduce){html[data-dsh-av-glass]{--av-mother-surface:#0d1011e6;--av-mother-panel-filter:none;--av-mother-dock-filter:none;--av-mother-dialog-filter:none}html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:before,html[data-dsh-av-glass] :is(button,a)[data-av-interaction=top]:after{opacity:0!important;transition:none!important;animation:none!important}}";
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
			ctx.effect(() => startSettingsHotkey({
				isActive: () => layer.getEnabled(),
				getKey: () => layer.getHotkey()
			}), "av-glass: settings hotkey");
			const store = createAVGlassCardStore();
			let bound;
			let revision = 0;
			const sync = () => {
				bound?.sync({ enabled: layer.getEnabled() }, revision);
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
					setAuraImage: (file) => layer.setAuraImage(file),
					setAuraBlur: (blur) => {
						layer.setAuraBlur(blur);
						sync();
					},
					setHotkey: (key) => {
						layer.setHotkey(key);
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