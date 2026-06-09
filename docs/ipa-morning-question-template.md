# IPA午前問題投入テンプレート

このテンプレートは、IPA公式資料との照合が完了した午前問題だけに使用します。`Question` 型に合わせ、選択肢はア・イ・ウ・エの配列として記載します。値が未確認の状態で問題データへ追加しないでください。

```ts
import { FIELDS } from '../../../fields'
import type { Question } from '../../../../types'

export const r07SpringMorningQuestions: Question[] = [
  {
    id: 'ap-r07-spring-am-q001',
    examYear: 2025,
    examSeason: '春期',
    examType: 'morning',
    questionNumber: 1,
    field: FIELDS.security,
    subField: '認証',
    questionText: 'IPA公式資料と照合済みの問題文を記載',
    choices: [
      { key: 'ア', text: '選択肢ア' },
      { key: 'イ', text: '選択肢イ' },
      { key: 'ウ', text: '選択肢ウ' },
      { key: 'エ', text: '選択肢エ' },
    ],
    correctAnswer: 'ア',
    officialAnswerText: 'ア：選択肢ア',
    sourceName: '情報処理推進機構（IPA） 応用情報技術者試験 令和7年度 春期 午前 問1',
    sourceUrl: '確認済みのIPA公式ページ又はPDFのHTTPS URL',
    isQuoteFromIpa: true,
    explanation: {
      correctReason: 'AP Studyが独自作成した正答理由',
      wrongReasons: {
        ア: '正答である根拠',
        イ: '誤りである理由',
        ウ: '誤りである理由',
        エ: '誤りである理由',
      },
      points: ['覚えるポイント'],
      keywords: ['関連キーワード'],
      isAiGenerated: false,
    },
  },
]
```

## 転記前後の確認

- `id` の令和年度、期、問番号がメタデータと一致している。
- 問題文と全選択肢をIPA公式資料から改変せず転記した。
- `correctAnswer` と `officialAnswerText` を公式正答一覧と照合した。
- `sourceName` に年度、期、午前、問番号が入っている。
- `sourceUrl` は対象資料を実際に開いて確認した公式HTTPS URLである。
- 解説はAP Study独自作成で、公式解説を転載していない。
- `npm run verify:questions` が成功する。

オリジナル問題にはこの引用テンプレートを流用せず、`isQuoteFromIpa: false` と `sourceName: 'AP Study original'` を設定してください。
