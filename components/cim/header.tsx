"use client"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-8 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center bg-primary">
          <span className="text-xs font-bold text-primary-foreground tracking-wider">
            ES
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] tracking-[3px] text-foreground">
            EquityStreet
          </span>
          <span className="text-[9px] tracking-[2px] text-muted-foreground">
            PRIVATE EQUITY &middot; CIM ANALYSIS
          </span>
        </div>
      </div>
      <span className="hidden text-[10px] tracking-[2px] text-[#333] sm:block">
        CONFIDENTIAL &middot; INTERNAL USE ONLY
      </span>
    </header>
  )
}
