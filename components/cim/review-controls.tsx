type Props = {
  disabled?: boolean
  onDecision: (decision: 'advance' | 'decline') => void
}

export function ReviewControls({ disabled, onDecision }: Props) {
  return (
    <div className="flex flex-col gap-3 border-t border-border pt-4 mt-2">
      <p className="text-[11px] text-muted-foreground">
        Once you are comfortable with the memo, record a partner decision. The
        workflow is designed so associates focus on exceptions and partners
        focus on judgment.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onDecision('advance')}
          className="inline-flex items-center justify-center rounded-sm bg-emerald-600 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-50 disabled:opacity-60"
        >
          Advance to next stage
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onDecision('decline')}
          className="inline-flex items-center justify-center rounded-sm border border-border bg-background px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-foreground hover:bg-accent disabled:opacity-60"
        >
          Decline deal
        </button>
      </div>
    </div>
  )
}

