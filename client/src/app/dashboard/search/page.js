'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, X, TrendingUp, Clock } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import KnowledgeCard from '@/components/knowledge/KnowledgeCard'
import { useKnowledgeStore } from '@/store/useKnowledgeStore'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    hasAI: 'all'
  })

  const { knowledgeItems } = useKnowledgeStore()

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    setRecentSearches(savedSearches)
  }, [])

  const saveSearch = (query) => {
    if (!query.trim()) return

    const updatedSearches = [
      query,
      ...recentSearches.filter(s => s !== query)
    ].slice(0, 5)

    setRecentSearches(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    saveSearch(searchQuery)

    try {
      const response = await fetch(`/api/knowledge/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()

      if (data.success) {
        let results = data.data

        // Apply filters
        if (filters.type !== 'all') {
          results = results.filter(item => item.type === filters.type)
        }

        if (filters.hasAI === 'processed') {
          results = results.filter(item => item.aiProcessed)
        } else if (filters.hasAI === 'not-processed') {
          results = results.filter(item => !item.aiProcessed)
        }

        setSearchResults(results)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
  }

  const removeRecentSearch = (index) => {
    const updated = recentSearches.filter((_, i) => i !== index)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Knowledge</h1>
        <p className="text-gray-600">
          Find exactly what you're looking for across your entire knowledge base
        </p>
      </div>

      {/* Search Bar */}
      <Card className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by title, content, tags, or AI summary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-12 pr-12 py-4 text-lg"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </Card>

      {/* Filters */}
      <Card className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              <option value="note">Notes</option>
              <option value="link">Links</option>
              <option value="insight">Insights</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI Processing
            </label>
            <select
              value={filters.hasAI}
              onChange={(e) => setFilters({...filters, hasAI: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Items</option>
              <option value="processed">AI Processed</option>
              <option value="not-processed">Not AI Processed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Recent Searches */}
      {recentSearches.length > 0 && !searchResults.length && (
        <Card className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-400" />
            <h3 className="font-semibold text-gray-900">Recent Searches</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
              >
                <button
                  onClick={() => {
                    setSearchQuery(search)
                    handleSearch()
                  }}
                  className="text-gray-700 hover:text-primary-600"
                >
                  {search}
                </button>
                <button
                  onClick={() => removeRecentSearch(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Search Results ({searchResults.length})
            </h2>
            <Button
              variant="outline"
              onClick={clearSearch}
            >
              <X className="w-4 h-4 mr-2" />
              Clear Results
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {searchResults.map((item, index) => (
              <KnowledgeCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchQuery && searchResults.length === 0 && !isSearching && (
        <Card className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No results found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters
          </p>
        </Card>
      )}

      {/* Popular Tags */}
      <Card className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900">Popular Tags</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from(
            new Set(knowledgeItems.flatMap(item => item.tags))
          )
            .slice(0, 20)
            .map((tag, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(tag)
                  handleSearch()
                }}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm hover:bg-primary-200"
              >
                {tag}
              </button>
            ))}
        </div>
      </Card>
    </div>
  )
}