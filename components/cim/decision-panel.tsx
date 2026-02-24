"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Decision = "pursue" | "pass" | "watchlist" | null

export function DecisionPanel() {
  const [decision, setDecision] = useState<Decision>(null)
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (decision) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 border border-border bg-card p-6 rounded-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-success/30 bg-success/10">
          <span className="text-success text-lg">{"\u2713"}</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-[13px] font-sans font-bold text-foreground">
            Decision Recorded
          </h3>
          <p className="text-[12px] font-sans italic leading-5 text-foreground">
            {decision === "pursue"
              ? "Deal moved to pipeline. IC deck preparation initiated."
              : decision === "pass"
                ? "Deal declined. Rationale archived for LP reporting."
                : "Added to watchlist. Monitoring for material changes."}
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false)
            setDecision(null)
            setNotes("")
          }}
          className="text-[10px] tracking-[1.5px] text-foreground hover:text-foreground/80 transition-colors"
        >
          REVISE DECISION
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 border border-border bg-card p-6 rounded-md">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse-gold" />
        <span className="text-[10px] tracking-[2px] text-primary">
          INVESTMENT DECISION
        </span>
      </div>

      {/* Fiduciary notice */}
      <p className="text-[11px] font-sans italic leading-5 text-foreground">
        This decision involves LP capital and fiduciary responsibility.
        The AI has provided first-pass analysis. The go/no-go determination
        must remain a human judgment call.
      </p>

      {/* Decision buttons */}
      <div className="grid grid-cols-3 gap-2">
        <DecisionButton
          label="PURSUE"
          sublabel="Move to IC"
          isSelected={decision === "pursue"}
          onClick={() => setDecision("pursue")}
          selectedBg="border-success bg-success/10 text-success-foreground"
        />
        <DecisionButton
          label="WATCHLIST"
          sublabel="Monitor"
          isSelected={decision === "watchlist"}
          onClick={() => setDecision("watchlist")}
          selectedBg="border-warning bg-warning/10 text-warning-foreground"
        />
        <DecisionButton
          label="PASS"
          sublabel="Decline"
          isSelected={decision === "pass"}
          onClick={() => setDecision("pass")}
          selectedBg="border-destructive bg-risk-high-bg text-risk-high-text"
        />
      </div>

      {/* Rationale */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] tracking-[1.5px] text-muted-foreground">
          DECISION RATIONALE
        </span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Document your reasoning for the IC..."
          className="h-24 resize-none rounded-md border border-border bg-background px-3 py-2 text-[13px] font-sans leading-6 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!decision}
        className={cn(
          "w-full py-3 text-[11px] tracking-[2px] transition-all rounded-md",
          decision
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-secondary text-[#333] cursor-not-allowed"
        )}
      >
        RECORD DECISION
      </button>
    </div>
  )
}

function DecisionButton({
  label,
  sublabel,
  isSelected,
  onClick,
  selectedBg,
}: {
  label: string
  sublabel: string
  isSelected: boolean
  onClick: () => void
  selectedBg: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 rounded-md border p-3 transition-all",
        isSelected
          ? selectedBg
          : "border-border text-foreground hover:border-border/80 hover:text-foreground"
      )}
    >
      <span className="text-[10px] font-medium tracking-[1.5px]">{label}</span>
      <span className="text-[9px] opacity-60">{sublabel}</span>
    </button>
  )
}
