"use client"

interface Deal {
  name: string
  industry: string
  status: "pursued" | "passed" | "watchlist"
  ev: string
  date: string
}

const recentDeals: Deal[] = [
  {
    name: "NorthStar Logistics",
    industry: "Transportation & Logistics",
    status: "pursued",
    ev: "$520M",
    date: "2 days ago",
  },
  {
    name: "Clearwater Environmental",
    industry: "Environmental Services",
    status: "passed",
    ev: "$180M",
    date: "5 days ago",
  },
  {
    name: "Pinnacle Health Systems",
    industry: "Healthcare Services",
    status: "watchlist",
    ev: "$290M",
    date: "1 week ago",
  },
  {
    name: "Summit Manufacturing",
    industry: "Precision Manufacturing",
    status: "pursued",
    ev: "$410M",
    date: "2 weeks ago",
  },
]

const statusStyles = {
  pursued: {
    label: "PURSUED",
    dot: "bg-success",
    text: "text-success-foreground",
  },
  passed: {
    label: "PASSED",
    dot: "bg-destructive",
    text: "text-risk-high-text",
  },
  watchlist: {
    label: "WATCHING",
    dot: "bg-warning",
    text: "text-warning-foreground",
  },
}

export function RecentDeals() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] tracking-[2px] text-[#444]">
        RECENT ANALYSES
      </span>
      <div className="flex flex-col gap-2">
        {recentDeals.map((deal, i) => {
          const s = statusStyles[deal.status]
          return (
            <button
              key={i}
              className="flex items-center gap-4 border border-border bg-card p-3 text-left transition-all hover:bg-accent rounded-md"
            >
              {/* Icon block */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-secondary text-[10px] tracking-wider text-[#555]">
                CIM
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                <span className="text-[13px] font-sans text-foreground truncate">
                  {deal.name}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span>{deal.industry}</span>
                  <span className="text-[#333]">/</span>
                  <span>{deal.ev}</span>
                </div>
              </div>

              {/* Status + date */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                  <span className={`text-[9px] tracking-[1.5px] ${s.text}`}>
                    {s.label}
                  </span>
                </div>
                <span className="text-[10px] text-[#333]">{deal.date}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
