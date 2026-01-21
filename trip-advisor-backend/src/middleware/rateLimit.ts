import type { MiddlewareHandler } from "hono";
import type { Context, Next } from "hono";

type Bucket = {
  tokens: number;
  lastRefill: number;
};

export const rateLimit = (options: {
  windowMs: number;
  max: number;
}): MiddlewareHandler => {
  const buckets = new Map<string, Bucket>();
  const now = () => Date.now();
  const refill = (bucket: Bucket) => {
    const elapsed = now() - bucket.lastRefill;
    if (elapsed >= options.windowMs) {
      bucket.tokens = options.max;
      bucket.lastRefill = now();
    }
  };

  return (async (c: Context, next: Next) => {
    const ip =
      c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
      c.req.header("x-real-ip") ||
      c.req.raw.headers.get("cf-connecting-ip") ||
      c.req.raw.headers.get("x-client-ip") ||
      c.req.raw.headers.get("x-host") ||
      c.req.raw.headers.get("host") ||
      "unknown";

    const key = `${ip}:${c.req.path}`;
    const bucket = buckets.get(key) ?? {
      tokens: options.max,
      lastRefill: now(),
    };
    refill(bucket);

    if (bucket.tokens <= 0) {
      return c.json({ error: "Too many requests" }, 429);
    }

    bucket.tokens -= 1;
    buckets.set(key, bucket);
    await next();
  }) as MiddlewareHandler;
};
