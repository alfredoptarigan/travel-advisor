import type { Handler } from "hono";
import { z } from "zod";
import { getUserById, updateUserProfile } from "../services/user.service";

export const getMe: Handler = async (c) => {
  const u = c.get("user");
  if (!u) return c.json({ error: "Unauthorized" }, 401);
  const user = await getUserById(u.id);
  if (!user) return c.json({ error: "User not found" }, 404);
  return c.json(user);
};

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  image: z.string().url().optional(),
});

export const updateProfile: Handler = async (c) => {
  const u = c.get("user");
  if (!u) return c.json({ error: "Unauthorized" }, 401);
  const body = await c.req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
  const updated = await updateUserProfile(u.id, parsed.data);
  return c.json({ data: updated });
};
