# 公開デプロイが最後の1操作で止まっています（朝イチで対応が必要）

作成: 2026-08-10 未明（本人就寝中）
状態: **Version 209 の保存まで完了。本番反映だけが未実行。**

## 結論：朝にやること

Sitesコネクタの本番公開の権限レビューが通る環境で、**保存済みの Version 209 に対して
`deploy_site_version` を実行するだけ**。再push・再ビルド・再保存は不要です。

```
version_number: 209
commit_sha:     22f5cdab6ea9d90a60c7bd329c1ad4832ebde6a8
version_id:     appgprj_6a6aca3c3c58819194cb69eaf321290b~appgver_07f8b3e6a7388191a258f374eaeaa2cd
file_count:     49
content_hash:   sha256:58fc7babc0508478f83b67ec57829bd431ec032cbd9382acb37a749d86f29a34
```

## 何が起きたか

**`git push sites HEAD:main` だけでは本番デプロイは起動しない。**
「バージョン保存 → 本番デプロイ」の2段階が必要で、後段が権限レビューのタイムアウトで失敗した。

Codexが受け取ったエラー（2回とも同一。指示どおり1回だけ再試行して停止）:

```
The automatic permission approval review did not finish before its deadline.
Do not assume the action is unsafe based on the timeout alone.
You may retry once, or ask the user for guidance or explicit approval.
```

- push自体は成功（sites/main = 22f5cda）
- Version 209 の保存も成功（49ファイル・tarアーカイブ）
- デプロイIDは発行されず、ビルドキューにも入っていない。ビルドログは存在しない

## 現在の公開状態

両URLとも HTTP 200 で **Version 208（commit 3e79b60 = Wave 1相当）を配信中**。

- https://venue.art-monosashi.com/
- https://venue-monosashi.juggler-arata.chatgpt.site/

## 反映済みかどうかの正しい判定方法

**CSSハッシュや会場名で判定してはいけない。** Claudeは一度これで誤判定した。

- CSSは今回変更していないのでハッシュが変わらない（一致しても反映の証拠にならない）
- 会場名は候補台帳に以前から存在する。今回追加したのは料金だけなので判別できない

正しい手順:

```bash
curl -s https://venue.art-monosashi.com/ -o /tmp/p.html
ASSET=$(grep -oE '/assets/venue-search-[A-Za-z0-9_-]+\.js' /tmp/p.html | sort -u | head -1)
curl -s "https://venue.art-monosashi.com${ASSET}" | grep -c "hourly_rate_times_published_hours"
```

`0` なら旧版、`1以上`なら新版。この文字列は今回のデプロイで初めて入るため確実に判別できる。

## Version 209 に含まれる内容

- Wave 2（岩手・舞台型5施設）、Wave 3（長崎・両型4施設）、Wave 4（青森）、Wave 5（時間換算13施設）
- 参考日額の3系統化（公式日額／区分合計／時間単価×利用可能時間）とUIの出し分け
- day_type 不整合の解消（**土日祝フィルタで日額が出る施設 144→161**）

---

# 追記（2026-08-10 午後）: Version 209は反映済み。今度は別の理由で止まった

## 前段の問題は解決していた

上に書いた「Version 209 の保存まで完了、本番反映だけが未実行」は、その後どこかで反映された。
本日確認した時点で両URLとも `venue-search-F0zefSKm.js` を配信しており、この中に
`hourly_rate_times_published_hours` が含まれる（＝Version 209相当の内容が公開済み）。

## 今回の状況

本日の収録（体育館候補45件の追加ほか）を反映しようとして、**バージョン保存の段階で止まった。**

```
デプロイ対象コミット: e03d52aab4429c5f585a8a3d48400d751eb65970
sites/main:          push成功（58d4411..e03d52a、fast-forward）
version_number:      211
version_id:          appgprj_6a6aca3c3c58819194cb69eaf321290b~appgver_d2b74f9b6f108191b609b7364914f6c0
file_count:          null   ← 209のときは 49 だった
archive_storage:     null
保存API応答:          Action completed.（isError: false、エラー文なし）
```

