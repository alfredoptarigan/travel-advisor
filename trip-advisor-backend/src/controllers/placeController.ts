import type { Handler } from "hono"
import { z } from "zod"
import { listPlaces, createPlace } from "../services/placeService"

export const getPlaces: Handler = async (c) => {
  const data = await listPlaces()
  return c.json({ data })
}

const CreatePlaceSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  location: z.string().min(1)
})

export const postPlace: Handler = async (c) => {
  const body = await c.req.json()
  const parsed = CreatePlaceSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400)
  }
  const created = await createPlace(parsed.data)
  return c.json({ data: created }, 201)
}
