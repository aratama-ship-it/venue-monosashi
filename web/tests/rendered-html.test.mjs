import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
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
  const candidateCsv = await readFile(
    new URL("../../data/candidate-venues.csv", import.meta.url),
    "utf8",
  );
  const candidateCount = candidateCsv.trim().split(/\r?\n/).length - 1;
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>会場ものさし｜全国のイベント会場を条件で比較<\/title>/,
  );
  assert.match(
    html,
    /<meta name="description" content="イベント会場候補を地域・面積・天井・客席・予算・搬入・アクセスで見比べます。 150席以下の小劇場も、平土間・公演料金・利用条件から探せます。"/,
  );
  assert.match(html, /content="イベント会場,会場検索,会場比較,小劇場,体育館,イベントスペース,貸会場,会場費"/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/venue\.art-monosashi\.com\/"/,
  );
  assert.match(html, /property="og:title"/);
  assert.match(html, /property="og:image" content="https:\/\/venue\.art-monosashi\.com\/og\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /rel="icon" href="https:\/\/venue\.art-monosashi\.com\/favicon\.svg"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /会場を、名前でなく/);
  assert.match(html, /条件で測る/);
  assert.match(
    html,
    /イベント会場候補を地域・面積・天井・客席・予算・搬入・アクセスで見比べます。/,
  );
  assert.match(
    html,
    /150席以下の小劇場も、平土間・公演料金・利用条件から探せます。/,
  );
  assert.match(html, /条件を置く/);
  assert.match(html, /同じ目盛りで見る/);
  assert.match(html, /<header class="site-header site-rail"/);
  assert.doesNotMatch(html, /<aside class="site-rail"/);
  assert.doesNotMatch(html, /いま載っている目盛り|class="reference-block"/);
  assert.match(html, /会場規模/);
  assert.match(html, /必要な面積/);
  assert.match(html, /aria-label="最低面積"/);
  assert.match(html, /<legend class="field-label">収容人数<\/legend>/);
  assert.match(html, /aria-label="収容人数の下限"/);
  assert.match(html, /aria-label="収容人数の上限"/);
  assert.match(html, /固定舞台が確認できる/);
  assert.match(html, /大型車搬入が可能または条件付き/);
  assert.match(html, /収録大会の開催実績と照合済み/);
  assert.match(html, /面積・収容人数・舞台条件は、同じ貸出区画で判定します/);
  assert.match(html, /未確認の会場も候補に残す/);
  assert.doesNotMatch(
    html,
    /最低天井高|確認済み日額料の上限|料金条件の用途|最低駐車台数/,
  );
  assert.match(html, /会場の型（複数選択）/);
  assert.match(html, /複数選択できます。選んだ型をすべて持つ会場を表示します/);
  assert.match(html, />イベントスペース</);
  assert.match(html, />舞台</);
  assert.match(html, />スポーツ</);
  assert.match(html, />会議・研修</);
  assert.match(html, />展示</);
  assert.match(html, />宿泊</);
  assert.match(html, /aria-pressed="false"[^>]*class="venue-role-tag"/);
  assert.match(html, /aria-haspopup="dialog"/);
  assert.match(
    html,
    /都道府県を複数選び、いずれかにある会場を表示します（OR検索）/,
  );
  assert.match(html, />地域を選ぶ</);
  assert.doesNotMatch(html, /class="prefecture-groups"/);
  assert.match(html, /フリー検索/);
  assert.match(html, /空白区切りで複数語を指定できます/);
  assert.match(html, /収容が小さい順/);
  assert.match(html, /確認済み日額の最小値/);
  assert.doesNotMatch(html, /id="past-venues"/);
  assert.doesNotMatch(html, /過去会場台帳をたどる/);
  assert.match(html, /LaSens等の索引で小劇場を見つけ/);
  assert.match(html, /現在の594件の確認台帳は、CSVとして公開しています/);
  assert.match(html, /小劇場台帳から探す/);
  assert.match(html, /SMALL THEATER RESEARCH LEDGER/);
  assert.match(html, /class="section-title-index"[^>]*>03</);
  assert.match(
    html,
    /<details class="archive-section archive-disclosure" id="small-theater-ledger"/,
  );
  assert.doesNotMatch(
    html,
    /<details[^>]*id="small-theater-ledger"[^>]*\sopen(?:=|\s|>)/,
  );
  assert.match(html, /台帳を読み込んでいます/);
  assert.match(html, /class="section-title-index"[^>]*>04</);
  assert.match(html, /更新と訂正/);
  assert.match(html, /データの鮮度と公開状態/);
  const workspaceIndex = html.indexOf('aria-label="会場検索"');
  const freshnessIndex = html.indexOf('aria-label="データの鮮度と公開状態"');
  const footerIndex = html.indexOf('<footer class="site-footer"');
  assert.ok(workspaceIndex >= 0 && workspaceIndex < freshnessIndex);
  assert.ok(freshnessIndex < footerIndex);
  assert.match(html, /条件を共有/);
  assert.match(html, /比較に追加/);
  assert.match(html, new RegExp(`残り${candidateCount - 40}施設も表示`));
  assert.match(html, /絞り込みを開く/);
  assert.match(html, /更新と訂正/);
  assert.match(html, /訂正候補を送る/);
  assert.match(html, /全国公開調査版 0\.2/);
  assert.match(html, /過去実績[\s\S]{0,40}21[\s\S]{0,40}件/);
  assert.doesNotMatch(html, /確認済み日額が低い順/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("publishes crawler routes and a share image", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    render("/robots.txt"),
    render("/sitemap.xml"),
  ]);
  assert.equal(robotsResponse.status, 200);
  assert.match(await robotsResponse.text(), /Sitemap: https:\/\/venue\.art-monosashi\.com\/sitemap\.xml/);
  assert.equal(sitemapResponse.status, 200);
  assert.match(await sitemapResponse.text(), /venue\.art-monosashi\.com/);

  const image = await readFile(new URL("../public/og.png", import.meta.url));
  assert.ok(image.length > 20_000);
  assert.deepEqual([...image.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
});

test("ships the small theater ledger as a separate data asset", async () => {
  const dataUrl = new URL("../public/data/", import.meta.url);
  const entries = await readdir(dataUrl);
  const versionedLedgers = entries.filter((name) =>
    /^small-theater-ledger\.[a-f0-9]{12}\.json$/.test(name),
  );
  assert.equal(versionedLedgers.length, 1);
  const ledgerUrl = new URL(versionedLedgers[0], dataUrl);
  const ledger = JSON.parse(await readFile(ledgerUrl, "utf8"));

  assert.equal(ledger.length, 594);
  assert.equal(ledger.some((theater) => theater.verificationStatus === "pending"), false);
  assert.ok(ledger.some((theater) => theater.officialUrl));
});
