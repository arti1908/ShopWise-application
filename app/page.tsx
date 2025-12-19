import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { ProductGrid } from "@/components/product-grid"
import { ShoppingCart, Heart, MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">ShopWise</h1>
            </Link>

            <nav className="flex items-center gap-6">
              <Link href="/" className="text-foreground hover:text-primary font-medium transition-colors">
                Home
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span className="hidden sm:inline">Wishlist</span>
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Cart</span>
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Find the Best Prices Instantly
              </h2>
              <p className="text-lg text-muted-foreground text-balance">
                Compare prices from local Albanian markets and save money on every purchase
              </p>
              <SearchBar />

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Showing results near Tirana, Albania</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-border rounded-lg bg-card text-foreground text-sm">
                  <option>Sort by: Lowest Price</option>
                  <option>Sort by: Closest Location</option>
                  <option>Sort by: Best Discount</option>
                </select>
              </div>
            </div>

            <ProductGrid />
          </div>
        </section>
      </main>

      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-foreground mb-3">ShopWise</h3>
              <p className="text-sm text-muted-foreground">Save money by comparing prices across Albanian markets</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/markets" className="hover:text-primary transition-colors">
                    Markets
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 ShopWise. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
