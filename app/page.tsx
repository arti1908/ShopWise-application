'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const STORAGE_KEY = 'shopwise_wishlist'
const CART_KEY = 'shopwise_cart'

type WishlistItem = {
  id: number
  name: string
  retailer?: string
  imageUrl?: string
  [key: string]: unknown
}

type CartItem = {
  id: number
  quantity: number
  product: WishlistItem
}

function normalizeWishlistItems(raw: unknown): WishlistItem[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const id = Number((item as WishlistItem).id)
      if (!Number.isFinite(id)) return null
      return { ...(item as WishlistItem), id }
    })
    .filter((item): item is WishlistItem => Boolean(item))
}

function normalizeCartItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const product = (item as CartItem).product
      if (!product || typeof product !== 'object') return null
      const id = Number((item as CartItem).id)
      const quantity = Number((item as CartItem).quantity)
      if (!Number.isFinite(id) || !Number.isFinite(quantity)) return null
      return { id, quantity: Math.max(1, quantity), product }
    })
    .filter((item): item is CartItem => Boolean(item))
}

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([])
  const router = useRouter()
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        setItems(JSON.parse(raw))
        setItems(normalizeWishlistItems(JSON.parse(raw)))
      } catch {
        setItems([])
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])
  }, [isLoaded, items])

  function removeItem(id: number) {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }

  function moveToCart(product: any) {
  function moveToCart(product: WishlistItem) {
    const raw = localStorage.getItem(CART_KEY)
    let cart = []
    let cart: CartItem[] = []
    try {
      cart = raw ? JSON.parse(raw) : []
      cart = normalizeCartItems(raw ? JSON.parse(raw) : [])
    } catch {
      cart = []
    }
    const newItem = { id: Date.now(), quantity: 1, product }
    cart.push(newItem)
    const existing = cart.find((item) => item.product?.id === product.id)
    if (existing) {
      existing.quantity = Math.max(1, existing.quantity + 1)
    } else {
      const newItem = { id: Date.now(), quantity: 1, product }
      cart.push(newItem)
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
    // remove from wishlist
    removeItem(product.id)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      <div className="flex items-center gap-3 mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center rounded-md border border-border px-3 py-1 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Back
        </button>
        <h1 className="text-2xl font-bold">Your Wishlist</h1>
      </div>

      {items.length === 0 && <div className="text-muted-foreground">Your wishlist is empty.</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((p) => (
          <div key={p.id} className="bg-card rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20">
                <img src={p.imageUrl || '/placeholder.svg'} alt={p.name} className="w-full object-cover rounded" />
              </div>
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.retailer}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => moveToCart(p)} className="px-3 py-1 bg-primary text-primary-foreground rounded">Add to cart</button>
              <button onClick={() => removeItem(p.id)} className="px-3 py-1 bg-destructive text-destructive-foreground rounded">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
