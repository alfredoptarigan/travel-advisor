import { Hono } from "hono";
import type { Context } from "hono";
import { auth } from "../lib/auth";
import { env } from "../env";

const router = new Hono();

router.on(["POST", "GET"], "/auth/*", (c: Context) => {
  const headers = new Headers(c.req.raw.headers);
  if (!headers.get("origin") || headers.get("origin") === "null") {
    headers.set("origin", env.CORS_ORIGIN);
  }
  const req = new Request(c.req.raw, { headers });
  return auth.handler(req);
});

export default router;
