import { type CimMemo } from '@/lib/types'

type Props = {
  memo: CimMemo | null
  isProcessing: boolean
}

export function MemoPreview({ memo, isProcessing }: Props) {
  if (isProcessing) {
    return (
      <div className="rounded-md border border-border bg-muted/40 p-4 text-[11px] text-muted-foreground">
        Parsing CIM, extracting tables, and drafting memo outline…
      </div>
    )
  }

  if (!memo) {
    return (
      <div className="rounded-md border border-dashed border-border bg-muted/20 p-4 text-[11px] text-muted-foreground">
        Once the AI finishes reading the CIM, you&apos;ll see a structured
        memo here: business overview, financial highlights, market dynamics,
        key risks, and red flags.
      </div>
    )
  }

  return (
    <div className="space-y-4 rounded-md border border-border bg-muted/10 p-4">
      <header className="space-y-1">
        <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
          Investment memo
        </p>
        <h3 className="text-sm font-semibold">{memo.dealName}</h3>
        <p className="text-[11px] text-muted-foreground">
          Stage: {memo.stage === 'initial_screen' ? 'Initial screen' : memo.stage}
        </p>
      </header>

      <section className="space-y-2">
        <h4 className="text-[11px] font-medium tracking-[0.16em] uppercase">
          Business overview
        </h4>
        <p className="text-[11px] leading-relaxed text-foreground">
          {memo.businessOverview}
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <h4 className="text-[11px] font-medium tracking-[0.16em] uppercase">
            Financial highlights
          </h4>
          <ul className="space-y-1 text-[11px] text-foreground">
            {memo.financialHighlights.map((item, index) => (
              <li key={index} className="leading-relaxed">
                • {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-1">
          <h4 className="text-[11px] font-medium tracking-[0.16em] uppercase">
            Market dynamics
          </h4>
          <ul className="space-y-1 text-[11px] text-foreground">
            {memo.marketDynamics.map((item, index) => (
              <li key={index} className="leading-relaxed">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <h4 className="text-[11px] font-medium tracking-[0.16em] uppercase">
            Key risks
          </h4>
          <ul className="space-y-1 text-[11px] text-foreground">
            {memo.keyRisks.map((item, index) => (
              <li key={index} className="leading-relaxed">
                • {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-1">
          <h4 className="text-[11px] font-medium tracking-[0.16em] uppercase">
            Red flags
          </h4>
          <ul className="space-y-1 text-[11px] text-foreground">
            {memo.redFlags.map((item, index) => (
              <li key={index} className="leading-relaxed">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

