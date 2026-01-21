import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'

// Mock Data
const featuredPost = {
  id: 1,
  title: "10 Hidden Gems in Bali You Must Visit",
  excerpt: "Beyond the popular beaches of Kuta and Seminyak lies a side of Bali that remains untouched and pristine. Discover waterfalls, secret beaches, and traditional villages.",
  author: "Sarah Jenkins",
  date: "Jan 15, 2024",
  category: "Destinations",
  image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80"
}

const recentPosts = [
  {
    id: 2,
    title: "The Ultimate Guide to Street Food in Hanoi",
    excerpt: "From Pho to Bun Cha, explore the vibrant culinary scene of Vietnam's capital city.",
    author: "Mike Chen",
    date: "Jan 12, 2024",
    category: "Food & Drink",
    image: "https://images.unsplash.com/photo-1583476633603-96b8a8b1a50c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Solo Travel: Tips for Your First Adventure",
    excerpt: "Nervous about traveling alone? Here are practical tips to stay safe and make friends on the road.",
    author: "Emma Wilson",
    date: "Jan 10, 2024",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Budget Travel: Indonesia on $30 a Day",
    excerpt: "How to explore the archipelago without breaking the bank. Accommodation, food, and transport hacks.",
    author: "Alex Thompson",
    date: "Jan 05, 2024",
    category: "Budget Travel",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Packing List for Southeast Asia",
    excerpt: "Don't overpack! Here is the essential list of items you need for a tropical vacation.",
    author: "Lisa Park",
    date: "Jan 02, 2024",
    category: "Packing",
    image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Best Diving Spots in Raja Ampat",
    excerpt: "Discover the underwater paradise of West Papua. A guide to the best dive sites and liveaboards.",
    author: "David Miller",
    date: "Dec 28, 2023",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"
  }
]

const categories = [
  "All", "Destinations", "Food & Drink", "Travel Tips", "Budget Travel", "Adventure", "Luxury"
]

export function Blog() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <img 
          src={featuredPost.image} 
          alt="Featured" 
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
          <div className="container mx-auto">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
              {featuredPost.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight max-w-4xl">
              {featuredPost.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl line-clamp-2">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {featuredPost.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {featuredPost.date}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-8 relative z-10">
        
        {/* Categories */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-12 flex items-center gap-4 overflow-x-auto no-scrollbar">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                idx === 0 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-2">
              <span className="w-1 h-8 bg-green-500 rounded-full" />
              Latest Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentPosts.map((post) => (
                <Card key={post.id} className="border-none shadow-none bg-transparent group cursor-pointer">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                      {post.category}
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-green-600 font-bold text-sm group-hover:underline">
                      Read Article <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="rounded-full border-black font-bold h-12 px-8">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Newsletter */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Join our Travel Club</h3>
                <p className="text-gray-400 mb-6 text-sm">Get the latest travel tips, deals, and inspiration delivered straight to your inbox.</p>
                <div className="space-y-3">
                  <Input 
                    placeholder="Your email address" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 rounded-full h-12 text-center"
                  />
                  <Button className="w-full rounded-full bg-green-500 hover:bg-green-600 text-white font-bold h-12">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-4">No spam, unsubscribe anytime.</p>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Bali', 'Food', 'Solo Travel', 'Beaches', 'Culture', 'Tips', 'Photography', 'Hiking'].map(tag => (
                  <span key={tag} className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Trending Now */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold text-lg mb-4">Trending Now</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3 group cursor-pointer">
                    <span className="text-2xl font-black text-gray-200 group-hover:text-green-500 transition-colors">0{i}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:underline line-clamp-2">
                        Top 10 Instagrammable Spots in Nusa Penida
                      </h4>
                      <span className="text-xs text-gray-400">3 min read</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
