export interface Review {
  id: number
  user: string
  userAvatar?: string
  rating: number
  date: string
  title: string
  content: string
}

export interface Destination {
  id: string
  name: string
  location: string
  address?: string
  phone?: string
  website?: string
  hours?: string
  description: string
  rating: number
  reviewsCount: number
  priceUSD: number
  priceIDR: number
  category: 'Outdoors' | 'Food' | 'Culture' | 'Hotel' | 'Restaurant' | 'Attraction'
  tags?: string[]
  ranking?: string
  images: string[]
  reviews: Review[]
  amenities?: string[]
  highlights?: string[]
}
