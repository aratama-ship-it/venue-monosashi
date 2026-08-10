"""台帳へ行を追加するときのID自動採番ヘルパー。

手でIDを決めると既存の最大値を読み違えて衝突する。2026-08-10の夜間ランで
3回発生した（西原商会アリーナのPRICE、平塚のSCENARIO、福井のPRICE）。
3回目は「末尾N行をずらす」修正でさらに別施設のIDまで壊した。

使い方（収録スクリプトから）:

    import sys; sys.path.insert(0, "scripts")
    from append_rows import Ledger

    led = Ledger()
    cid = led.add_candidate(region="中部", prefecture="福井県", city="越前市", ...)
    sid = led.add_detail(candidate_id=cid, space_id="echizen-main", ...)
    pid = led.add_price(candidate_id=cid, space_id="echizen-main", amount_jpy=1500, ...)
    led.add_scenario(candidate_id=cid, component_price_ids=[pid], component_quantities=[8], ...)
    led.flush()   # ここで初めてファイルに書く

flush() まで書き込まないので、途中で例外が出れば台帳は無傷のまま。
"""

import csv
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FILES = {
    "candidate": ("data/candidate-venues.csv", "candidate_id", "CAND"),
    "detail": ("data/venue-details.csv", "detail_id", "DETAIL"),
    "price": ("data/price-observations.csv", "price_id", "PRICE"),
    "scenario": ("data/budget-scenarios.csv", "scenario_id", "SCENARIO"),
}


def _path(rel):
    return os.path.join(ROOT, rel)


class Ledger:
    def __init__(self):
        self._headers = {}
        self._next = {}
        self._pending = {kind: [] for kind in FILES}
        for kind, (rel, col, prefix) in FILES.items():
            with open(_path(rel), newline="", encoding="utf-8") as fh:
                rows = list(csv.reader(fh))
            self._headers[kind] = rows[0]
            pattern = re.compile(rf"^{prefix}-(\d+)$")
            highest = 0
            for row in rows[1:]:
                match = pattern.match(row[0])
                if match:
                    highest = max(highest, int(match.group(1)))
            self._next[kind] = highest + 1

    def _add(self, kind, values):
        rel, col, prefix = FILES[kind]
        header = self._headers[kind]
        unknown = set(values) - set(header)
        if unknown:
            raise KeyError(f"{rel} に無い列: {sorted(unknown)}")
        new_id = f"{prefix}-{self._next[kind]}"
        self._next[kind] += 1
        values = dict(values)
        values[col] = new_id
        self._pending[kind].append([values.get(name, "") for name in header])
        return new_id

    def add_candidate(self, **values):
        return self._add("candidate", values)

    def add_detail(self, **values):
        return self._add("detail", values)

    def add_price(self, **values):
        return self._add("price", values)

    def add_scenario(self, component_price_ids=None, component_quantities=None, **values):
        """component_* はリストで渡せる。合計金額は部品から検算する。"""
        if component_price_ids is not None:
            values["component_price_ids"] = "|".join(component_price_ids)
        if component_quantities is not None:
            values["component_quantities"] = "|".join(
                str(q).rstrip("0").rstrip(".") if isinstance(q, float) else str(q)
                for q in component_quantities
            )
        return self._add("scenario", values)

    def price_amount(self, price_id):
        """flush 前でも、このLedgerで追加した料金行の金額を引ける。"""
        header = self._headers["price"]
        idx_id = header.index("price_id")
        idx_amount = header.index("amount_jpy")
        for row in self._pending["price"]:
            if row[idx_id] == price_id:
                return int(row[idx_amount])
        with open(_path(FILES["price"][0]), newline="", encoding="utf-8") as fh:
            for row in csv.DictReader(fh):
                if row["price_id"] == price_id:
                    return int(row["amount_jpy"])
        raise KeyError(price_id)

    def flush(self):
        counts = {}
        for kind, rows in self._pending.items():
            if not rows:
                continue
            rel = FILES[kind][0]
            with open(_path(rel), "a", newline="", encoding="utf-8") as fh:
                csv.writer(fh).writerows(rows)
            counts[kind] = len(rows)
            self._pending[kind] = []
        return counts
