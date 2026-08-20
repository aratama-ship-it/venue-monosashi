# Sites deployment

The deployable application lives in `web/`. Build and package that directory;
the repository-root `dist/` is not the current Venue Monosashi application.

Before publishing, run `npm run validate` from the repository root. The Sites
archive must be created from `web/dist/` with `web/.openai/hosting.json`.

## web/dist は配信物そのものであり、Gitで追跡する

`sites` リモート（ChatGPT Sites）へpushしたリポジトリの内容がそのまま配信される。
プラットフォームが最初に作った雛形リポジトリにも `web/dist/`（`web/dist/.openai/hosting.json`
を含む）が入っており、**ビルド成果物をコミットしていないと配信されるアプリが無くなる。**

`.gitignore` に `/web/dist/` があるのは、日常の作業で誤ってコミットしないための保険である。
配信時は `git add -f web/dist` で明示的に追加する。

2026-08-20 に一度 `git rm -r --cached web/dist` で追跡を外したが、これは誤りだった
（`docs/DEPLOYMENT.md` とCIしか見ておらず、`sites` リモートの実体を確認していなかった）。
同日中に元へ戻している。

## 手順

1. `npm run validate`（監査・lint・テスト）
2. `npm --prefix web run build`
3. `git add -f web/dist` してコミットする
4. `git push origin main`（GitHub。CIが通ることを確認）
5. `git push sites main`（**これが配信**。ChatGPT Sitesが受け取って公開する）
6. 公開URL https://venue.art-monosashi.com/ で版表記・件数・主要検索を確認する

`sites` へのpushは対話的な資格情報の入力を伴うため、エージェントからは実行できない。
直近の配信は 2026-08-19 20:46（390d3cf）。
