import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 台帳へ行を追加する前に、次に使えるIDを機械的に出す。
// 手で採番すると既存の最大値を読み違えて衝突する（2026-08-10 に PRICE / SCENARIO の両方で発生）。
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function maxId(relativePath, column, prefix) {
  const text = fs.readFileSync(path.join(root, relativePath), "utf8");
  const [header, ...lines] = text.split("\n").filter((line) => line.trim());
  const index = header.split(",").indexOf(column);
  let max = 0;
  for (const line of lines) {
    const value = line.slice(0, line.indexOf(","));
    if (index !== 0) continue;
    const match = value.match(new RegExp(`^${prefix}-(\\d+)$`));
    if (match) max = Math.max(max, Number(match[1]));
  }
  return max;
}

const targets = [
  ["data/price-observations.csv", "price_id", "PRICE"],
  ["data/venue-details.csv", "detail_id", "DETAIL"],
  ["data/budget-scenarios.csv", "scenario_id", "SCENARIO"],
];

for (const [file, column, prefix] of targets) {
  const max = maxId(file, column, prefix);
  console.log(`${prefix}: max=${max} next=${prefix}-${max + 1}`);
}
