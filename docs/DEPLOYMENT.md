# 配信

会場ものさしは現在、**GitHub Pages**（検証用）と**ChatGPT Sites**（現行の独自ドメイン）の
両方へ配信されている。ChatGPT Sitesから完全に移行する途中である。

## GitHub Pages（移行先）

- URL: https://aratama-ship-it.github.io/venue-monosashi/
- 配信: `main` へpushすると `.github/workflows/pages.yml` が静的ビルドして公開する
- ビルド: `npm --prefix web run build:pages`（`GITHUB_PAGES=true` で `output: export`）
- 出力先: `web/out/`（Gitでは追跡しない）

`/` の1ページと robots.txt・sitemap.xml だけで、D1・R2・サーバー認証を使っていないため
静的化できる。`app/robots.ts` と `app/sitemap.ts` には `export const dynamic = "force-static"`
が必要である。サイトURLは `NEXT_PUBLIC_SITE_URL` で切り替え、末尾スラッシュを必ず付ける
（付けないと robots.txt の Sitemap がサブパスを落とす）。

独自ドメインへ切り替えるときは、`web/public/CNAME` の追加、Pagesのカスタムドメイン設定、
DNSの切り替えが必要で、`PAGES_BASE_PATH=""` にしてサブパスを外す。DNS変更は開発者の
明示確認後に行う。

## ChatGPT Sites（現行の独自ドメイン）

- URL: https://venue.art-monosashi.com/
- 配信: `git push sites main`。pushしたリポジトリの内容がそのまま配信される
- **`web/dist/` が配信物そのもの。** プラットフォームが作った雛形にも `web/dist/`
  （`web/dist/.openai/hosting.json` を含む）が入っている。ビルド成果物をコミットしないと
  配信されるアプリが無くなる
- `.gitignore` の `/web/dist/` は誤コミット防止の保険。配信時は `git add -f web/dist` する
- `sites` へのpushは対話的な資格情報の入力を伴うため、エージェントからは実行できない

2026-08-20 に一度 `git rm -r --cached web/dist` で追跡を外したが誤りだったため、同日中に戻した。

## 手順

1. `npm run validate`（監査・lint・テスト）
2. `npm --prefix web run build` して `git add -f web/dist` してコミット
3. `git push origin main` — GitHub ActionsがPagesへ配信し、validateも走る
4. `git push sites main` — ChatGPT Sitesへ配信（独自ドメイン側）
5. 両方のURLで版表記・件数・主要検索を確認する
