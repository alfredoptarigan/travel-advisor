import { z } from "zod";
import { auth } from "../lib/auth";
import { Handler } from "hono";

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
  const body = await c.req.json();
  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  try {
    const res = await auth.api.signInEmail({
      headers: c.req.raw.headers,
      body: parsed.data,
    });
    return c.json({ data: res });
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
