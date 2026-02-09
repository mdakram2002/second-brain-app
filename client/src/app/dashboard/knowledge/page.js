'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Plus, ArrowLeft } from 'lucide-react'
import KnowledgeGrid from '@/components/knowledge/KnowledgeGrid'
import { useKnowledgeStore } from '@/store/useKnowledgeStore'

export default function KnowledgePage() {
  const router = useRouter()
  const { knowledgeItems, isLoading, fetchKnowledge } = useKnowledgeStore()

  useEffect(() => {
    fetchKnowledge()
  }, [])

  const recentItems = knowledgeItems.slice(0, 10)

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Knowledge</h1>
            <p className="text-gray-600 mt-2">
              Browse and manage all your knowledge items
            </p>
          </div>
          <Button href="/dashboard/knowledge/new">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{knowledgeItems.length}</div>
            <div className="text-gray-600">Total Items</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {knowledgeItems.filter(item => item.type === 'note').length}
            </div>
            <div className="text-gray-600">Notes</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {knowledgeItems.filter(item => item.type === 'link').length}
            </div>
            <div className="text-gray-600">Links</div>
          </div>
        </Card>
      </div>

      {/* Knowledge Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : knowledgeItems.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Plus className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No knowledge items yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start by adding your first knowledge item
          </p>
          <Button href="/dashboard/knowledge/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Knowledge
          </Button>
        </Card>
      ) : (
        <KnowledgeGrid items={recentItems} />
      )}
    </div>
  )
}