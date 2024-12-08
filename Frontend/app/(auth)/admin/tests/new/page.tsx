// app/admin/tests/new/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

export default function AdminCreateTestPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('Easy')
  const [status, setStatus] = useState('available')
  const [category, setCategory] = useState('')
  const [newCategory, setNewCategory] = useState('') // For creating a new category
  const [loading, setLoading] = useState(false)
  const [topics, setTopics] = useState<any[]>([]) // List of topics for the dropdown
  const router = useRouter()
  const { toast } = useToast()

  const fetchTopics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/topics')
      const data = await response.json()
      setTopics(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load topics',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchTopics()
  }, [])

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let selectedCategory = category
    if (newCategory.trim() !== '') {
      // Create new category/topic
      const createCategoryResponse = await fetch('http://localhost:5000/api/topics/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin-token')}`,
        },
        body: JSON.stringify({ name: newCategory }),
      })

      if (!createCategoryResponse.ok) {
        toast({
          title: 'Error',
          description: 'Failed to create new category',
          variant: 'destructive',
        })
        setLoading(false)
        return
      }

      const categoryData = await createCategoryResponse.json()
      selectedCategory = categoryData.id
    }

    // Store test information in session storage to pass to next page
    sessionStorage.setItem('test', JSON.stringify({ title, description, status, difficulty, category: selectedCategory }))

    // Go to the next page to add questions
    router.push('/admin/tests/new/questions')
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Create New Test</h1>

      <form onSubmit={handleNext} className="space-y-6">
        {/* Test Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Test Title
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2"
            disabled={loading}
          />
        </div>

        {/* Test Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Test Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-2"
            disabled={loading}
          />
        </div>

        {/* Test Difficulty */}
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Difficulty Level
          </label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Test Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Test Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic.id} value={topic.id}>
                  {topic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Option to create a new category */}
          <div className="mt-4">
            <label htmlFor="newCategory" className="block text-sm font-medium text-gray-700">
              Or create a new category
            </label>
            <Input
              id="newCategory"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category"
              className="mt-2"
              disabled={loading}
            />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? 'Creating Test...' : 'Next: Add Questions'}
        </Button>
      </form>
    </div>
  )
}
