"use client"

import type { AnalysisResult } from "@/lib/mock-analysis"

/** Hex colors only - html2canvas does not support CSS lab() from Tailwind v4 */
const pdfColors = {
  white: "#ffffff",
  black: "#111111",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray900: "#111827",
  blue600: "#2563eb",
  blue50: "#eff6ff",
  red50: "#fef2f2",
  red200: "#fecaca",
  red500: "#ef4444",
  red700: "#b91c1c",
  amber50: "#fffbeb",
  amber200: "#fde68a",
  amber500: "#f59e0b",
  amber700: "#b45309",
  emerald50: "#ecfdf5",
  emerald200: "#a7f3d0",
  emerald500: "#10b981",
  emerald700: "#047857",
} as const

/** Full report layout used only for PDF capture (hidden in DOM). All colors inline to avoid lab(). */
export function ReportForPdf({ data }: { data: AnalysisResult }) {
  const highRiskCount = data.risks.filter((r) => r.severity === "high").length
  const questionCount =
    data.memo.keyConcerns.length + data.memo.growthDrivers.length
  const severityMap = {
    high: { bg: pdfColors.red50, border: pdfColors.red200, text: pdfColors.red700, dot: pdfColors.red500 },
    medium: { bg: pdfColors.amber50, border: pdfColors.amber200, text: pdfColors.amber700, dot: pdfColors.amber500 },
    low: { bg: pdfColors.emerald50, border: pdfColors.emerald200, text: pdfColors.emerald700, dot: pdfColors.emerald500 },
  }

  return (
    <div
      className="w-[800px] p-10 font-sans"
      style={{
        backgroundColor: pdfColors.white,
        color: pdfColors.black,
        colorScheme: "light",
      }}
    >
      {/* Deal header */}
      <div
        className="border-b pb-6 mb-6"
        style={{ borderColor: pdfColors.gray300 }}
      >
        <div
          className="mb-2 text-[10px] tracking-[3px]"
          style={{ color: pdfColors.blue600 }}
        >
          ANALYSIS COMPLETE · {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }).toUpperCase()}
        </div>
        <h2 className="mb-1 text-[28px] font-bold leading-tight" style={{ color: pdfColors.gray900 }}>
          {data.companyName}
        </h2>
        <div className="text-[12px] tracking-[1.5px]" style={{ color: pdfColors.gray500 }}>
          {data.industry.toUpperCase()}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {highRiskCount > 0 && (
            <span
              className="rounded-sm border px-3 py-1.5 text-[10px] tracking-[1.5px]"
              style={{ borderColor: pdfColors.red200, backgroundColor: pdfColors.red50, color: pdfColors.red700 }}
            >
              {highRiskCount} HIGH RISK FLAG{highRiskCount > 1 ? "S" : ""}
            </span>
          )}
          <span
            className="rounded-sm border px-3 py-1.5 text-[10px] tracking-[1.5px]"
            style={{ borderColor: pdfColors.gray300, backgroundColor: pdfColors.gray100, color: pdfColors.gray600 }}
          >
            {questionCount} DILIGENCE POINTS
          </span>
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-[9px]" style={{ color: pdfColors.gray500 }}>EV</span>
            <span className="text-[13px] font-medium" style={{ color: pdfColors.gray900 }}>{data.enterpriseValue}</span>
            <span className="text-[9px]" style={{ color: pdfColors.gray500 }}>Revenue</span>
            <span className="text-[13px] font-medium" style={{ color: pdfColors.gray900 }}>{data.revenue}</span>
            <span className="text-[9px]" style={{ color: pdfColors.gray500 }}>EBITDA</span>
            <span className="text-[13px] font-medium" style={{ color: pdfColors.gray900 }}>{data.ebitda}</span>
            <span className="text-[9px]" style={{ color: pdfColors.gray500 }}>EV/EBITDA</span>
            <span className="text-[13px] font-medium" style={{ color: pdfColors.gray900 }}>{data.evEbitdaMultiple}</span>
          </div>
        </div>
      </div>

      {/* Investment Memo */}
      <SectionLabel>INVESTMENT MEMO</SectionLabel>
      <MemoSection title="Executive Summary" content={data.memo.executiveSummary} />
      <SectionDivider />
      <MemoSection title="Business Overview" content={data.memo.businessOverview} />
      <SectionDivider />
      <div className="mb-6">
        <SectionLabel>Growth Drivers</SectionLabel>
        <ul className="flex flex-col gap-2">
          {data.memo.growthDrivers.map((driver, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: pdfColors.emerald500 }}
              />
              <span className="text-[13.5px] leading-7" style={{ color: pdfColors.gray900 }}>{driver}</span>
            </li>
          ))}
        </ul>
      </div>
      <SectionDivider />
      <div className="mb-6">
        <SectionLabel>Key Concerns</SectionLabel>
        <div
          className="rounded-md border p-5"
          style={{ borderColor: pdfColors.gray300, backgroundColor: pdfColors.gray50 }}
        >
          <ul className="flex flex-col gap-2">
            {data.memo.keyConcerns.map((concern, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: pdfColors.red500 }}
                />
                <span className="text-[13.5px] leading-7" style={{ color: pdfColors.gray900 }}>{concern}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <SectionDivider />
      <MemoSection title="Preliminary Recommendation" content={data.memo.recommendation} />
      <SectionDivider />

      {/* Risk Flags */}
      <SectionLabel>RISK FLAGS</SectionLabel>
      <p className="mb-4 text-[12px] italic leading-6" style={{ color: pdfColors.gray600 }}>
        Flags ordered by severity.
      </p>
      <div className="flex flex-col gap-2 mb-6">
        {data.risks.map((risk, i) => {
          const s = severityMap[risk.severity]
          return (
            <div
              key={i}
              className="w-full text-left rounded-md border p-3"
              style={{ borderColor: s.border, backgroundColor: s.bg }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: s.dot }}
                />
                <span className="text-[10px] font-medium tracking-[1.5px]" style={{ color: s.text }}>
                  {risk.severity.toUpperCase()}
                </span>
                <span className="text-[11px] mr-auto" style={{ color: pdfColors.gray900 }}>{risk.title}</span>
              </div>
              <p className="mt-2 text-[13px] leading-6" style={{ color: pdfColors.gray900 }}>{risk.description}</p>
              <div className="mt-2.5 border-t pt-2.5" style={{ borderColor: pdfColors.gray200 }}>
                <span className="text-[10px] tracking-[1.5px]" style={{ color: pdfColors.gray500 }}>MITIGATION</span>
                <p className="mt-1 text-[12.5px] leading-7" style={{ color: pdfColors.gray900 }}>{risk.mitigation}</p>
              </div>
            </div>
          )
        })}
      </div>
      <SectionDivider />

      {/* Financials */}
      <SectionLabel>FINANCIALS</SectionLabel>
      <div
        className="overflow-hidden rounded-md border mb-6"
        style={{ borderColor: pdfColors.gray300 }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: pdfColors.gray300, backgroundColor: pdfColors.gray100 }}>
              <th className="px-4 py-2.5 text-left text-[10px] font-medium tracking-[1.5px]" style={{ color: pdfColors.gray500 }}>METRIC</th>
              {data.financials.years.map((year) => (
                <th key={year} className="px-4 py-2.5 text-right text-[10px] font-medium tracking-[1.5px]" style={{ color: pdfColors.gray500 }}>{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.financials.rows.map((row, i) => (
              <tr
                key={i}
                className="border-b"
                style={{
                  borderColor: pdfColors.gray200,
                  ...(row.isHighlight ? { backgroundColor: pdfColors.blue50 } : {}),
                }}
              >
                <td
                  className={`px-4 py-2.5 text-[13px] ${row.isHighlight ? "font-bold" : ""}`}
                  style={{ color: pdfColors.gray900 }}
                >
                  {row.label}
                </td>
                {row.values.map((val, j) => (
                  <td
                    key={j}
                    className={`px-4 py-2.5 text-right text-[13px] ${row.isHighlight ? "font-bold" : ""}`}
                    style={{ color: pdfColors.gray900 }}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {data.financials.insights.map((insight, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 border-l-2 pl-4"
            style={{ borderColor: pdfColors.blue600 }}
          >
            <span className="text-[10px] tracking-[1.5px]" style={{ color: pdfColors.blue600 }}>{insight.label.toUpperCase()}</span>
            <span className="text-2xl font-bold" style={{ color: pdfColors.gray900 }}>{insight.value}</span>
            <span className="text-[12px] leading-5" style={{ color: pdfColors.gray900 }}>{insight.note}</span>
          </div>
        ))}
      </div>
      <SectionDivider />

      {/* Investment Thesis */}
      <SectionLabel>INVESTMENT THESIS</SectionLabel>
      <div className="mb-6">
        <SectionLabel>Bull Case</SectionLabel>
        <div className="flex flex-col gap-2">
          {data.thesis.bullCase.map((point, i) => (
            <div key={i} className="flex items-start gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: pdfColors.emerald500 }}
              />
              <span className="text-[13.5px] leading-7" style={{ color: pdfColors.gray900 }}>{point}</span>
            </div>
          ))}
        </div>
      </div>
      <SectionDivider />
      <div className="mb-6">
        <SectionLabel>Bear Case</SectionLabel>
        <div className="flex flex-col gap-2">
          {data.thesis.bearCase.map((point, i) => (
            <div key={i} className="flex items-start gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: pdfColors.red500 }}
              />
              <span className="text-[13.5px] leading-7" style={{ color: pdfColors.gray900 }}>{point}</span>
            </div>
          ))}
        </div>
      </div>
      <SectionDivider />
      <div className="mb-6">
        <SectionLabel>Base Case</SectionLabel>
        <div
          className="rounded-md border p-5"
          style={{ borderColor: pdfColors.gray300, backgroundColor: pdfColors.gray50 }}
        >
          <p className="text-[13.5px] leading-8" style={{ color: pdfColors.gray900 }}>{data.thesis.baseCase}</p>
        </div>
      </div>
      <SectionDivider />
      <div className="mb-6">
        <SectionLabel>Comparable Transactions</SectionLabel>
        <div
          className="overflow-hidden rounded-md border"
          style={{ borderColor: pdfColors.gray300 }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: pdfColors.gray300, backgroundColor: pdfColors.gray100 }}>
                <th className="px-4 py-2.5 text-left text-[10px] font-medium tracking-[1.5px]" style={{ color: pdfColors.gray500 }}>COMPANY</th>
                <th className="px-4 py-2.5 text-right text-[10px] font-medium tracking-[1.5px]" style={{ color: pdfColors.gray500 }}>EV / EBITDA</th>
                <th className="px-4 py-2.5 text-right text-[10px] font-medium tracking-[1.5px]" style={{ color: pdfColors.gray500 }}>EV / REVENUE</th>
                <th className="px-4 py-2.5 text-right text-[10px] font-medium tracking-[1.5px]" style={{ color: pdfColors.gray500 }}>YEAR</th>
              </tr>
            </thead>
            <tbody>
              {data.thesis.comps.map((comp, i) => (
                <tr key={i} className="border-b" style={{ borderColor: pdfColors.gray200 }}>
                  <td className="px-4 py-2.5 text-[13px]" style={{ color: pdfColors.gray900 }}>{comp.name}</td>
                  <td className="px-4 py-2.5 text-right text-[13px]" style={{ color: pdfColors.gray900 }}>{comp.evEbitda}</td>
                  <td className="px-4 py-2.5 text-right text-[13px]" style={{ color: pdfColors.gray900 }}>{comp.evRevenue}</td>
                  <td className="px-4 py-2.5 text-right text-[13px]" style={{ color: pdfColors.gray900 }}>{comp.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function MemoSection({ title, content }: { title: string; content: string }) {
  return (
    <div className="mb-6">
      <SectionLabel>{title}</SectionLabel>
      <p className="text-[13.5px] leading-8" style={{ color: pdfColors.gray900 }}>{content}</p>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-2 text-[10px] tracking-[2px] uppercase"
      style={{ color: pdfColors.blue600 }}
    >
      {children}
    </div>
  )
}

function SectionDivider() {
  return <div className="mb-6 border-t" style={{ borderColor: pdfColors.gray300 }} />
}
