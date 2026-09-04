/** `settings.avglass` namespace dictionaries (the settings-row copy). */

/** Dictionary namespace owned by this plugin. */
export const NS = 'settings.avglass'

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'av.title': '玻璃模式',
  'av.description': '为整个界面套用单一母材质的暗色玻璃：分层材质、悬停扫光与极光背板',
  'av.enable': '开启',
  'av.disable': '关闭',
  'av.auraTitle': '背板光晕',
  'av.auraDescription': '在纯黑舞台叠加三枚静态冷光斑，让磨砂玻璃透出更明显的层次',
} satisfies Record<string, string>

export type AVGlassLocaleKey = keyof typeof zh

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The AV Glass settings card's copy. */
    'settings.avglass': AVGlassLocaleKey
  }
}

/** English dictionary. */
export const en = {
  'av.title': 'Glass mode',
  'av.description': 'A global dark glass UI: layered mother material, hover sweep and aurora backdrop',
  'av.enable': 'On',
  'av.disable': 'Off',
  'av.auraTitle': 'Backdrop aura',
  'av.auraDescription': 'Three static cool light spots on the black stage for a stronger frosted read',
} satisfies Record<AVGlassLocaleKey, string>
