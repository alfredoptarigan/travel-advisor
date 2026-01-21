import type { MiddlewareHandler, Context, Next } from "hono"

export const authGuard: MiddlewareHandler = async (c: Context, next: Next) => {
  const user = c.get("user")
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401)
  }
  await next()
}
