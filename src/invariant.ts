/**
 * Package-owned invariant companion for `@deepseek-ai/dsh-client-ui-glass`.
 * @module @deepseek-ai/dsh-client-ui-glass/invariant
 */
const PACKAGE_NAME = '@deepseek-ai/dsh-client-ui-glass'

/** Cordis companion plugin name. */
const name = 'client-ui-glass-invariant'

/** Service required before the companion can reserve package ownership. */
const inject = ['invariants']

/** No runtime invariant: the theme layer holds no cross-plugin mutable state. */
const install = () => {}

/**
 * Register this package's invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
const apply = (ctx: { invariants: { register: (pkg: string, install: () => void) => Promise<unknown> } }) =>
  Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install))

export { apply, inject, name }