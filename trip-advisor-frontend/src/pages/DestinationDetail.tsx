import React, { useState, useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import {
  MapPin,
  User,
  Share2,
  Heart,
  Phone,
  Globe,
  CheckCircle2,
  Pencil,
  Wifi,
  Monitor,
  Camera,
  Filter,
  Search,
  ChevronRight,
  PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCurrencyStore } from "@/stores/useCurrencyStore";
import { Destination } from "@/types/destination";

// Helper for bubbles (Reused)
const RatingBubbles = ({
  rating,
  size = "w-4 h-4",
}: {
  rating: number;
  size?: string;
}) => {
  return (
    <div className="flex space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`${size} rounded-full border border-green-600 ${rating >= star ? "bg-green-500" : rating >= star - 0.5 ? "bg-green-200" : "bg-white"}`}
        />
      ))}
    </div>
  );
};

// Mock Data (Expanded)
const destinations: Record<string, Destination> = {
  "1": {
    id: "1",
    name: "Bali Paradise",
    location: "Bali, Indonesia",
    address: "Ubud, Bali 80571 Indonesia",
    description:
      "Experience the ultimate tropical getaway in Bali. Known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.",
    rating: 4.8,
    reviewsCount: 1240,
    priceUSD: 150,
    priceIDR: 2250000,
    category: "Outdoors",
    tags: ["Beaches", "Nature", "Relaxation"],
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    ],
    reviews: [
      {
        id: 1,
        user: "Alice",
        rating: 5,
        date: "Oct 2023",
        title: "Paradise Found!",
        content:
          "Amazing experience! The sunset was breathtaking and the locals were so friendly.",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Mie Tiong Sim Selat Panjang",
    location: "Medan, Indonesia",
    address: "Jl. Selat Panjang No. 7, Medan 20212 Indonesia",
    phone: "+62 61 415 7505",
    website: "https://mietiongsim.com",
    hours: "Open now: 07:00 AM - 11:00 PM",
    description:
      "Legendary noodle shop in Medan serving authentic Chinese-Indonesian noodles (Bakmi). Famous for its springy noodles and rich broth. A must-visit culinary destination in North Sumatra.",
    rating: 4.5,
    reviewsCount: 209,
    priceUSD: 10,
    priceIDR: 150000,
    category: "Restaurant",
    tags: ["Chinese", "Asian", "Noodles", "Late Night"],
    ranking: "#1 of 540 Restaurants in Medan",
    images: [
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1200&q=80", // Noodle 1
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80", // Noodle 2
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80", // Interior
    ],
    reviews: [
      {
        id: 1,
        user: "FoodieTraveller",
        userAvatar: "F",
        rating: 5,
        date: "Feb 2024",
        title: "Legendary Taste!",
        content:
          "Heard this noodle shop is legendary, and it stands with its reputation, very worth visiting to have a meal. The portion is big, enough to call it a main dish.",
      },
      {
        id: 2,
        user: "MedanLocal",
        userAvatar: "M",
        rating: 4,
        date: "Jan 2024",
        title: "Classic Medan Breakfast",
        content:
          "The noodles are delicious, the toppings, vegetables, dumplings are in the right portions. Always satisfied to eat at this place.",
      },
      {
        id: 3,
        user: "JohnDoe",
        userAvatar: "J",
        rating: 5,
        date: "Dec 2023",
        title: "Best Bakmi in Town",
        content:
          "Absolutely delicious. The wontons were perfect and the broth was rich. Highly recommended!",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Borobudur Temple",
    location: "Magelang, Indonesia",
    address:
      "Jl. Badrawati, Kw. Candi Borobudur, Borobudur, Kec. Borobudur, Kabupaten Magelang, Jawa Tengah",
    description:
      "The world's largest Buddhist temple. This 9th-century Mahayana Buddhist temple in Magelang Regency, not far from the town of Muntilan, in Central Java, Indonesia.",
    rating: 4.7,
    reviewsCount: 3200,
    priceUSD: 50,
    priceIDR: 750000,
    category: "Attraction",
    tags: ["History", "Culture", "Temple"],
    images: [
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605711217046-d3885ceb5f80?auto=format&fit=crop&w=800&q=80",
    ],
    reviews: [
      {
        id: 1,
        user: "TravelBuff",
        rating: 5,
        date: "Jan 2024",
        title: "Majestic!",
        content: "A truly spiritual experience. Best visited at sunrise.",
      },
    ],
    highlights: [
      "Sunrise Tour",
      "Professional Guide",
      "Entrance Fees included",
    ],
  },
  "4": {
    id: "4",
    name: "Komodo National Park",
    location: "NTT, Indonesia",
    address: "Komodo Island, East Nusa Tenggara",
    description:
      "Home to the famous Komodo dragon, this island offers rugged hills, pink sand beaches, and crystal clear waters perfect for diving.",
    rating: 4.9,
    reviewsCount: 850,
    priceUSD: 200,
    priceIDR: 3000000,
    category: "Attraction",
    tags: ["Nature", "Wildlife", "Diving"],
    images: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584265438885-4089c2049c31?auto=format&fit=crop&w=800&q=80",
    ],
    reviews: [
      {
        id: 1,
        user: "DiverDan",
        rating: 5,
        date: "Dec 2023",
        title: "Best Diving",
        content: "The marine life is incredible. Saw mantas and sharks.",
      },
    ],
    highlights: ["Dragon Trekking", "Pink Beach", "Snorkeling"],
  },
  "5": {
    id: "5",
    name: "La Siesta Classic Ma May Hotel",
    location: "Hanoi, Vietnam",
    address: "94 Ma May St, Old Quarter, Hoan Kiem, Hanoi 100000 Vietnam",
    phone: "+84 24 3926 3641",
    website: "https://lasiestahotels.vn",
    description:
      "A boutique hotel located in the heart of Hanoi Old Quarter. Offering elegant rooms, a rooftop bar with city views, and exceptional service. Walking distance to Hoan Kiem Lake and major attractions.",
    rating: 5.0,
    reviewsCount: 5420,
    priceUSD: 120,
    priceIDR: 1800000,
    category: "Hotel",
    tags: ["Luxury", "Boutique", "City Center"],
    ranking: "#2 of 1,200 Hotels in Hanoi",
    amenities: [
      "Free High Speed WiFi",
      "Pool",
      "Free Breakfast",
      "Airport transportation",
      "Spa",
      "Rooftop Bar",
    ],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80", // Hotel Room
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", // Lobby
      "https://images.unsplash.com/photo-1571896349842-6e53ce41e887?auto=format&fit=crop&w=800&q=80", // Pool
    ],
    reviews: [
      {
        id: 1,
        user: "SarahJ",
        userAvatar: "S",
        rating: 5,
        date: "Feb 2024",
        title: "Exceptional Service",
        content:
          "The staff went above and beyond to make our stay memorable. The room was beautiful and the location perfect.",
      },
      {
        id: 2,
        user: "MikeT",
        userAvatar: "M",
        rating: 5,
        date: "Jan 2024",
        title: "Best hotel in Hanoi",
        content:
          "Loved the rooftop bar. Breakfast was delicious with many options.",
      },
    ],
  },
};

export function DestinationDetail() {
  const { id } = useParams({ from: "/destinations/$id" });
  const { currency } = useCurrencyStore();
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const destination = destinations[id] || destinations["1"];

  const formatPrice = (usd: number, idr: number) => {
    if (currency === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(usd);
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(idr);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyNav(true);
      } else {
        setShowStickyNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!destination) {
    return (
      <div className="container mx-auto p-8 text-center">
        Destination not found
      </div>
    );
  }

  // Define Layout Components based on Category
  const isHotel = destination.category === "Hotel";
  const isRestaurant = destination.category === "Restaurant";
  const isAttraction =
    destination.category === "Attraction" ||
    destination.category === "Outdoors";

  return (
    <div className="bg-white min-h-screen pb-20 relative">
      {/* Sticky Sub-Navbar */}
      {showStickyNav && (
        <div className="fixed top-[60px] left-0 right-0 bg-white border-b z-40 shadow-sm animate-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto px-4 h-12 flex items-center justify-between">
            <div className="font-bold text-lg truncate mr-4">
              {destination.name}
            </div>
            <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
              <a
                href="#photos"
                className="hover:text-black border-b-2 border-transparent hover:border-black py-3"
              >
                Photos
              </a>
              <a
                href="#overview"
                className="hover:text-black border-b-2 border-transparent hover:border-black py-3"
              >
                Overview
              </a>
              <a
                href="#reviews"
                className="hover:text-black border-b-2 border-transparent hover:border-black py-3"
              >
                Reviews ({destination.reviewsCount})
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Heart className="w-5 h-5 cursor-pointer hover:fill-red-500 hover:text-red-500 transition-colors" />
              <Button
                size="sm"
                className="rounded-full bg-black text-white hover:bg-gray-800"
              >
                <Pencil className="w-3 h-3 mr-2" /> Write a Review
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <span className="hover:underline cursor-pointer">Asia</span> &gt;
          <span className="hover:underline cursor-pointer">
            {destination.location.split(", ")[1]}
          </span>{" "}
          &gt;
          <span className="hover:underline cursor-pointer">
            {destination.location.split(", ")[0]}
          </span>{" "}
          &gt;
          <span className="text-gray-900 font-medium">{destination.name}</span>
        </div>

        {/* Header */}
        <div
          className="flex flex-col md:flex-row justify-between items-start mb-6"
          id="overview"
        >
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">
              {destination.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
              <div className="flex items-center gap-1">
                <RatingBubbles rating={destination.rating} />
                <span className="font-bold text-slate-900">
                  {destination.reviewsCount} reviews
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-medium">
                {destination.ranking || `#1 of 10 ${destination.category}s`}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-medium">
                {destination.tags?.join(", ")}
              </span>
              {isRestaurant && (
                <>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center text-gray-600 underline decoration-dotted decoration-gray-400">
                    {formatPrice(destination.priceUSD, destination.priceIDR)} -{" "}
                    {formatPrice(
                      destination.priceUSD * 2,
                      destination.priceIDR * 2,
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="underline decoration-dotted">
                  {destination.address}
                </span>
              </div>
              {destination.phone && (
                <div className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer">
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </div>
              )}
              {destination.website && (
                <div className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer">
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer">
                <PenLine className="w-4 h-4" />
                <span>Improve this listing</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="rounded-full border-black font-semibold hover:bg-gray-100"
            >
              <Pencil className="w-4 h-4 mr-2" /> Write a review
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-black hover:bg-gray-100"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full border-black hover:bg-gray-100 ${isSaved ? 'bg-red-50 border-red-200 text-red-500' : ''}`}
              onClick={() => setIsSaved(!isSaved)}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Photo Mosaic */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 h-[400px] rounded-xl overflow-hidden"
          id="photos"
        >
          <div className="md:col-span-2 h-full relative group cursor-pointer">
            <img
              src={destination.images[0]}
              alt="Main"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
              <Camera className="w-4 h-4" /> Interior
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-2 h-full">
            <div className="h-1/2 relative group cursor-pointer">
              <img
                src={destination.images[1] || destination.images[0]}
                alt="Gallery 1"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <Camera className="w-4 h-4" /> Food
              </div>
            </div>
            <div className="h-1/2 relative group cursor-pointer">
              <img
                src={destination.images[2] || destination.images[0]}
                alt="Gallery 2"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <Camera className="w-4 h-4" /> Menu
              </div>
            </div>
          </div>
          <div className="hidden md:block h-full relative group cursor-pointer">
            <img
              src={destination.images[0]}
              alt="Gallery 3"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors text-white font-bold text-lg">
              View all photos (58)
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Content) */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <section className="mb-8 border-b pb-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">About</h2>
              <p className="text-slate-700 leading-relaxed text-lg mb-4">
                {destination.description}
              </p>

              {/* Features List for Restaurants */}
              {isRestaurant && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 className="font-bold text-sm mb-2">PRICE RANGE</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {formatPrice(destination.priceUSD, destination.priceIDR)}{" "}
                      -{" "}
                      {formatPrice(
                        destination.priceUSD * 2,
                        destination.priceIDR * 2,
                      )}
                    </p>
                    <h3 className="font-bold text-sm mb-2">CUISINES</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Chinese, Asian, Indonesian
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-2">SPECIAL DIETS</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Vegetarian Friendly
                    </p>
                    <h3 className="font-bold text-sm mb-2">MEALS</h3>
                    <p className="text-gray-600 text-sm">
                      Lunch, Dinner, Late Night
                    </p>
                  </div>
                </div>
              )}

              {/* Hotel Amenities */}
              {isHotel && destination.amenities && (
                <div className="mt-6">
                  <h3 className="font-bold text-lg mb-3">Property amenities</h3>
                  <div className="grid grid-cols-2 gap-y-2">
                    {destination.amenities.map(
                      (amenity: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-slate-700"
                        >
                          {idx % 2 === 0 ? (
                            <Wifi className="w-5 h-5" />
                          ) : (
                            <Monitor className="w-5 h-5" />
                          )}
                          <span>{amenity}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Attraction Highlights */}
              {isAttraction && destination.highlights && (
                <div className="mt-6">
                  <h3 className="font-bold text-lg mb-3">Highlights</h3>
                  <ul className="space-y-2">
                    {destination.highlights.map(
                      (highlight: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-slate-700"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span>{highlight}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </section>

            {/* Traveler Photos Section */}
            <section className="mb-8 border-b pb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Traveler photos (58)
                </h2>
                <Button variant="outline" className="rounded-full font-medium">
                  Add photos
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <img
                  src={destination.images[0]}
                  className="aspect-square object-cover rounded-lg"
                  alt="User 1"
                />
                <img
                  src={destination.images[1] || destination.images[0]}
                  className="aspect-square object-cover rounded-lg"
                  alt="User 2"
                />
                <img
                  src={destination.images[2] || destination.images[0]}
                  className="aspect-square object-cover rounded-lg"
                  alt="User 3"
                />
                <img
                  src={destination.images[0]}
                  className="aspect-square object-cover rounded-lg"
                  alt="User 4"
                />
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                  <span className="font-bold text-gray-600 text-sm">
                    See all
                  </span>
                </div>
              </div>
            </section>

            {/* Ratings Summary (Simplified) */}
            <section className="mb-8 border-b pb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-slate-700">
                    {isHotel ? "Cleanliness" : "Food"}
                  </div>
                  <RatingBubbles rating={4.5} size="w-3 h-3" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-slate-700">
                    Service
                  </div>
                  <RatingBubbles rating={4.0} size="w-3 h-3" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-slate-700">Value</div>
                  <RatingBubbles rating={4.5} size="w-3 h-3" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-slate-700">
                    {isHotel ? "Location" : "Atmosphere"}
                  </div>
                  <RatingBubbles rating={4.8} size="w-3 h-3" />
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Reviews ({destination.reviewsCount})
                </h2>
                <Button className="rounded-full bg-black text-white hover:bg-gray-800 font-bold">
                  Write a review
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b">
                <div className="flex items-center gap-2 border rounded-full px-3 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer">
                  <Filter className="w-4 h-4" /> Filters
                </div>
                <div className="flex items-center gap-2 border rounded-full px-3 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer">
                  English
                </div>
                <div className="flex items-center gap-2 border rounded-full px-3 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer">
                  Most recent
                </div>
                <div className="flex-1 max-w-sm ml-auto relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <Input
                    className="rounded-full pl-9 h-10 border-gray-300"
                    placeholder="Search reviews"
                  />
                </div>
              </div>

              <div className="space-y-8">
                {destination.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex gap-4 border-b pb-8 last:border-0"
                  >
                    <div className="w-16 flex-shrink-0 text-center">
                      <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 mb-2">
                        {review.userAvatar || review.user[0]}
                      </div>
                      <div className="text-xs text-gray-500 font-medium truncate w-full">
                        {review.user}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        12 contributions
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <RatingBubbles rating={review.rating} />
                        <span className="text-xs text-gray-500">
                          Reviewed {review.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">
                        {review.title}
                      </h3>
                      <p className="text-slate-700 text-sm leading-relaxed mb-4">
                        {review.content}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button className="flex items-center gap-1 hover:text-black transition-colors">
                          <CheckCircle2 className="w-4 h-4" /> Helpful
                        </button>
                        <button className="flex items-center gap-1 hover:text-black transition-colors">
                          <Share2 className="w-4 h-4" /> Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  className="rounded-full border-black font-bold"
                >
                  Read all {destination.reviewsCount} reviews{" "}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </section>
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg border-none">
              <CardContent className="p-0 overflow-hidden">
                {/* === HOTEL SIDEBAR === */}
                {isHotel && (
                  <>
                    <div className="bg-[#f2b203] p-4 font-bold text-black flex justify-between items-center">
                      <span>View Deal</span>
                      <span className="text-xl">
                        {formatPrice(
                          destination.priceUSD,
                          destination.priceIDR,
                        )}
                      </span>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="border rounded p-2 text-sm cursor-pointer hover:bg-gray-50">
                          <div className="text-gray-500 text-xs">Check In</div>
                          <div className="font-bold">May 15</div>
                        </div>
                        <div className="border rounded p-2 text-sm cursor-pointer hover:bg-gray-50">
                          <div className="text-gray-500 text-xs">Check Out</div>
                          <div className="font-bold">May 18</div>
                        </div>
                        <div className="col-span-2 border rounded p-2 text-sm cursor-pointer hover:bg-gray-50 flex justify-between items-center">
                          <div>
                            <div className="text-gray-500 text-xs">Guests</div>
                            <div className="font-bold">2 Adults</div>
                          </div>
                          <User className="w-4 h-4" />
                        </div>
                      </div>

                      <Button className="w-full bg-[#f2b203] hover:bg-[#d9a002] text-black font-bold h-12 text-lg mb-4">
                        View Deal
                      </Button>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <div className="font-bold text-gray-700">Agoda</div>
                          <div className="font-bold">
                            {formatPrice(
                              destination.priceUSD,
                              destination.priceIDR,
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <div className="font-bold text-gray-700">Expedia</div>
                          <div className="font-bold">
                            {formatPrice(
                              destination.priceUSD + 10,
                              destination.priceIDR + 150000,
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <div className="font-bold text-gray-700">
                            Booking.com
                          </div>
                          <div className="font-bold">
                            {formatPrice(
                              destination.priceUSD + 5,
                              destination.priceIDR + 75000,
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* === NON-HOTEL SIDEBAR (Restaurant, Attraction, etc.) === */}
                {!isHotel && (
                  <div className="p-6 space-y-6">
                    {/* Save Favorite Section */}
                    <div className="border rounded-xl p-6 text-center shadow-sm">
                      <h3 className="text-xl font-bold mb-4 text-slate-900">
                        Save this{" "}
                        {destination.category === "Restaurant"
                          ? "restaurant"
                          : "place"}
                      </h3>
                      <Button
                        variant="outline"
                        onClick={() => setIsSaved(!isSaved)}
                        className={`w-full rounded-full border-2 h-12 font-bold text-lg flex items-center justify-center gap-2 group transition-colors ${
                          isSaved
                            ? "bg-red-50 border-red-500 text-red-500 hover:bg-red-100"
                            : "border-black hover:bg-gray-50 text-slate-900"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${
                            isSaved ? "fill-current" : "group-hover:fill-black"
                          }`}
                        />{" "}
                        {isSaved ? "Saved" : "Save"}
                      </Button>
                    </div>

                    {/* Hours Section */}
                    <div className="border rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-900">
                          Hours
                        </h3>
                        <div className="text-sm font-medium underline cursor-pointer flex items-center gap-1">
                          <Pencil className="w-3 h-3" /> Suggest an edit
                        </div>
                      </div>

                      <div className="text-green-600 font-bold mb-4">
                        Open until 10:00 PM
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-900">
                            Sunday
                          </span>
                          <span className="text-slate-600">
                            10:00 AM - 10:00 PM
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-900">
                            Monday
                          </span>
                          <span className="text-slate-600">
                            10:00 AM - 10:00 PM
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-900">
                            Tuesday
                          </span>
                          <span className="text-slate-600">
                            10:00 AM - 10:00 PM
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-900">
                            Wednesday
                          </span>
                          <span className="text-slate-600">
                            10:00 AM - 10:00 PM
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-900">
                            Thursday
                          </span>
                          <span className="text-slate-600">
                            10:00 AM - 10:00 PM
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-900">
                            Friday
                          </span>
                          <span className="text-slate-600">
                            10:00 AM - 10:00 PM
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-900">
                            Saturday
                          </span>
                          <span className="text-slate-600">
                            10:00 AM - 10:00 PM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
