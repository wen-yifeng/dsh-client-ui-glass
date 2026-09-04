import type { Context } from '@deepseek-ai/cordis';
import type z from '@deepseek-ai/schemastery';

/** Settings namespace owned by this plugin. */
export declare const NAMESPACE: string;

/** Durable section: one master switch, on by default. */
export declare const CONFIG: z.ZodType<{ enabled: boolean }, unknown, unknown>;

/** Register the namespace when the settings service is present. */
export declare function apply(ctx: Context): void;
