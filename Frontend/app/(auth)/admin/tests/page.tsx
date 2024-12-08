'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

interface Test {
  id: string
  name: string
  description: string
  createdAt: string
  questionCount: number
}

export default function AdminTestsPage() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tests', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin-token')}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch tests')
        }

        const data = await response.json()
        setTests(data)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load tests',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTests()
  }, [toast])

  const deleteTest = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tests/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin-token')}`,
        },
      })

      if (response.ok) {
        setTests((prevTests) => prevTests.filter((test) => test.id !== id))
        toast({
          title: 'Success',
          description: 'Test deleted successfully',
        })
      } else {
        throw new Error('Failed to delete test')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete test',
        variant: 'destructive',
      })
    }
  }

  const logout = () => {
    // Clear the authentication token
    localStorage.removeItem('admin-token')

    // Redirect to the root directory
    router.push('http://localhost:3000/')
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Tests</h1>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/admin/tests/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Test
            </Link>
          </Button>
          <Button variant="ghost" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        {loading ? (
          <p className="p-4 text-center">Loading tests...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Questions Count</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{test.description}</TableCell>
                  <TableCell>{test.questionCount}</TableCell>
                  <TableCell>{new Date(test.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        router.push(`/admin/tests/${test.id}/edit`)
                      }
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTest(test.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
