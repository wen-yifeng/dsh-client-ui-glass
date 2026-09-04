/**
 * Standalone tsdown config for the AV Glass client bundle.
 *
 * The plugin lives outside the `packages` workspace (the repository glob
 * `packages/<group>/<pkg>` does not cover it), so the repository's clientBundle
 * preset (which resolves the package manifest through the workspace glob)
 * cannot serve it. This config replicates the preset's client-half contract:
 * a `window.__ModuleLoader__.load({ id, factory })` artifact at lib/client.js,
 * with module-table externals kept as require() calls and stylesheets compiled
 * by lightningcss and inlined as plugin-owned style injectors.
 *
 * CSS split:
 * - `*.css` (global, e.g. glass.css) — compiled + minified, injected as a
 *   `<style data-plugin-css=...>` tag, NO class hashing. The glass layer keys
 *   off stock DSH DOM (data-* hooks, attribute selectors), so hashing would
 *   break it.
 * - `*.module.css` (e.g. PluginCard.module.css) — CSS-modules transform with
 *   `[hash]_[local]` classes and a default class-map export for components.
 *
 * Rebuild: `cd` here and run `node <dsh-root>/node_modules/tsdown/dist/run.mjs`
 * (dsh web hot-polls lib/client.js). Plain .mjs on purpose: Node 22's native
 * TS config loader has a known parsing bug, so avoid a .ts config here.
 */
import { readFile } from 'node:fs/promises'
import { dirname, resolve as resolvePath } from 'node:path'
import { defineConfig } from 'tsdown'
import { transform } from 'lightningcss'

const PLUGIN_ID = '@deepseek-ai/dsh-client-ui-glass'

/** Module-table specifiers (shell baseline + preloaded) kept as require(). */
const EXTERNALS = new Set([
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-ui-primitives',
  '@deepseek-ai/dsh-client-runtime/client',
])

/**
 * Virtual-id wrapper keeping CSS away from tsdown's own css pipeline.
 * No `\0` prefix on purpose: the tsx config loader mis-parses the octal-ish
 * escape; a `virtual:` prefix is equally safe for rolldown virtual modules.
 */
const CSS_VIRTUAL_PREFIX = 'virtual:dsh-css:'
const MODULE_CSS_VIRTUAL_PREFIX = 'virtual:dsh-module-css:'
const CSS_VIRTUAL_SUFFIX = '.mjs'

/** Emit one plugin-owned style injector and an optional CSS Modules export. */
function styleInjectionModule(fileId, css, classMap) {
  const name = fileId.split('/').pop().split('\\').pop()
  const tagId = PLUGIN_ID + '/' + name
  const source = []
  source.push('const css = ' + JSON.stringify(css) + ';')
  source.push('const tagId = ' + JSON.stringify(tagId) + ';')
  source.push("if (typeof document !== 'undefined' && document.querySelector('style[data-plugin-css=' + JSON.stringify(tagId) + ']') === null) {")
  source.push("  const tag = document.createElement('style');")
  source.push('  tag.dataset.plugin = ' + JSON.stringify(PLUGIN_ID) + ';')
  source.push('  tag.dataset.pluginCss = tagId;')
  source.push('  tag.textContent = css;')
  source.push('  document.head.appendChild(tag);')
  source.push('}')
  source.push(classMap === undefined ? 'export {};' : 'export default ' + JSON.stringify(classMap) + ';')
  return source.join('\n')
}

export default defineConfig(() => ({
  name: `${PLUGIN_ID}/client`,
  entry: { client: 'src/client/index.ts' },
  outDir: 'lib',
  format: 'cjs',
  platform: 'browser',
  target: 'es2024',
  fixedExtension: false,
  dts: false,
  clean: false,
  sourcemap: true,
  deps: {
    neverBundle: (specifier) => EXTERNALS.has(specifier),
    alwaysBundle: (specifier) => !EXTERNALS.has(specifier),
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
    'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV ?? 'production'),
    'import.meta.env': JSON.stringify({ MODE: process.env.NODE_ENV ?? 'production' }),
  },
  plugins: [
    {
      name: 'dsh-css-global-inline',
      resolveId(source, importer) {
        if (!source.endsWith('.css') || source.endsWith('.module.css') || importer === undefined) return null
        const abs = resolvePath(dirname(importer), source)
        return CSS_VIRTUAL_PREFIX + abs + CSS_VIRTUAL_SUFFIX
      },
      async load(virtualId) {
        if (!virtualId.startsWith(CSS_VIRTUAL_PREFIX)) return null
        const fileId = virtualId.slice(CSS_VIRTUAL_PREFIX.length, -CSS_VIRTUAL_SUFFIX.length)
        this.addWatchFile(fileId)
        const source = await readFile(fileId)
        const { code } = transform({ filename: fileId, code: source, minify: true })
        return styleInjectionModule(fileId, code.toString())
      },
    },
    {
      name: 'dsh-css-modules-inline',
      resolveId(source, importer) {
        if (!source.endsWith('.module.css')) return null
        const abs = importer !== undefined ? resolvePath(dirname(importer), source) : source
        return MODULE_CSS_VIRTUAL_PREFIX + abs + CSS_VIRTUAL_SUFFIX
      },
      async load(virtualId) {
        if (!virtualId.startsWith(MODULE_CSS_VIRTUAL_PREFIX)) return null
        const fileId = virtualId.slice(MODULE_CSS_VIRTUAL_PREFIX.length, -CSS_VIRTUAL_SUFFIX.length)
        this.addWatchFile(fileId)
        const source = await readFile(fileId)
        const { code, exports: cssExports } = transform({
          filename: fileId,
          code: source,
          cssModules: { pattern: '[hash]_[local]' },
          minify: true,
        })
        const classMap = {}
        for (const [local, exp] of Object.entries(cssExports ?? {})) classMap[local] = exp.name
        return styleInjectionModule(fileId, code.toString(), classMap)
      },
    },
  ],
  outputOptions: {
    entryFileNames: 'client.js',
    banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(PLUGIN_ID)}, factory: (require) => {`,
    footer: 'return module.exports; } });',
    intro: 'var module = { exports: {} }; var exports = module.exports;',
  },
}))
