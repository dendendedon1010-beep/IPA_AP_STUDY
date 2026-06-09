# IPA 応用情報技術者試験データ配置

IPA公開過去問を正確に引用した問題を、年度・期・試験区分ごとのファイルへ分割して配置します。問題本文をカタログへ混在させず、1ファイルを独立して追加・検証できる単位にします。

## ファイル名

- 午前: `r07-spring-morning.ts`, `r06-autumn-morning.ts`
- 午後: 専用型・ビューアの導入後に `r07-spring-afternoon.ts` のように配置

各午前ファイルは `Question[]` をexportし、`index.ts` の `ipaApQuestionSets` へ登録します。既存データは回答履歴との互換性を優先して当面 `src/data/questions.ts` に維持し、IDを変更せず段階的に移します。

ID、出典、検証、投入手順の詳細は `docs/ipa-import-guide.md` を参照してください。未確認の問題文やURLは登録しません。
