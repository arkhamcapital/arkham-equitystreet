"use client"

import { useRef, useState, type FormEvent } from 'react'
import { type CimMemo } from '@/lib/types'

type Props = {
  isProcessing: boolean
  onStartProcessing: () => void
  onMemoReady: (memo: CimMemo) => void
  onError: () => void
}

export function CimUploadForm({
  isProcessing,
  onStartProcessing,
  onMemoReady,
  onError,
}: Props) {
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const file = fileInputRef.current?.files?.[0]

    if (!file) {
      return
    }

    onStartProcessing()

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const memo = await response.json()
      onMemoReady(memo)
    } catch (error) {
      console.error(error)
      onError()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-3 rounded-md border border-dashed border-border bg-muted/40 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-[0.18em] uppercase">
              CIM PDF
            </p>
            <p className="text-[11px] text-muted-foreground">
              Drop a Confidential Information Memorandum and we&apos;ll draft a
              clean investment memo for partner review.
            </p>
          </div>
          <button
            type="button"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase hover:bg-accent"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
          >
            Choose file
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            setFileName(file ? file.name : null)
          }}
        />

        <p className="text-[11px] text-muted-foreground">
          {fileName ? (
            <>
              Selected:&nbsp;
              <span className="font-medium text-foreground">{fileName}</span>
            </>
          ) : (
            <>No file selected yet.</>
          )}
        </p>
      </div>

      <button
        type="submit"
        disabled={isProcessing || !fileName}
        className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-60"
      >
        {isProcessing ? 'Processing CIM…' : 'Generate AI memo'}
      </button>
    </form>
  )
}