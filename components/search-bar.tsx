"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export function SearchBar({
  initialQuery = "",
  onSearch,
}: {
  initialQuery?: string
  onSearch?: (q: string) => void
}) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSearch = () => {
    const trimmed = query.trim()
    if (!trimmed) return
    if (onSearch) {
      onSearch(trimmed)
      return
    }
    // fallback: navigate to the search page
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search for products..."
          className="w-full px-6 py-4 pr-32 text-lg border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>
      </div>
    </div>
  )
}
