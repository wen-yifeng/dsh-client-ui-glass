export declare const inject: string[];
export declare function apply(ctx: {
  settingsScope: {
    bind(spec: { namespace: string }): unknown;
  };
  theme: unknown;
  slots: unknown;
  locale: unknown;
  effect: unknown;
}): void;
