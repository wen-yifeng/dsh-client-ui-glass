export declare const inject: string[];
export declare const name: string;
export declare function apply(ctx: {
  invariants: {
    register: (pkg: string, install: () => void) => Promise<unknown>;
  };
}): Promise<unknown>;