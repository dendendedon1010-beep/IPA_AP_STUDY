export type IpaFigureQuestionCandidate = {
  id: string
  examYear: number
  examSeason: '春期' | '秋期'
  examType: 'morning'
  questionNumber: number
  status: 'candidate' | 'asset_needed' | 'asset_ready' | 'imported' | 'skipped'
  expectedAssetPath: string
  note: string
}

export const ipaFigureQuestionCandidates: IpaFigureQuestionCandidate[] = [
  {
    id: 'ap-r04-autumn-am-q052',
    examYear: 2022,
    examSeason: '秋期',
    examType: 'morning',
    questionNumber: 52,
    status: 'asset_needed',
    expectedAssetPath: 'public/assets/ipa/ap/r04-autumn/am/q052-figure-1.webp',
    note: '公式PDFから図表部分を手動で切り出した後に追加する',
  },
]
