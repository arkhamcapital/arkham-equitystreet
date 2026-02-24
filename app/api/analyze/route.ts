import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are a senior private equity analyst at a top-tier PE firm with 15+ years of experience reviewing Confidential Information Memorandums (CIMs).

When given a CIM document, respond with ONLY a raw JSON object — no preamble, no markdown, no backticks, no explanation. Just the JSON.

Use exactly this structure:

{
  "companyName": "Full legal company name",
  "industry": "Industry & sub-sector",
  "dealType": "e.g. Platform Acquisition, Add-on, Growth Equity, Buyout",
  "confidenceScore": 85,
  "enterpriseValue": "$XXXm",
  "revenue": "$XXXm",
  "ebitda": "$XXXm",
  "evEbitdaMultiple": "X.Xx",
  "sponsor": "Seller or current sponsor name if disclosed",
  "headquarters": "City, State",
  "employees": "X,XXX",
  "founded": "YYYY",
  "website": "domain.com if mentioned",
  "cimPages": 0,
  "analysisTime": "AI Analysis",
  "memo": {
    "executiveSummary": "4-6 sentence paragraph. Specific, reference actual numbers and names from the CIM.",
    "businessOverview": "4-6 sentence paragraph covering business model, revenue streams, customer base, geographies, competitive advantages.",
    "growthDrivers": [
      "Specific growth driver with data point from CIM",
      "Second growth driver",
      "Third growth driver",
      "Fourth growth driver",
      "Fifth growth driver"
    ],
    "keyConcerns": [
      "Most important concern with specific detail",
      "Second concern",
      "Third concern",
      "Fourth concern"
    ],
    "recommendation": "3-4 sentence paragraph with clear recommendation: proceed, pass, or proceed with conditions."
  },
  "financials": {
    "years": ["FY 20XX", "FY 20XX", "FY 20XX", "FY 20XXE"],
    "rows": [
      { "label": "Revenue", "values": ["$XXm", "$XXm", "$XXm", "$XXm"], "isHighlight": true },
      { "label": "Gross Profit", "values": ["$XXm", "$XXm", "$XXm", "$XXm"] },
      { "label": "Gross Margin", "values": ["XX%", "XX%", "XX%", "XX%"] },
      { "label": "EBITDA", "values": ["$XXm", "$XXm", "$XXm", "$XXm"], "isHighlight": true },
      { "label": "EBITDA Margin", "values": ["XX%", "XX%", "XX%", "XX%"] },
      { "label": "Capex", "values": ["$XXm", "$XXm", "$XXm", "$XXm"] },
      { "label": "Free Cash Flow", "values": ["$XXm", "$XXm", "$XXm", "$XXm"] },
      { "label": "FCF Conversion", "values": ["XX%", "XX%", "XX%", "XX%"] }
    ],
    "insights": [
      { "label": "Revenue CAGR", "value": "XX%", "note": "Brief explanation" },
      { "label": "EBITDA Margin Trend", "value": "+XXXbps", "note": "Brief explanation" },
      { "label": "Net Debt / EBITDA", "value": "X.Xx", "note": "Brief explanation" },
      { "label": "FCF Conversion", "value": "XX%", "note": "Brief explanation" }
    ]
  },
  "risks": [
    { "title": "Risk name", "severity": "high", "description": "2-3 sentences with specific data points.", "mitigation": "1-2 sentences on what to verify in diligence." },
    { "title": "Second risk", "severity": "high", "description": "Description", "mitigation": "Mitigation" },
    { "title": "Third risk", "severity": "medium", "description": "Description", "mitigation": "Mitigation" },
    { "title": "Fourth risk", "severity": "medium", "description": "Description", "mitigation": "Mitigation" },
    { "title": "Fifth risk", "severity": "low", "description": "Description", "mitigation": "Mitigation" }
  ],
  "thesis": {
    "bullCase": ["Bull point 1", "Bull point 2", "Bull point 3", "Bull point 4", "Bull point 5"],
    "bearCase": ["Bear point 1", "Bear point 2", "Bear point 3", "Bear point 4", "Bear point 5"],
    "baseCase": "2-3 sentences: revenue growth rate, margin trajectory, expected MOIC and IRR, most likely exit path.",
    "comps": [
      { "name": "Comparable transaction", "evEbitda": "X.Xx", "evRevenue": "X.Xx", "year": "20XX" },
      { "name": "Second comp", "evEbitda": "X.Xx", "evRevenue": "X.Xx", "year": "20XX" },
      { "name": "Third comp", "evEbitda": "X.Xx", "evRevenue": "X.Xx", "year": "20XX" },
      { "name": "Fourth comp", "evEbitda": "X.Xx", "evRevenue": "X.Xx", "year": "20XX" }
    ]
  }
}

Critical rules:
- severity must be exactly "high", "medium", or "low" (lowercase)
- confidenceScore must be a number 0-100
- cimPages must be a number
- If a financial figure is not in the CIM, use "N/D"
- Never fabricate financial figures
- Be specific — reference actual company details from the document
- FINANCIALS: Always prioritize forecast/projected years over historical. If the CIM contains both historical and projected financials, use the projected years for the financials table
- FINANCIALS: If the document states figures are in thousands, convert them to millions before returning. For example C$16,145 thousands = C$16.1m. Always return values in millions with an "m" suffix
- CURRENCY: If the CIM uses CAD or any non-USD currency, prefix values with the correct symbol e.g. C$16.1m not $16.1m`

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')

    const API_KEY = process.env.ANTHROPIC_API_KEY

    if (!API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set in .env.local' }, { status: 500 })
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'pdfs-2024-09-25',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 8000,
        system: SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: base64,
              }
            },
            {
              type: 'text',
              text: 'Analyze this CIM and return the structured JSON only. No markdown, no backticks, no preamble. Raw JSON only.'
            }
          ]
        }]
      })
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Anthropic API error:', err)
      return NextResponse.json({ error: 'Anthropic API failed', detail: err }, { status: 500 })
    }

    const data = await response.json()
    const text = data.content?.map((b: { type: string; text?: string }) => b.text || '').join('') || ''
    const clean = text.replace(/```json\n?|```/g, '').trim()

    let parsed
    try {
      parsed = JSON.parse(clean)
    } catch (parseError) {
      console.error('JSON parse failed. Raw response:', text)
      return NextResponse.json({ error: 'Failed to parse AI response', raw: text }, { status: 500 })
    }

    return NextResponse.json(parsed)

  } catch (error) {
    console.error('Route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}