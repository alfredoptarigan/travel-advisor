import { pgTable, text, uuid, integer, timestamp } from "drizzle-orm/pg-core"

export const places = pgTable("places", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location").notNull()
})

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey(),
  placeId: uuid("place_id").notNull().references(() => places.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).notNull().defaultNow()
})
