import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the venue search shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>会場ものさし/);
  assert.match(html, /会場を、名前でなく/);
  assert.match(html, /条件で測る/);
  assert.match(html, /条件を置く/);
  assert.match(html, /同じ目盛りで見る/);
  assert.match(html, />225<[\s\S]*過去大会記録/);
  assert.match(html, />74<[\s\S]*全国候補施設/);
  assert.match(html, />311<[\s\S]*条件付き料金観測/);
  assert.match(html, />13<[\s\S]*区分合計の参考額/);
  assert.match(html, />594<[\s\S]*小劇場一次情報台帳/);
  assert.match(html, /最低観測面積/);
  assert.match(html, /固定舞台が確認できた候補/);
  assert.match(html, /予約・搬入・交通の運用観測あり/);
  assert.match(html, /収録大会の開催実績と照合済み/);
  assert.match(html, /面積・収容・天井・舞台を同じ貸出区画で満たす/);
  assert.match(html, /料金条件の用途/);
  assert.match(
    html,
    /区分料金から組み立てた参考合計も予算検索に含める/,
  );
  assert.match(html, /アマチュアスポーツ/);
  assert.match(html, /ディアボロ型/);
  assert.match(html, /けん玉大会型/);
  assert.match(html, /小劇場型/);
  assert.match(html, /最大収容人数/);
  assert.match(html, /小劇場・ブラックボックス/);
  assert.match(html, /舞台公演/);
  assert.match(html, /収容が小さい順/);
  assert.match(html, /候補内最小日額/);
  assert.match(html, /過去会場台帳をたどる/);
  assert.match(html, /JYYF 全国・前身/);
  assert.match(html, /全日本ディアボロ/);
  assert.match(html, /けん玉ワールドカップ/);
  assert.match(html, /開催実績と現在の貸出可否は別/);
  assert.match(html, /LaSens等の索引で小劇場を見つけ/);
  assert.match(html, /現在の594件の確認台帳は、CSVとして公開しています/);
  assert.match(html, /小劇場台帳から探す/);
  assert.match(html, /SMALL THEATER RESEARCH LEDGER/);
  assert.match(html, /台帳を読み込んでいます/);
  assert.match(html, /過去実績[\s\S]{0,40}21[\s\S]{0,40}件/);
  assert.match(html, /確認済み日額が低い順/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("ships the small theater ledger as a separate data asset", async () => {
  const ledgerUrl = new URL("../public/data/small-theater-ledger.json", import.meta.url);
  const ledger = JSON.parse(await readFile(ledgerUrl, "utf8"));

  assert.equal(ledger.length, 594);
  assert.equal(ledger.some((theater) => theater.verificationStatus === "pending"), false);
  assert.ok(ledger.some((theater) => theater.officialUrl));
});
