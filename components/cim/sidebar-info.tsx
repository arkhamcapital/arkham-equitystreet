"use client"

import type { AnalysisResult } from "@/lib/mock-analysis"

interface SidebarInfoProps {
  data: AnalysisResult
}

export function SidebarInfo({ data }: SidebarInfoProps) {
  return (
    <div className="flex flex-col gap-4 border border-border bg-card p-6 rounded-md">
      <span className="text-[10px] tracking-[2px] text-primary">
        DEAL OVERVIEW
      </span>
      <div className="flex flex-col gap-3">
        <InfoRow label="Sponsor" value={data.sponsor} />
        <InfoRow label="HQ" value={data.headquarters} />
        <InfoRow label="Employees" value={data.employees} />
        <InfoRow label="Founded" value={data.founded} />
        <InfoRow label="Website" value={data.website} />
        <InfoRow label="CIM Pages" value={`${data.cimPages} pages`} />
        <InfoRow label="Analysis Time" value={data.analysisTime} />
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-[#555]">{label}</span>
      <span className="text-[12px] text-foreground">{value}</span>
    </div>
  )
}
