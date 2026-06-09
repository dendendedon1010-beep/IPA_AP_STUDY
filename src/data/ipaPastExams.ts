import type { IpaPastExamCatalogItem } from '../types'

/**
 * IPA公開過去問の取り込み管理カタログ。
 * URLは公式資料との対応を確認できたものだけ設定し、未確認の項目は省略する。
 */
export const ipaPastExamCatalog: IpaPastExamCatalogItem[] = [
  {
    id: 'ap-r07-spring-morning',
    category: 'AP',
    period: { year: 2025, eraLabel: '令和7年度', season: 'spring', seasonLabel: '春期' },
    paperType: 'morning',
    title: '応用情報技術者試験 令和7年度 春期 午前',
    note: '公式資料URL確認後に取り込み予定',
    isReadyForImport: false,
  },
  {
    id: 'ap-r07-spring-afternoon',
    category: 'AP',
    period: { year: 2025, eraLabel: '令和7年度', season: 'spring', seasonLabel: '春期' },
    paperType: 'afternoon',
    title: '応用情報技術者試験 令和7年度 春期 午後',
    note: '専用ビューア整備後に取り込み予定',
    isReadyForImport: false,
  },
  {
    id: 'ap-r07-autumn-morning',
    category: 'AP',
    period: { year: 2025, eraLabel: '令和7年度', season: 'autumn', seasonLabel: '秋期' },
    paperType: 'morning',
    title: '応用情報技術者試験 令和7年度 秋期 午前',
    note: '公式資料URL確認後に取り込み予定',
    isReadyForImport: false,
  },
  {
    id: 'ap-r07-autumn-afternoon',
    category: 'AP',
    period: { year: 2025, eraLabel: '令和7年度', season: 'autumn', seasonLabel: '秋期' },
    paperType: 'afternoon',
    title: '応用情報技術者試験 令和7年度 秋期 午後',
    note: '専用ビューア整備後に取り込み予定',
    isReadyForImport: false,
  },
  {
    id: 'ap-r06-spring-morning',
    category: 'AP',
    period: { year: 2024, eraLabel: '令和6年度', season: 'spring', seasonLabel: '春期' },
    paperType: 'morning',
    title: '応用情報技術者試験 令和6年度 春期 午前',
    note: '公式資料URL確認後に取り込み予定',
    isReadyForImport: false,
  },
  {
    id: 'ap-r06-spring-afternoon',
    category: 'AP',
    period: { year: 2024, eraLabel: '令和6年度', season: 'spring', seasonLabel: '春期' },
    paperType: 'afternoon',
    title: '応用情報技術者試験 令和6年度 春期 午後',
    note: '専用ビューア整備後に取り込み予定',
    isReadyForImport: false,
  },
  {
    id: 'ap-r06-autumn-morning',
    category: 'AP',
    period: { year: 2024, eraLabel: '令和6年度', season: 'autumn', seasonLabel: '秋期' },
    paperType: 'morning',
    title: '応用情報技術者試験 令和6年度 秋期 午前',
    questionPdfUrl: 'https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_ap_am_qs.pdf',
    note: '既存の引用問題を含む。全問取り込みは未完了',
    isReadyForImport: false,
  },
  {
    id: 'ap-r06-autumn-afternoon',
    category: 'AP',
    period: { year: 2024, eraLabel: '令和6年度', season: 'autumn', seasonLabel: '秋期' },
    paperType: 'afternoon',
    title: '応用情報技術者試験 令和6年度 秋期 午後',
    note: '専用ビューア整備後に取り込み予定',
    isReadyForImport: false,
  },
]
