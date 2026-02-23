"use client"

import { useState, useCallback } from "react"
import { AppHeader } from "@/components/cim/header"
import { UploadZone } from "@/components/cim/upload-zone"
import { DealHeader } from "@/components/cim/deal-header"
import { AnalysisTabs } from "@/components/cim/analysis-tabs"
import { DecisionPanel } from "@/components/cim/decision-panel"
import { SidebarInfo } from "@/components/cim/sidebar-info"
import { RecentDeals } from "@/components/cim/recent-deals"
import type { AnalysisResult } from "@/lib/mock-analysis"

type AppState = "upload" | "processing" | "analysis" | "error"

export default function CIMAnalyzer() {
  const [state, setState] = useState<AppState>("upload")
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)

  const handleFileAccepted = useCallback(async (file: File) => {
    setState("processing")

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const err = await response.json()
        console.error('API error:', err)
        setState("error")
        return
      }

      const memo = await response.json()
      setAnalysisData(memo)
      setState("analysis")
    } catch (error) {
      console.error('Fetch error:', error)
      setState("error")
    }
  }, [])

  const handleReset = useCallback(() => {
    setState("upload")
    setAnalysisData(null)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />

      {state === "upload" && <UploadView onFileAccepted={handleFileAccepted} />}
      {state === "processing" && <ProcessingView onFileAccepted={handleFileAccepted} />}
      {state === "error" && <ErrorView onReset={handleReset} />}
      {state === "analysis" && analysisData && (
        <AnalysisView data={analysisData} onReset={handleReset} />
      )}
    </div>
  )
}

/* ─── Upload ─── */
function UploadView({
  onFileAccepted,
}: {
  onFileAccepted: (file: File) => void
}) {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-16">
      <div className="w-full max-w-xl">
        <div className="mb-10 animate-fade-in">
          <div className="mb-3 text-[11px] tracking-[3px] text-primary">
            STEP 01 &middot; DOCUMENT INTAKE
          </div>
          <h1 className="mb-3 text-[32px] font-sans font-normal text-foreground leading-tight">
            CIM Analysis Engine
          </h1>
          <p className="text-[13px] font-sans italic leading-7 text-muted-foreground">
            Upload a Confidential Information Memorandum. Receive an investment
            memo, prioritized risk flags, and pointed management questions
            — in under 60 seconds.
          </p>
        </div>

        <UploadZone onFileAccepted={onFileAccepted} isProcessing={false} />

        <div className="mt-6 border border-border bg-card p-4 rounded-md animate-fade-in">
          <span className="text-[10px] tracking-[1.5px] text-[#666]">
            HUMAN OVERSIGHT REQUIRED &middot;{" "}
          </span>
          <span className="text-[11px] font-sans italic leading-6 text-[#444]">
            This system produces first-pass analytical support. Investment
            decisions, LP commitments, and LOI authorization must remain with the
            investment committee. AI output is advisory only and does not
            constitute a recommendation to invest.
          </span>
        </div>

        <div className="mt-10">
          <RecentDeals />
        </div>
      </div>
    </main>
  )
}

/* ─── Processing ─── */
function ProcessingView({
  onFileAccepted,
}: {
  onFileAccepted: (file: File) => void
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <UploadZone onFileAccepted={onFileAccepted} isProcessing={true} />
    </main>
  )
}

/* ─── Error ─── */
function ErrorView({ onReset }: { onReset: () => void }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 gap-4">
      <div className="text-[11px] tracking-[2px] text-red-500">ANALYSIS FAILED</div>
      <p className="text-[13px] text-muted-foreground text-center max-w-sm">
        The AI could not process this document. Check your terminal for error details,
        then try again with a different PDF.
      </p>
      <button
        onClick={onReset}
        className="mt-2 border border-border bg-card px-4 py-2 text-[11px] tracking-[1.5px] hover:bg-accent rounded-sm"
      >
        ← TRY AGAIN
      </button>
    </main>
  )
}

/* ─── Analysis ─── */
function AnalysisView({
  data,
  onReset,
}: {
  data: AnalysisResult
  onReset: () => void
}) {
  return (
    <main className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-border px-8 py-3">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-[11px] tracking-[1.5px] text-[#444] transition-colors hover:text-foreground"
        >
          {"\u2190"} NEW ANALYSIS
        </button>
        <div className="flex items-center gap-3">
          <button className="border border-border bg-card px-3 py-1.5 text-[10px] tracking-[1.5px] text-[#555] transition-colors hover:bg-accent hover:text-foreground rounded-sm">
            SHARE
          </button>
          <button className="border border-border bg-card px-3 py-1.5 text-[10px] tracking-[1.5px] text-[#555] transition-colors hover:bg-accent hover:text-foreground rounded-sm">
            EXPORT PDF
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 px-8 py-6">
        <div className="flex flex-1 flex-col gap-6 min-w-0">
          <DealHeader data={data} />
          <AnalysisTabs data={data} />
        </div>

        <div className="hidden w-80 shrink-0 flex-col gap-4 lg:flex">
          <DecisionPanel />
          <SidebarInfo data={data} />
        </div>
      </div>

      <div className="border-t border-border p-6 lg:hidden">
        <DecisionPanel />
      </div>
    </main>
  )
}