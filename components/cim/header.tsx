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
      <div className="hidden items-center gap-6 sm:flex">
        <span className="text-[10px] tracking-[2px] text-[#333]">
          CONFIDENTIAL &middot; INTERNAL USE ONLY
        </span>
        <a
          href="https://arkhamsystems.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[2px] text-muted-foreground transition-colors hover:text-foreground"
        >
          Arkham Systems
        </a>
        <a
          href="https://x.com/rarascode"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[2px] text-muted-foreground transition-colors hover:text-foreground"
        >
          rarascode
        </a>

      </div>
    </header>
  )
}
