import type { Handler, Context } from "hono";
import { getHealth } from "../services/healthService";

export const healthController: Handler = (c: Context) => {
  const data = getHealth();
  const session = c.get("session");
  const user = c.get("user");
  return c.json({
    ...data,
    authenticated: !!user,
    user,
    session,
  });
};
