'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/product-card'

export default function RestaurantsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch('/api/search?category=Restaurants')
        const data = await res.json()
        setProducts(data.results || [])
      } catch (e) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Restaurants</h1>

      {loading && <div className="text-sm text-muted-foreground">Loading…</div>}

      {!loading && products.length === 0 && <div className="text-muted-foreground">No products found.</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
