'use client'

import { Button } from '@/components/ui/button'
import { InterviewQuestion } from '@/features/interview/types'

interface Props {
  item: InterviewQuestion
  onRegenerate: (id: string) => void
}

export function QuestionCard({ item, onRegenerate }: Props) {
  return (
    <div className="border p-4 rounded-md shadow-sm mb-4">
      <h3 className="font-semibold text-lg">{item.question}</h3>
      <p className="mt-2 text-gray-700">{item.answer}</p>
      <Button variant="outline" className="mt-4" onClick={() => onRegenerate(item.id)}>
        🔄 Regenerate
      </Button>
    </div>
  )
}
