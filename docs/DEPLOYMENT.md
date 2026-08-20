# Sites deployment

The deployable application lives in `web/`. Build and package that directory;
the repository-root `dist/` is not the current Venue Monosashi application.

Before publishing, run `npm run validate` from the repository root. The Sites
archive must be created from `web/dist/` with `web/.openai/hosting.json`.

## web/dist はビルド成果物であり、Gitでは追跡しない（2026-08-20 決定）

`web/dist/` は `npm run build` が毎回作り直す成果物で、`.gitignore` の対象である。
配布アーカイブは、その時点でビルドし直した `web/dist/` から作る。Git上のコピーを
配布に使う経路は無く、CIも `npm test` の中で自前にビルドする。

以前は `Rebuild web/dist for deploy` のように成果物をコミットしていたが、
`.gitignore` に `/web/dist/` が入った後は、既に追跡済みのファイルだけが残り、
新しいハッシュ名のファイルは追加できない状態になっていた。この状態でコミットすると、
**削除と更新だけが記録されて配布物が壊れる。** そのため 2026-08-20 に
`git rm -r --cached web/dist` で追跡を外した（ローカルのファイルはそのまま）。

デプロイ手順:

1. `npm run validate`（監査・lint・テスト）
2. `npm --prefix web run build`
3. できた `web/dist/` と `web/.openai/hosting.json` からSitesアーカイブを作る
