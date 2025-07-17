'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import React, { useState } from "react"


export default function UploadPage() {
    const [resume, setResume] = useState<File | null>(null)
    const [jobDesc, setJobDesc] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(file && file.type === 'application/pdf') {
            setResume(file)
        } else {
            alert('Please Upload A Valid PDF file')
        }

    }

    const handleSubmit = async() => {
        if(!resume || !jobDesc) {
            alert('Please upload Resume and eneter Job Description')
            return
        }
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('resume', resume)

            const uploadRes = await fetch('/api/interview/upload', {
                method: 'POST',
                body: formData,
            })

            if(!uploadRes.ok) throw new Error ('Resume Upload Failed!')

                const jdRes = await fetch('/api/interview/jd', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ jobdescritpiton: jobDesc })
                })

                if(!jdRes.ok) throw new Error('Job Description upload Failed')

                    router.push('/dashboard')
        } catch (err: any) {
            alert(`Error: ${err.message}`)
        } finally {
            setLoading(false)
        }

    }

     return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Resume & Job Description</h2>

      <div className="mb-4">
        <label className="font-medium">Resume (PDF only)</label>
        <Input type="file" accept="application/pdf" onChange={handleResumeChange} />
      </div>

      <div className="mb-4">
        <label className="font-medium">Job Description</label>
        <Textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          rows={6}
          placeholder="Paste the JD here..."
        />
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Uploading...' : 'Submit & Continue'}
      </Button>
    </div>
  )
}
