"use client"

import { useState, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

interface UploadZoneProps {
  onFileAccepted: (file: File) => void
  isProcessing: boolean
}

export function UploadZone({ onFileAccepted, isProcessing }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files?.[0]?.type === "application/pdf") {
      setSelectedFile(files[0])
    }
  }, [])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setSelectedFile(e.target.files[0])
      }
    },
    []
  )

  const handleClear = useCallback(() => {
    setSelectedFile(null)
    if (inputRef.current) inputRef.current.value = ""
  }, [])

  const handleAnalyze = useCallback(() => {
    if (selectedFile) onFileAccepted(selectedFile)
  }, [selectedFile, onFileAccepted])

  if (isProcessing) {
    return <ProcessingState />
  }

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Drop zone */}
      <div
        className={cn(
          "relative w-full max-w-xl cursor-pointer border border-dashed transition-all duration-200",
          "rounded-md px-8 py-12 text-center",
          isDragging
            ? "border-primary bg-primary/5"
            : selectedFile
              ? "border-[#3a3a3a] bg-card"
              : "border-[#222] bg-card hover:border-[#333]"
        )}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !selectedFile && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload CIM PDF"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileSelect}
          className="sr-only"
          aria-label="Select CIM PDF file"
        />

        {selectedFile ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl opacity-80" aria-hidden="true">
              {"\u{1F4C4}"}
            </span>
            <span className="text-[13px] text-primary">
              {selectedFile.name}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB &middot; PDF
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
              className="mt-2 text-[10px] tracking-[1.5px] text-[#444] transition-colors hover:text-foreground"
            >
              REMOVE FILE
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="text-3xl opacity-20" aria-hidden="true">
              {"\u2B06"}
            </span>
            <span className="text-[13px] text-muted-foreground">
              Drop CIM PDF here or click to browse
            </span>
            <span className="text-[11px] text-[#333]">
              PDF format &middot; Max 32MB recommended
            </span>
          </div>
        )}
      </div>

      {/* Analyze button */}
      {selectedFile && (
        <button
          onClick={handleAnalyze}
          className={cn(
            "w-full max-w-xl py-4 text-[12px] font-medium tracking-[2px] transition-all",
            "rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          RUN DILIGENCE ANALYSIS
        </button>
      )}
    </div>
  )
}

function ProcessingState() {
  const stages = [
    "Ingesting CIM document",
    "Parsing financial disclosures",
    "Identifying risk vectors",
    "Formulating management questions",
    "Compiling investment memo",
  ]

  return (
    <div className="flex flex-col items-center gap-8 py-20 animate-fade-in">
      {/* Spinner */}
      <div className="h-5 w-5 rounded-full border-2 border-[#333] border-t-primary animate-spin" />

      <div className="flex flex-col items-center gap-3">
        <p className="text-[13px] text-foreground">Running analysis...</p>
        <div className="flex flex-col items-center gap-2">
          {stages.map((stage, i) => (
            <span
              key={stage}
              className="text-[11px] tracking-[1px] text-[#444]"
              style={{
                animationDelay: `${i * 1.5}s`,
              }}
            >
              {stage}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
