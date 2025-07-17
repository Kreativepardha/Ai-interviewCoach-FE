'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'

type Props = {
  userId: string
}

export function ResumeJDViewer({ userId }: Props) {
  const [resume, setResume] = useState('')
  const [jd, setJD] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/interview/latest/${userId}`)
      .then(res => res.json())
      .then(data => {
        setResume(data.resumeText || '')
        setJD(data.jobDescriptionText || '')
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) return <p>Loading resume and job description...</p>
  if (!resume && !jd) return <p>No resume or JD uploaded yet.</p>

  return (
    <Tabs defaultValue="resume" className="w-full mb-6">
      <TabsList>
        <TabsTrigger value="resume">Resume</TabsTrigger>
        <TabsTrigger value="jd">Job Description</TabsTrigger>
      </TabsList>
      <TabsContent value="resume">
        <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap text-sm max-h-96 overflow-auto">
          {resume}
        </div>
      </TabsContent>
      <TabsContent value="jd">
        <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap text-sm max-h-96 overflow-auto">
          {jd}
        </div>
      </TabsContent>
    </Tabs>
  )
}
