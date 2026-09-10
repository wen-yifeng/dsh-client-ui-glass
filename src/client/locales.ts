/** `settings.avglass` namespace dictionaries (the settings-row copy). */

/** Dictionary namespace owned by this plugin. */
export const NS = 'settings.avglass'

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'av.title': '玻璃模式',
  'av.description': '为整个界面应用统一的暗色玻璃质感，带磨砂层次、柔和扫光与细腻反光',
  'av.enable': '开启',
  'av.disable': '关闭',
  'av.customTitle': '自定义背景',
  'av.customDescription': '上传自己的图片作为壁纸背板，原图完整保存、重启不丢；未上传时为纯黑背板',
  'av.customActive': '已使用自定义壁纸',
  'av.upload': '上传壁纸',
  'av.reset': '清除壁纸',
  'av.blurTitle': '壁纸模糊',
  'av.blurDescription': '将背板壁纸整体虚化，让前景玻璃层次更柔和',
  'av.hotkeyTitle': '设置快捷键',
  'av.hotkeyDescription': '非输入状态下按该键打开设置弹窗；Esc 取消录制，Delete 清除',
  'av.hotkeyRecording': '按下按键…',
  'av.hotkeyOff': '未设置',
  'av.processing': '处理中…',
  'av.imageFailed': '图片读取失败，换一张试试',
  'av.storageSessionOnly': '浏览器存储空间不足，图片仅本次会话生效',
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
  'av.description': 'A unified dark glass finish for the interface: frosted depth, soft sheen, and subtle reflections',
  'av.enable': 'On',
  'av.disable': 'Off',
  'av.customTitle': 'Custom backdrop',
  'av.customDescription': "Use your own image as the wallpaper backdrop — kept at full resolution; the stage stays plain black until you upload one",
  'av.customActive': 'Custom wallpaper in use',
  'av.upload': 'Upload wallpaper',
  'av.reset': 'Clear wallpaper',
  'av.blurTitle': 'Wallpaper blur',
  'av.blurDescription': 'Blur the backdrop wallpaper for a softer glass look',
  'av.hotkeyTitle': 'Settings hotkey',
  'av.hotkeyDescription': 'Press this key outside text fields to open the settings dialog; Esc cancels, Delete clears',
  'av.hotkeyRecording': 'Press a key…',
  'av.hotkeyOff': 'Not set',
  'av.processing': 'Processing…',
  'av.imageFailed': "Couldn't read that image — try another file",
  'av.storageSessionOnly': 'Browser storage is full; the image applies to this session only',
} satisfies Record<AVGlassLocaleKey, string>
