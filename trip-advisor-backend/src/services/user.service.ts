import { eq } from "drizzle-orm";
import { user } from "../db/auth-schema";
import { db } from "../db/drizzle";

export async function getUserById(id: string) {
  const rows = await db.select().from(user).where(eq(user.id, id));
  return rows[0] ?? null;
}

export async function updateUserProfile(
  id: string,
  data: { name?: string; image?: string },
) {
  const rows = await db
    .update(user)
    .set({
      ...(data.name ? { name: data.name } : {}),
      ...(data.image ? { image: data.image } : {}),
    })
    .where(eq(user.id, id))
    .returning();
  return rows[0] ?? null;
}
