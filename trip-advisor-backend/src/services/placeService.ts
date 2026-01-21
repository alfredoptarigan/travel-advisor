import { db } from "../db/drizzle";
import { places } from "../db/schema";
import { eq } from "drizzle-orm";

export const listPlaces = async () => {
  const rows = await db.select().from(places);
  return rows;
};

export const createPlace = async (input: {
  name: string;
  description?: string | null;
  location: string;
}) => {
  const id = crypto.randomUUID();
  const inserted = await db
    .insert(places)
    .values({
      id,
      name: input.name,
      description: input.description ?? null,
      location: input.location,
    })
    .returning();
  return inserted[0];
};
