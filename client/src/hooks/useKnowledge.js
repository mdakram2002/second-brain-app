import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export function useKnowledge() {
  const [knowledge, setKnowledge] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchKnowledge()
  }, [])

  const fetchKnowledge = async () => {
    try {
      const response = await fetch('/api/knowledge')
      const data = await response.json()

      if (data.success) {
        setKnowledge(data.data)
      }
    } catch (error) {
      console.error('Error fetching knowledge:', error)
      toast.error('Failed to load knowledge')
    } finally {
      setLoading(false)
    }
  }

  const createKnowledge = async (knowledgeData) => {
    try {
      const response = await fetch('/api/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(knowledgeData)
      })

      const data = await response.json()

      if (data.success) {
        setKnowledge(prev => [data.data, ...prev])
        toast.success('Knowledge created successfully!')

        // Trigger AI processing
        fetch('/api/ai/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: data.data._id })
        }).catch(console.error)

        return data.data
      }
    } catch (error) {
      console.error('Error creating knowledge:', error)
      toast.error('Failed to create knowledge')
      throw error
    }
  }

  return {
    knowledge,
    loading,
    fetchKnowledge,
    createKnowledge
  }
}