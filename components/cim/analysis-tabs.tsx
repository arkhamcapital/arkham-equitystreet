"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { AnalysisResult } from "@/lib/mock-analysis"

interface AnalysisTabsProps {
  data: AnalysisResult
}

type TabId = "memo" | "risks" | "financials" | "thesis"

const tabs: { id: TabId; label: string }[] = [
  { id: "memo", label: "INVESTMENT MEMO" },
  { id: "risks", label: "RISK FLAGS" },
  { id: "financials", label: "FINANCIALS" },
  { id: "thesis", label: "INVESTMENT THESIS" },
]

export function AnalysisTabs({ data }: AnalysisTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("memo")

  const riskCount = data.risks.length
  const tabCounts: Record<TabId, number | null> = {
    memo: null,
    risks: riskCount,
    financials: null,
    thesis: null,
  }

  return (
    <div className="flex flex-1 flex-col animate-fade-in">
      {/* Tab bar */}
      <div className="flex gap-0 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-[10px] tracking-[1.5px] transition-all ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {tabCounts[tab.id] !== null && (
              <span
                className={`rounded-sm px-1.5 py-px text-[9px] ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-foreground"
                }`}
              >
                {tabCounts[tab.id]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === "memo" && <MemoTab data={data} />}
        {activeTab === "risks" && <RisksTab data={data} />}
        {activeTab === "financials" && <FinancialsTab data={data} />}
        {activeTab === "thesis" && <ThesisTab data={data} />}
      </div>
    </div>
  )
}

