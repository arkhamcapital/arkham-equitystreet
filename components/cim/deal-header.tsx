"use client"

import type { AnalysisResult } from "@/lib/mock-analysis"

interface DealHeaderProps {
  data: AnalysisResult
}

export function DealHeader({ data }: DealHeaderProps) {
  const highRiskCount = data.risks.filter((r) => r.severity === "high").length
  const questionCount =
    data.memo.keyConcerns.length + data.memo.growthDrivers.length

  return (
    <div className="border-b border-border pb-6 animate-fade-in">
      {/* Date line */}
      <div className="mb-2 text-[10px] tracking-[3px] text-primary">
        ANALYSIS COMPLETE &middot;{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).toUpperCase()}
      </div>

      {/* Company name */}
      <h2 className="mb-1 text-[28px] font-bold font-sans text-foreground leading-tight">
        {data.companyName}
      </h2>
      <div className="text-[12px] tracking-[1.5px] text-muted-foreground">
        {data.industry.toUpperCase()}
      </div>

      {/* Stat badges */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {highRiskCount > 0 && (
          <span className="rounded-sm border border-risk-high-border/30 bg-risk-high-bg px-3 py-1.5 text-[10px] tracking-[1.5px] text-risk-high-text">
            {highRiskCount} HIGH RISK FLAG{highRiskCount > 1 ? "S" : ""}
          </span>
        )}
        <span className="rounded-sm border border-border bg-secondary px-3 py-1.5 text-[10px] tracking-[1.5px] text-muted-foreground">
          {questionCount} DILIGENCE POINTS
        </span>

        {/* Key metrics inline */}
        <div className="ml-auto hidden items-center gap-4 sm:flex">
          <MetricPill label="EV" value={data.enterpriseValue} />
          <MetricPill label="Revenue" value={data.revenue} />
          <MetricPill label="EBITDA" value={data.ebitda} />
          <MetricPill label="EV/EBITDA" value={data.evEbitdaMultiple} />
        </div>
      </div>

      {/* Mobile metrics */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:hidden">
        <MetricCard label="Enterprise Value" value={data.enterpriseValue} />
        <MetricCard label="Revenue" value={data.revenue} />
        <MetricCard label="EBITDA" value={data.ebitda} />
        <MetricCard label="EV / EBITDA" value={data.evEbitdaMultiple} />
      </div>
    </div>
  )
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-[9px] tracking-[1px] text-[#444]">{label}</span>
      <span className="text-[13px] font-medium text-foreground">{value}</span>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-sm border border-border bg-secondary p-3">
      <span className="text-[9px] tracking-[1.5px] text-muted-foreground">
        {label.toUpperCase()}
      </span>
      <span className="text-lg font-medium text-foreground">{value}</span>
    </div>
  )
}
