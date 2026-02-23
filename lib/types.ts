export type CimMemo = {
  id: string
  dealName: string
  businessOverview: string
  financialHighlights: string[]
  marketDynamics: string[]
  keyRisks: string[]
  redFlags: string[]
  createdAt: string
  stage: 'initial_screen' | 'ic_readout' | 'passed' | 'declined'
}