/* ─── Memo ─── */
function MemoTab({ data }: { data: AnalysisResult }) {
  return (
    <ScrollArea className="h-[calc(100vh-400px)]">
      <div className="flex flex-col gap-0 pr-4">
        <MemoSection title="Executive Summary" content={data.memo.executiveSummary} />
        <SectionDivider />
        <MemoSection title="Business Overview" content={data.memo.businessOverview} />
        <SectionDivider />

        <div className="mb-6">
          <SectionLabel>Growth Drivers</SectionLabel>
          <ul className="flex flex-col gap-2">
            {data.memo.growthDrivers.map((driver, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                <span className="text-[13.5px] font-sans leading-7 text-foreground">
                  {driver}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <SectionDivider />

        <div className="mb-6">
          <SectionLabel>Key Concerns</SectionLabel>
          <div className="rounded-md border border-border bg-card p-5">
            <ul className="flex flex-col gap-2">
              {data.memo.keyConcerns.map((concern, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  <span className="text-[13.5px] font-sans leading-7 text-foreground">
                    {concern}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SectionDivider />

        <MemoSection
          title="Preliminary Recommendation"
          content={data.memo.recommendation}
        />
      </div>
    </ScrollArea>
  )
}

/* ─── Risks ─── */
function RisksTab({ data }: { data: AnalysisResult }) {
  return (
    <ScrollArea className="h-[calc(100vh-400px)]">
      <div className="flex flex-col gap-2 pr-4">
        <p className="mb-4 text-[12px] font-sans italic leading-6 text-foreground">
          Flags ordered by severity. Click any flag to expand the full analysis.
        </p>
        {data.risks.map((risk, i) => (
          <RiskFlag key={i} risk={risk} />
        ))}
      </div>
    </ScrollArea>
  )
}

function RiskFlag({
  risk,
}: {
  risk: AnalysisResult["risks"][number]
}) {
  const [open, setOpen] = useState(false)

  const severityMap = {
    high: {
      bg: "bg-risk-high-bg",
      border: "border-risk-high-border",
      text: "text-risk-high-text",
      dot: "bg-destructive",
      label: "HIGH",
    },
    medium: {
      bg: "bg-risk-med-bg",
      border: "border-risk-med-border",
      text: "text-risk-med-text",
      dot: "bg-warning",
      label: "MEDIUM",
    },
    low: {
      bg: "bg-risk-low-bg",
      border: "border-risk-low-border",
      text: "text-risk-low-text",
      dot: "bg-success",
      label: "LOW",
    },
  }

  const s = severityMap[risk.severity]

  return (
    <button
      onClick={() => setOpen(!open)}
      className={`w-full text-left rounded-md border ${s.border} ${s.bg} p-3 transition-all`}
    >
      {/* Top row */}
      <div className="flex items-center gap-2.5">
        <span className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
        <span className={`text-[10px] font-medium tracking-[1.5px] ${s.text}`}>
          {s.label}
        </span>
        <span className="text-[11px] text-foreground mr-auto">{risk.title}</span>
        <span className="text-[12px] text-foreground">{open ? "\u25B2" : "\u25BC"}</span>
      </div>

      {/* Description */}
      <p className="mt-2 text-[13px] font-sans leading-6 text-foreground">
        {risk.description}
      </p>

      {/* Expanded: mitigation */}
      {open && (
        <div className={`mt-2.5 border-t ${s.border}/20 pt-2.5`}>
          <span className="text-[10px] tracking-[1.5px] text-muted-foreground">
            MITIGATION
          </span>
          <p className="mt-1 text-[12.5px] font-sans leading-7 text-foreground">
            {risk.mitigation}
          </p>
        </div>
      )}
    </button>
  )
}

/* ─── Financials ─── */
function FinancialsTab({ data }: { data: AnalysisResult }) {
  return (
    <ScrollArea className="h-[calc(100vh-400px)]">
      <div className="flex flex-col gap-6 pr-4">
        {/* Table */}
        <div className="overflow-hidden rounded-md border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-4 py-2.5 text-left text-[10px] font-medium tracking-[1.5px] text-muted-foreground">
                  METRIC
                </th>
                {data.financials.years.map((year) => (
                  <th
                    key={year}
                    className="px-4 py-2.5 text-right text-[10px] font-medium tracking-[1.5px] text-muted-foreground"
                  >
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.financials.rows.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-border/50 ${
                    row.isHighlight ? "bg-primary/5" : ""
                  }`}
                >
                  <td
                    className={`px-4 py-2.5 text-[13px] font-sans text-foreground ${
                      row.isHighlight ? "font-bold" : ""
                    }`}
                  >
                    {row.label}
                  </td>
                  {row.values.map((val, j) => (
                    <td
                      key={j}
                      className={`px-4 py-2.5 text-right text-[13px] ${
                        row.isHighlight
                          ? "font-bold text-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.financials.insights.map((insight, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 border-l-2 border-primary pl-4"
            >
              <span className="text-[10px] tracking-[1.5px] text-primary">
                {insight.label.toUpperCase()}
              </span>
              <span className="text-2xl font-bold text-foreground">
                {insight.value}
              </span>
              <span className="text-[12px] font-sans leading-5 text-foreground">
                {insight.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}

/* ─── Thesis ─── */
function ThesisTab({ data }: { data: AnalysisResult }) {
  return (
    <ScrollArea className="h-[calc(100vh-400px)]">
      <div className="flex flex-col gap-0 pr-4">
        {/* Bull case */}
        <div className="mb-6">
          <SectionLabel>Bull Case</SectionLabel>
          <div className="flex flex-col gap-2">
            {data.thesis.bullCase.map((point, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                <span className="text-[13.5px] font-sans leading-7 text-foreground">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
        <SectionDivider />

        {/* Bear case */}
        <div className="mb-6">
          <SectionLabel>Bear Case</SectionLabel>
          <div className="flex flex-col gap-2">
            {data.thesis.bearCase.map((point, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                <span className="text-[13.5px] font-sans leading-7 text-foreground">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
        <SectionDivider />

        {/* Base case */}
        <div className="mb-6">
          <SectionLabel>Base Case</SectionLabel>
          <div className="rounded-md border border-border bg-card p-5">
            <p className="text-[13.5px] font-sans leading-8 text-foreground">
              {data.thesis.baseCase}
            </p>
          </div>
        </div>
        <SectionDivider />

        {/* Comparable Transactions */}
        <div className="mb-6">
          <SectionLabel>Comparable Transactions</SectionLabel>
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary">
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium tracking-[1.5px] text-muted-foreground">
                    COMPANY
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-medium tracking-[1.5px] text-muted-foreground">
                    EV / EBITDA
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-medium tracking-[1.5px] text-muted-foreground">
                    EV / REVENUE
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-medium tracking-[1.5px] text-muted-foreground">
                    YEAR
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.thesis.comps.map((comp, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="px-4 py-2.5 text-[13px] font-sans text-foreground">
                      {comp.name}
                    </td>
                    <td className="px-4 py-2.5 text-right text-[13px] text-foreground">
                      {comp.evEbitda}
                    </td>
                    <td className="px-4 py-2.5 text-right text-[13px] text-foreground">
                      {comp.evRevenue}
                    </td>
                    <td className="px-4 py-2.5 text-right text-[13px] text-foreground">
                      {comp.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

/* ─── Shared ─── */
function MemoSection({
  title,
  content,
}: {
  title: string
  content: string
}) {
  return (
    <div className="mb-6">
      <SectionLabel>{title}</SectionLabel>
      <p className="text-[13.5px] font-sans leading-8 text-foreground">{content}</p>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-[10px] tracking-[2px] text-primary uppercase">
      {children}
    </div>
  )
}

function SectionDivider() {
  return <div className="mb-6 border-t border-[#141414]" />
}
