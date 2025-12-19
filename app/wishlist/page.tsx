"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"
import { ProductCard } from "@/components/product-card"

const demoWishlist = [
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 79900,
    imageUrl: "/samsung-galaxy-s23.png",
    description: "Samsung smartphone 256GB",
    retailer: "Mobile World",
    distance: 3.8,
    originalPrice: 85000,
  },
  {
    id: 5,
    name: "iPad Air",
    price: 59900,
    imageUrl: "/ipad-air.png",
    description: "Apple tablet 64GB",
    retailer: "iStore Albania",
    distance: 2.1,
  },
]

export default function WishlistPage() {
  const [wishlistItems] = useState(demoWishlist)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
          <Heart className="w-8 h-8" />
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Save products you love for later</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
