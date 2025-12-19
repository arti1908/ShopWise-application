"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Heart, ShoppingCart, TrendingDown } from "lucide-react"
import { ProductModal } from "./product-modal"

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  description: string
  retailer: string
  distance: number
  originalPrice?: number
}

export function ProductCard({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log("[v0] Added to cart:", product.name)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all cursor-pointer group"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          {discount > 0 && (
            <div className="absolute top-3 left-3 z-10 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <TrendingDown className="w-4 h-4" />
              {discount}% OFF
            </div>
          )}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${isWishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
            />
          </button>
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>
              {product.retailer} • {product.distance} km
            </span>
          </div>

          <div className="flex items-end justify-between pt-2">
            <div>
              <div className="text-2xl font-bold text-foreground">{product.price.toLocaleString()} ALL</div>
              {product.originalPrice && (
                <div className="text-sm text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString()} ALL
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <ProductModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
