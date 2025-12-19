"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"

const demoProducts = [
  {
    id: 1,
    name: "iPhone 14",
    price: 89900,
    imageUrl: "/iphone-14.png",
    description: "Apple smartphone 128GB",
    retailer: "Tech Store Tirana",
    distance: 2.5,
    originalPrice: 95000,
  },
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
    id: 3,
    name: "MacBook Air M2",
    price: 119900,
    imageUrl: "/macbook-air-m2.png",
    description: "Apple laptop M2 chip",
    retailer: "Computer Center",
    distance: 1.2,
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    price: 35900,
    imageUrl: "/wireless-headphones.png",
    description: "Noise-cancelling headphones",
    retailer: "Audio Pro",
    distance: 4.5,
    originalPrice: 39900,
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
  {
    id: 6,
    name: "Dell XPS 15",
    price: 149900,
    imageUrl: "/dell-laptop.png",
    description: "Professional laptop i7",
    retailer: "Tech Hub",
    distance: 5.3,
    originalPrice: 159900,
  },
]

export function ProductGrid() {
  const [products] = useState(demoProducts)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
