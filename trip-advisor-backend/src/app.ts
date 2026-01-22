import { Hono } from "hono";
import type { Context, Next } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import authHandlerRouter from "./routes/auth-handler";
import userRouter from "./routes/user";
import placeRouter from "./routes/place";
import { auth } from "./lib/auth";
import { env } from "./env";
import { rateLimit } from "./middleware/rateLimit";
import { healthController } from "./controllers/healthController";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>({ strict: false });

app.use(
  "/api/*",
  cors({
    origin: env.CORS_ORIGIN,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("*", secureHeaders());
app.use("*", logger());
app.use("*", rateLimit({ windowMs: 60_000, max: 100 }));

app.use("*", async (c: Context, next: Next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }
  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});

app.basePath("/api").route("/", authHandlerRouter);
app.basePath("/api").route("/", userRouter);
app.basePath("/api").route("/", placeRouter);

app.get("/health", healthController);

app.onError((err, c) => {
  return c.json(
    {
      error: "Internal Server Error",
      message: err instanceof Error ? err.message : String(err),
    },
    500,
  );
});

export type AppType = typeof app;
export default app;
