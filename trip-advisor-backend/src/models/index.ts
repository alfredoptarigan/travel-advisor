export type Place = {
  id: string
  name: string
  description?: string
  location: string
}

export type Review = {
  id: string
  placeId: string
  userId: string
  rating: number
  comment?: string
  createdAt: Date
}
