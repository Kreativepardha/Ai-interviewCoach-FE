'use client'

import { useEffect, useState } from 'react'
import { fetchQuestions, regenerateQuestion } from '@/features/interview/api'
import { InterviewQuestion } from '@/features/interview/types'
import { QuestionCard } from '@/components/question-card'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardPage() {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchQuestions()
        setQuestions(data)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  const handleRegenerate = async (id: string) => {
    setLoading(true)
    try {
      const updated = await regenerateQuestion(id)
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? updated : q))
      )
    } catch (err) {
      alert('Error regenerating question')
    } finally {
      setLoading(false)
    }
  }

 return (
  <div className="max-w-4xl mx-auto mt-10">
    <h1 className="text-2xl font-bold mb-6">📋 Interview Questions</h1>

    {loading ? (
      <div className="space-y-4">
        {[...Array(3)].map((_, idx) => (
          <Skeleton key={idx} className="h-32 w-full rounded-md" />
        ))}
      </div>
    ) : questions.length > 0 ? (
      questions.map((item) => (
        <QuestionCard key={item.id} item={item} onRegenerate={handleRegenerate} />
      ))
    ) : (
      <p>No questions generated yet.</p>
    )}
  </div>
)
}