"use client"

import type React from "react"

import { useEffect, useState } from "react"
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
  category?: string
  inStock?: boolean
}

function readJSON<T>(key: string): T | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeJSON(key: string, value: any) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

const CART_KEY = "shopwise_cart"
const WISHLIST_KEY = "shopwise_wishlist"

export function ProductCard({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingCart, setIsAddingCart] = useState(false)
  const [isAddingWishlist, setIsAddingWishlist] = useState(false)

  useEffect(() => {
    // initialize wishlist state from localStorage
    const wishlist = readJSON<Product[]>(WISHLIST_KEY) || []
    const found = wishlist.find((p) => p.id === product.id)
    setIsWishlisted(!!found)
  }, [product.id])

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (typeof window === "undefined") return

    setIsAddingCart(true)

    const raw = readJSON<{ id: number; quantity: number; product: Product }[]>(CART_KEY) || []
    // try to find existing product in cart
    const existing = raw.find((it) => it.product?.id === product.id)
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1
    } else {
      raw.push({ id: Date.now(), quantity: 1, product })
    }
    writeJSON(CART_KEY, raw)

    // animation timeout
    setTimeout(() => {
      setIsAddingCart(false)
    }, 800)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (typeof window === "undefined") return

    setIsAddingWishlist(true)

    const raw = readJSON<Product[]>(WISHLIST_KEY) || []
    const exists = raw.find((p) => p.id === product.id)
    let next
    if (exists) {
      next = raw.filter((p) => p.id !== product.id)
      setIsWishlisted(false)
    } else {
      next = [product, ...raw]
      setIsWishlisted(true)
    }
    writeJSON(WISHLIST_KEY, next)

    setTimeout(() => {
      setIsAddingWishlist(false)
    }, 800)
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all cursor-pointer group relative"
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
            aria-pressed={isWishlisted}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
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

          {/* Animation indicators */}
          {isAddingCart && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-primary/90 text-primary-foreground px-4 py-2 rounded-full shadow-lg transform animate-add">Added to cart</div>
            </div>
          )}

          {isAddingWishlist && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-full shadow-lg transform animate-add">Wishlist</div>
            </div>
          )}
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

      <style jsx>{`
        @keyframes addAnim {
          0% { transform: translateY(0) scale(0.9); opacity: 0 }
          20% { opacity: 1; transform: translateY(-6px) scale(1) }
          100% { opacity: 0; transform: translateY(-40px) scale(0.8) }
        }
        .animate-add { animation: addAnim 700ms ease-in-out forwards }
      `}</style>
    </>
  )
}
