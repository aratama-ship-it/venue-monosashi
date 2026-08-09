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
