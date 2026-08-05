export const publication = {
  siteName: "会場ものさし",
  title: "会場ものさし｜全国のイベント会場を条件で比較",
  description:
    "イベント会場候補を地域・面積・天井・客席・予算・搬入・アクセスで見比べます。 150席以下の小劇場も、平土間・公演料金・利用条件から探せます。",
  url: "https://venue.art-monosashi.com/",
  edition: "全国公開調査版 0.2",
  updatedAt: "2026-08-05",
  keywords: [
    "イベント会場",
    "会場検索",
    "会場比較",
    "小劇場",
    "体育館",
    "イベントスペース",
    "貸会場",
    "会場費",
  ],
  repositoryUrl: "https://github.com/aratama-ship-it/venue-monosashi",
  correctionUrl:
    "https://github.com/aratama-ship-it/venue-monosashi/issues/new?title=%E4%BC%9A%E5%A0%B4%E6%83%85%E5%A0%B1%E3%81%AE%E8%A8%82%E6%AD%A3%E6%8F%90%E6%A1%88&body=%E4%BC%9A%E5%A0%B4%E5%90%8D%EF%BC%9A%0A%E8%A8%82%E6%AD%A3%E7%AE%87%E6%89%80%EF%BC%9A%0A%E4%B8%80%E6%AC%A1%E6%83%85%E5%A0%B1URL%EF%BC%9A%0A%E8%A3%9C%E8%B6%B3%EF%BC%9A",
  changelog: [
    {
      date: "2026-08-05",
      title: "共有・比較・鮮度表示を追加",
      detail:
        "検索条件を含む共有URL、最大3会場の比較、モバイル絞り込み、観測日の表示を公開調査版へ追加。",
    },
    {
      date: "2026-08-04",
      title: "全国候補と小劇場台帳を更新",
      detail:
        "全国候補174施設、料金観測387件、小劇場594件へ更新。小劇場の未着手状態を0件に整理。",
    },
    {
      date: "2026-07-30",
      title: "過去大会を基準にした全国調査版を公開",
      detail:
        "JJF・JYYF・WYYC・ディアボロ・けん玉の過去会場台帳を基準に、全国比較を開始。",
    },
  ],
} as const;
