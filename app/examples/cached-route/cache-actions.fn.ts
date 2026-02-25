import { createServerFn } from "catmint/server";
import { invalidateCache } from "catmint/cache";

export const invalidateCachedDemo = createServerFn(async () => {
  await invalidateCache({ tag: "cached-demo" });
  return { invalidatedAt: new Date().toISOString() };
});
