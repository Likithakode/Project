// app/admin/tests/new/questions.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

export default function AdminAddQuestionsPage() {
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    difficulty: 'Easy',
    points: 0,
    detailedDescription: '',
    examples: [{ input: '', output: '', explanation: '' }],
    constraints: [''],
  })
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion])
    setNewQuestion({
      title: '',
      description: '',
      difficulty: 'Easy',
      points: 0,
      detailedDescription: '',
      examples: [{ input: '', output: '', explanation: '' }],
      constraints: [''],
    }) // Reset new question form
  }

  const handleSubmit = async () => {
    setLoading(true)
    const testData = JSON.parse(sessionStorage.getItem('test') || '{}')

    const newTest = {
      ...testData,
    }

    const questionss = {
      ...questions
    }

    try {
      const response = await fetch('http://localhost:5000/api/tests/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin-token')}`,
        },
        body: JSON.stringify(newTest),
      })

      const response1 = await fetch('http://localhost:5000/api/questions/admin/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin-token')}`,
        },
        body: JSON.stringify(questionss),
      })





      if (!response.ok && !response1.ok) {
        throw new Error('Failed to create test with questions')
      }

      toast({
        title: 'Success',
        description: 'Test and questions created successfully',
      })

      router.push('/admin/tests')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create test and questions',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Add Questions</h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Question Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Question Title
          </label>
          <Input
            id="title"
            type="text"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
            required
            className="mt-2"
            disabled={loading}
          />
        </div>

        {/* Question Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            value={newQuestion.description}
            onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
            required
            className="mt-2"
            disabled={loading}
          />
        </div>

        {/* Question Difficulty */}
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Difficulty
          </label>
          <select
            id="difficulty"
            value={newQuestion.difficulty}
            onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
            className="mt-2"
            disabled={loading}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Question Points */}
        <div>
          <label htmlFor="points" className="block text-sm font-medium text-gray-700">
            Points
          </label>
          <Input
            id="points"
            type="number"
            value={newQuestion.points}
            onChange={(e) => setNewQuestion({ ...newQuestion, points: +e.target.value })}
            required
            className="mt-2"
            disabled={loading}
          />
        </div>

        {/* Question Examples */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Examples</label>
          <div className="space-y-4">
            {newQuestion.examples.map((example, index) => (
              <div key={index}>
                <label htmlFor={`example-${index}`} className="block text-sm text-gray-700">
                  Example {index + 1}
                </label>
                <Input
                  type="text"
                  value={example.input}
                  onChange={(e) => {
                    const updatedExamples = [...newQuestion.examples]
                    updatedExamples[index].input = e.target.value
                    setNewQuestion({ ...newQuestion, examples: updatedExamples })
                  }}
                  placeholder="Input"
                  className="mt-2"
                  disabled={loading}
                />
                <Input
                  type="text"
                  value={example.output}
                  onChange={(e) => {
                    const updatedExamples = [...newQuestion.examples]
                    updatedExamples[index].output = e.target.value
                    setNewQuestion({ ...newQuestion, examples: updatedExamples })
                  }}
                  placeholder="Output"
                  className="mt-2"
                  disabled={loading}
                />
                <Textarea
                  value={example.explanation}
                  onChange={(e) => {
                    const updatedExamples = [...newQuestion.examples]
                    updatedExamples[index].explanation = e.target.value
                    setNewQuestion({ ...newQuestion, examples: updatedExamples })
                  }}
                  placeholder="Explanation"
                  className="mt-2"
                  disabled={loading}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add Question */}
        <Button type="button" onClick={handleAddQuestion} className="w-full sm:w-auto" disabled={loading}>
          Add Question
        </Button>
        <Button type="button" onClick={handleSubmit} className="w-full sm:w-auto" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Test'}
        </Button>
      </form>
    </div>
  )
}
