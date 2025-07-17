import { InterviewQuestion } from './types'

export async function fetchQuestions(): Promise<InterviewQuestion[]> {
  const res = await fetch('/api/interview/questions')
  if (!res.ok) throw new Error('Failed to fetch questions')
  return res.json()
}

export async function regenerateQuestion(id: string): Promise<InterviewQuestion> {
  const res = await fetch(`/api/interview/regenerate/${id}`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to regenerate')
  return res.json()
}