**保存APIは成功を返すのに、アーカイブ情報が保持されていない。** その状態で
`deploy_site_version` を呼ぶと次で失敗する。

```
deployment_id: appgdep_6a794d26686c8191990a245af1ae6706
エラー:        We couldn't fetch the saved Site source. Retry publishing the Site.
```

保存からやり直しても `archive_storage: null` は変わらなかった（2回試行して打ち切り）。
Codex側でローカルに作ったアーカイブには65エントリあったので、**送信側ではなく保存先の問題**に見える。

## 現在の公開状態

両URLとも HTTP 200 で **Version 209相当を配信中**。本日追加した45施設は未反映。

- https://venue.art-monosashi.com/ → `venue-search-F0zefSKm.js`
- https://venue-monosashi.juggler-arata.chatgpt.site/ → 同上

## 反映済みかどうかの判定（今回版）

```bash
curl -s https://venue.art-monosashi.com/ | grep -o 'venue-search-[A-Za-z0-9_-]*\.js'
# venue-search-BznAbPnU.js なら本日分が反映済み
# venue-search-F0zefSKm.js なら未反映
```

念のための内容確認（新版にしか無い文字列）:

```bash
curl -s https://venue.art-monosashi.com/assets/venue-search-BznAbPnU.js | grep -c 'マルワ'
```

## 次にやること

データ側は commit e03d52a まで origin と sites の両方にpush済みなので、**再ビルドもre-pushも不要。**
保存先の問題が解消したら、バージョン保存（file_count が null でないことを確認）→ deploy だけでよい。

## 追記2: 壊れているのは Version 211 だけ。保存し直しても同じ番号が返る

保存を5回試したが、毎回同じ **Version 211**（file_count: null）が返るだけで新しい番号が振られなかった。
一方、**Version 210 は file_count: 49 で正常**に保存されている。つまり保存機能そのものは動いており、
コミット e03d52a に紐づく 211 のレコードだけが壊れた状態で固定されている。

→ **仮説: 保存はコミットSHA単位でレコードを再利用する。** 新しいコミットを作れば別番号になるはず。
この追記自体が新しいコミットになるので、それで保存し直す。

## 追記3: 今度は sites への push 認証が切れた

新コミット 3e5a4f3 を作って保存し直そうとしたところ、**push 段階で認証が通らなくなった。**

```
fatal: could not read Username for 'https://git.chatgpt-team.site': Device not configured
```

- セッション序盤の push（58d4411..e03d52a）は成功していたので、一時的な認証トークンが期限切れになったとみられる
- Claude Code 側の git にも認証情報はない（credential.helper は osxkeychain だが該当エントリなし）
- Codex を新しいプロセスで起動し直しても同じ。`git ls-remote sites main` すら通らない
- 認証情報をコマンドライン引数で渡す回避策は取っていない（Codex側の安全審査でも拒否された）

### 現状のまとめ

| 項目 | 状態 |
|---|---|
| データ（origin） | **3e5a4f3 まで push 済み。安全** |
| sites/main | e03d52a（本日のデータは入っているが未デプロイ） |
| Version 211 | file_count: null の壊れた状態で固定 |
| Version 210 | file_count: 49（正常。ただし旧コミット） |
| 公開中 | Version 209相当（`venue-search-F0zefSKm.js`） |

### 再開の手順

認証が回復したら、以下だけでよい（**再ビルド不要**。web/dist は 3e5a4f3 に含まれている）。

```bash
git push sites HEAD:main      # e03d52a → 3e5a4f3
# バージョン保存（file_count が null でないことを確認。211が返るなら新コミットを作る）
# deploy_site_version
curl -s https://venue.art-monosashi.com/ | grep -o 'venue-search-[A-Za-z0-9_-]*\.js'
# venue-search-BznAbPnU.js なら反映済み
```
