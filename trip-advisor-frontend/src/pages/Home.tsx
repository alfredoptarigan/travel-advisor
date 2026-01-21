import React from 'react'
import { Link } from '@tanstack/react-router'
import { Search, MapPin, Utensils, Mountain, Bed, Ticket, Plane, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useCurrencyStore } from '@/stores/useCurrencyStore'

// Mock Data
const categories = [
  { name: 'Hotels', icon: Bed, color: 'text-gray-700' },
  { name: 'Things to Do', icon: Ticket, color: 'text-gray-700' },
  { name: 'Restaurants', icon: Utensils, color: 'text-gray-700' },
  { name: 'Flights', icon: Plane, color: 'text-gray-700' },
  { name: 'Vacation Rentals', icon: Mountain, color: 'text-gray-700' },
  { name: 'Cruises', icon: Globe, color: 'text-gray-700' },
]

const destinations = [
  { id: '1', name: 'Bali Paradise', location: 'Bali, Indonesia', rating: 4.8, reviews: 1240, priceUSD: 150, priceIDR: 2250000, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80', category: 'Outdoors' },
  { id: '2', name: 'Mie Tiong Sim', location: 'Medan, Indonesia', rating: 4.5, reviews: 209, priceUSD: 10, priceIDR: 150000, image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80', category: 'Food' },
  { id: '3', name: 'Borobudur Temple', location: 'Magelang, Indonesia', rating: 4.7, reviews: 3200, priceUSD: 50, priceIDR: 750000, image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80', category: 'Culture' },
  { id: '4', name: 'Komodo National Park', location: 'NTT, Indonesia', rating: 4.9, reviews: 850, priceUSD: 200, priceIDR: 3000000, image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80', category: 'Outdoors' },
  { id: '5', name: 'La Siesta Hotel', location: 'Hanoi, Vietnam', rating: 5.0, reviews: 5420, priceUSD: 120, priceIDR: 1800000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', category: 'Hotel' },
]

// Helper for bubbles
const RatingBubbles = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <div 
          key={star} 
          className={`w-3 h-3 rounded-full border border-green-600 ${rating >= star ? 'bg-green-500' : rating >= star - 0.5 ? 'bg-green-200' : 'bg-white'}`}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const { currency } = useCurrencyStore()

  const formatPrice = (usd: number, idr: number) => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(usd)
    }
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(idr)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
            Where to?
          </h1>
          
          {/* Categories Nav */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
            {categories.map((cat) => (
              <div key={cat.name} className="flex flex-col items-center cursor-pointer group hover:text-black text-gray-600 transition-colors">
                <cat.icon className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm md:text-base whitespace-nowrap">{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto relative z-20">
            <div className="bg-white rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-shadow p-2 pl-6 flex items-center border border-gray-200">
              <Search className="w-5 h-5 text-gray-800 mr-3" />
              <Input 
                type="text" 
                placeholder="Places to go, things to do, hotels..." 
                className="border-none shadow-none bg-transparent focus-visible:ring-0 text-lg placeholder:text-gray-500 h-12 flex-1"
              />
              <Button size="lg" className="rounded-full px-8 bg-green-500 hover:bg-green-600 text-white font-bold h-12">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Image / Background */}
        <div className="mt-12 rounded-xl overflow-hidden max-w-6xl mx-auto relative h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent text-white">
            <h2 className="text-3xl font-bold">Plan your best trip ever</h2>
            <p className="text-lg opacity-90">Discover the beauty of Indonesia's hidden gems</p>
          </div>
        </div>
      </section>

      {/* Travelers' Choice Section */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">2024 Travelers' Choice Best of the Best</h2>
            <p className="text-gray-600 mt-1">Travelers' favorite destinations, hotels, restaurants, things to do, and beyond.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link to="/destinations/$id" params={{ id: dest.id }} key={dest.id} className="block group">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                    {dest.category}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-yellow-400 text-black px-2 py-0.5 rounded text-xs font-bold shadow-sm flex items-center">
                    <span className="mr-1">🏆</span> Best of 2024
                  </div>
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:underline decoration-2 underline-offset-2 decoration-slate-900">
                  {dest.name}
                </h3>
                <div className="flex items-center mt-1 mb-1">
                  <RatingBubbles rating={dest.rating} />
                  <span className="text-xs text-gray-500 ml-2">{dest.reviews} reviews</span>
                </div>
                <p className="text-sm text-gray-500 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" /> {dest.location}
                </p>
                <div className="mt-2 font-bold text-slate-900">
                  {formatPrice(dest.priceUSD, dest.priceIDR)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Tour */}
      <section className="py-16 container px-4 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Ways to tour Indonesia</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="h-48 bg-gray-200 relative">
               <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover rounded-t-lg" alt="Outdoors" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Outdoors</h3>
              <p className="text-gray-600 mb-4">Hiking, beaches, and natural wonders waiting for you.</p>
              <Button variant="outline" className="rounded-full border-black text-black hover:bg-gray-100">Explore Outdoors</Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="h-48 bg-gray-200 relative">
               <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover rounded-t-lg" alt="Food" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Food & Drink</h3>
              <p className="text-gray-600 mb-4">Culinary journeys through the archipelago's spices.</p>
              <Button variant="outline" className="rounded-full border-black text-black hover:bg-gray-100">Explore Food</Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="h-48 bg-gray-200 relative">
               <img src="https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover rounded-t-lg" alt="Culture" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Culture</h3>
              <p className="text-gray-600 mb-4">Temples, traditions, and the heritage of Indonesia.</p>
              <Button variant="outline" className="rounded-full border-black text-black hover:bg-gray-100">Explore Culture</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#F2F1EC]">
        <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Travel with confidence</h2>
            <p className="text-lg text-gray-700 mb-6">Many bookings can be cancelled for free. Plans change. We get it.</p>
            <Button className="rounded-full bg-black text-white px-8 py-6 text-lg hover:bg-gray-800">Start planning</Button>
          </div>
          <div className="w-full md:w-1/3">
             <img src="https://static.tacdn.com/img2/travelers_choice/TC_2024_Best_of_the_Best_Logo_Update.png" alt="Travelers Choice" className="w-full max-w-[300px] mx-auto opacity-80" />
          </div>
        </div>
      </section>
    </div>
  )
}
