import { z } from "zod";
import { auth } from "../lib/auth";
import { Handler } from "hono";
import { env } from "../env";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export const registerEmailPassword: Handler = async (c) => {
  const body = await c.req.json();
  const parsed = RegisterSchema.safeParse(body);

  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  try {
    const res = await auth.api.signUpEmail({
      headers: c.req.raw.headers,
      body: parsed.data,
    });
    return c.json({ data: res }, 201);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return c.json({ error: message }, 400);
  }
};

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginEmailPassword: Handler = async (c) => {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return c.json({ error: "Invalid JSON", message }, 400);
  }
  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  try {
    const headers = new Headers(c.req.raw.headers);
    headers.set("content-type", "application/json");
    if (!headers.get("origin")) {
      headers.set("origin", env.CORS_ORIGIN);
    }
    const req = new Request(`${env.BETTER_AUTH_URL}/api/auth/sign-in/email`, {
      method: "POST",
      headers,
      body: JSON.stringify(parsed.data),
    });
    const response = await auth.handler(req);
    return response;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return c.json({ error: message }, 400);
  }
};

export const logout: Handler = async (c) => {
  try {
    const res = await auth.api.signOut({ headers: c.req.raw.headers });
    return c.json(res);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return c.json({ error: message }, 400);
  }
};
