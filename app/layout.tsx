import type { Metadata } from "next";
import "./globals.css";
import "./editorial-concept.css";

export const metadata: Metadata = {
  title: "会場ものさし｜全国のイベント会場を過去大会と予算で測る",
  description:
    "JJF・日本ヨーヨー連盟・世界大会の過去会場を基準に、全国のイベント会場を規模・天井高・予算・搬入・アクセスで比較する調査版サービス。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
