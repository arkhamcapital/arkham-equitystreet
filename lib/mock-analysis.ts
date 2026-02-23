export interface AnalysisResult {
  companyName: string
  industry: string
  dealType: string
  confidenceScore: number
  enterpriseValue: string
  revenue: string
  ebitda: string
  evEbitdaMultiple: string

  sponsor: string
  headquarters: string
  employees: string
  founded: string
  website: string
  cimPages: number
  analysisTime: string

  memo: {
    executiveSummary: string
    businessOverview: string
    growthDrivers: string[]
    keyConcerns: string[]
    recommendation: string
  }

  financials: {
    years: string[]
    rows: {
      label: string
      values: string[]
      isHighlight?: boolean
    }[]
    insights: {
      label: string
      value: string
      note: string
    }[]
  }

  risks: {
    title: string
    severity: "high" | "medium" | "low"
    description: string
    mitigation: string
  }[]

  thesis: {
    bullCase: string[]
    bearCase: string[]
    baseCase: string
    comps: {
      name: string
      evEbitda: string
      evRevenue: string
      year: string
    }[]
  }
}

export const mockAnalysis: AnalysisResult = {
  companyName: "Apex Industrial Services",
  industry: "Industrial Services & Maintenance",
  dealType: "Platform Acquisition",
  confidenceScore: 84,
  enterpriseValue: "$340M",
  revenue: "$185M",
  ebitda: "$38M",
  evEbitdaMultiple: "8.9x",

  sponsor: "Harrington Capital Partners",
  headquarters: "Houston, TX",
  employees: "1,240",
  founded: "2008",
  website: "apexindustrial.com",
  cimPages: 87,
  analysisTime: "2m 34s",

  memo: {
    executiveSummary:
      "Apex Industrial Services is a leading provider of industrial maintenance, turnaround, and specialty services to refining, petrochemical, and power generation end markets across the Gulf Coast region. The company has grown revenue at a 12% CAGR over the past five years through a combination of organic market share gains and four tuck-in acquisitions. EBITDA margins have expanded from 16% to 21% during this period, reflecting operational improvements and increasing mix of higher-margin specialty services. The management team, led by CEO Michael Torres (18 years industry experience), has built a defensible market position anchored by long-term master service agreements covering approximately 70% of revenue.",

    businessOverview:
      "Founded in 2008, Apex has grown from a single-site maintenance contractor into a diversified industrial services platform serving 45+ facilities across Texas, Louisiana, and Mississippi. The company operates through three segments: Routine Maintenance (55% of revenue), Turnaround Services (30%), and Specialty Services (15%). Key competitive advantages include a highly skilled workforce of over 800 certified technicians, proprietary project management software, and an industry-leading safety record (TRIR of 0.42 vs. industry average of 1.8). The company maintains relationships with 12 of the 15 largest refiners in the Gulf Coast.",

    growthDrivers: [
      "Aging refinery infrastructure requiring increased maintenance spend, with average Gulf Coast facility age exceeding 35 years",
      "Regulatory tailwinds from EPA clean fuels standards driving incremental turnaround complexity and scope",
      "Proven acquisition playbook with four successful integrations generating 25%+ cost synergies on average",
      "Expansion into adjacent geographies (Midwest refineries) representing $2B+ addressable market",
      "Growing Specialty Services segment with 35% gross margins vs. 22% for routine maintenance",
    ],

    keyConcerns: [
      "High customer concentration: top 3 clients represent 42% of revenue, creating dependency risk",
      "Cyclical exposure to refinery capex budgets, which contracted 15-20% during 2020 downturn",
      "Tight labor market for certified industrial technicians, with 8% annual wage inflation in the Gulf Coast",
      "Integration risk from recent Meridian acquisition ($45M revenue) still in early synergy capture phase",
    ],

    recommendation:
      "Based on the AI analysis, Apex represents a compelling platform investment in a fragmented, essential-services market with strong secular tailwinds. The 8.9x EV/EBITDA entry multiple is reasonable relative to precedent transactions (9.5-11.0x range) given the customer concentration and cyclical exposure. However, the management team's track record and the clear path to margin expansion through Specialty Services mix shift warrant serious consideration. Recommend proceeding to Phase II diligence with a focus on customer contract durability, labor availability, and the Meridian integration timeline. Final go/no-go decision should incorporate management presentation findings and detailed quality-of-earnings analysis.",
  },

  financials: {
    years: ["FY 2022", "FY 2023", "FY 2024", "FY 2025E"],
    rows: [
      {
        label: "Revenue",
        values: ["$142M", "$158M", "$172M", "$185M"],
        isHighlight: true,
      },
      {
        label: "Gross Profit",
        values: ["$38M", "$44M", "$49M", "$54M"],
      },
      {
        label: "Gross Margin",
        values: ["26.8%", "27.8%", "28.5%", "29.2%"],
      },
      {
        label: "EBITDA",
        values: ["$25M", "$30M", "$34M", "$38M"],
        isHighlight: true,
      },
      {
        label: "EBITDA Margin",
        values: ["17.6%", "19.0%", "19.8%", "20.5%"],
      },
      {
        label: "Capex",
        values: ["$8M", "$9M", "$10M", "$12M"],
      },
      {
        label: "Free Cash Flow",
        values: ["$15M", "$18M", "$21M", "$23M"],
      },
      {
        label: "FCF Conversion",
        values: ["60%", "60%", "62%", "61%"],
      },
    ],
    insights: [
      {
        label: "Revenue CAGR (3yr)",
        value: "12.4%",
        note: "Driven by organic growth and tuck-in acquisitions",
      },
      {
        label: "EBITDA Margin Trend",
        value: "+290bps",
        note: "Expanding through specialty services mix shift",
      },
      {
        label: "Rule of 40",
        value: "32.9",
        note: "Growth rate + margin. Approaching institutional threshold",
      },
      {
        label: "Net Debt / EBITDA",
        value: "2.1x",
        note: "Conservative leverage with capacity for add-on M&A",
      },
    ],
  },

  risks: [
    {
      title: "Customer Concentration Risk",
      severity: "high",
      description:
        "Top 3 customers (ExxonMobil, Valero, Marathon Petroleum) represent 42% of TTM revenue. Loss of any single relationship could materially impact financial performance and covenant compliance.",
      mitigation:
        "Verify MSA terms and renewal timelines. Assess switching costs and relationship depth at facility level. Model downside scenario with loss of largest customer.",
    },
    {
      title: "Cyclical Demand Exposure",
      severity: "high",
      description:
        "Industrial maintenance spend is correlated with refinery utilization rates and commodity prices. During the 2020 downturn, Gulf Coast maintenance budgets contracted 15-20%, though Apex outperformed peers with only a 10% revenue decline.",
      mitigation:
        "Analyze contractual minimums within MSAs. Evaluate counter-cyclical turnaround demand patterns. Stress test financial model under recession scenario.",
    },
    {
      title: "Labor Availability & Wage Pressure",
      severity: "medium",
      description:
        "The Gulf Coast industrial labor market faces persistent tightness, with 8% annual wage inflation for certified technicians. Apex's ability to recruit and retain skilled workers is critical to execution.",
      mitigation:
        "Evaluate employee retention data (currently 85%, above industry average of 72%). Assess training pipeline capacity and apprenticeship programs.",
    },
    {
      title: "Meridian Integration Execution",
      severity: "medium",
      description:
        "The $45M revenue Meridian Environmental Services acquisition closed 8 months ago. While early signs are positive, full synergy capture ($4-6M) is dependent on systems integration and cross-selling execution.",
      mitigation:
        "Request detailed integration tracker and monthly synergy run-rate data. Interview Meridian site managers during management meetings.",
    },
    {
      title: "Regulatory Compliance",
      severity: "low",
      description:
        "Operating in petrochemical environments requires strict adherence to OSHA, EPA, and state-level regulations. Any safety incident could result in operational suspension and reputational damage.",
      mitigation:
        "Company's 0.42 TRIR is well below industry average. Review insurance coverage, incident history, and compliance audit results.",
    },
  ],

  thesis: {
    bullCase: [
      "Specialty Services segment grows to 25% of revenue by 2028, driving blended EBITDA margins above 24%",
      "Successful execution of 2-3 additional tuck-in acquisitions at 5-6x EBITDA, creating geographic diversification",
      "Midwest expansion captures meaningful share of $2B+ addressable market with asset-light entry strategy",
      "Energy transition drives incremental demand from biofuel refinery conversions and carbon capture projects",
      "Exit at 10-11x EBITDA to strategic acquirer, generating 3.0x+ MOIC over 5-year hold",
    ],
    bearCase: [
      "Refinery closures accelerate faster than expected due to energy transition, reducing addressable market",
      "Key customer loss or MSA repricing reduces revenue by 10-15% with limited near-term replacement",
      "Wage inflation exceeds ability to pass through costs, compressing margins by 200-300bps",
      "Meridian integration falters, requiring additional investment and management bandwidth",
      "Recession scenario with extended period of low refinery utilization rates below 80%",
    ],
    baseCase:
      "Under the base case, Apex grows revenue at 8-10% annually through a combination of organic share gains (5-6%) and one tuck-in acquisition per year (3-4% contribution). EBITDA margins expand 100-150bps to 22% by 2028 driven by operational improvements and Specialty Services mix shift. With 2.5-3.0x entry leverage and strong FCF conversion, the sponsor achieves a 2.3-2.5x MOIC and 18-22% IRR over a 5-year hold period. The most likely exit path is a sale to a larger industrial services platform or financial sponsor at 9.5-10.5x EBITDA.",
    comps: [
      { name: "APi Group / Chubb", evEbitda: "11.2x", evRevenue: "1.8x", year: "2024" },
      { name: "Brand Industrial / OMERS", evEbitda: "10.5x", evRevenue: "1.5x", year: "2023" },
      { name: "Team Industrial Services", evEbitda: "9.8x", evRevenue: "1.2x", year: "2023" },
      { name: "Clean Harbors / HPC", evEbitda: "9.2x", evRevenue: "1.4x", year: "2024" },
      { name: "Matrix Service Company", evEbitda: "8.5x", evRevenue: "0.9x", year: "2022" },
    ],
  },
}
