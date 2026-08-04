import type { Metadata } from "next";
import "./globals.css";
import "./editorial-concept.css";
import { publication } from "./publication";

export const metadata: Metadata = {
  metadataBase: new URL(publication.url),
  title: publication.title,
  description: publication.description,
  applicationName: publication.siteName,
  icons: { icon: "/favicon.svg" },
  keywords: [
    "イベント会場",
    "会場検索",
    "小劇場",
    "ジャグリング",
    "ヨーヨー",
    "ディアボロ",
    "けん玉",
    "会場費",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: publication.siteName,
    title: publication.title,
    description: publication.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "会場ものさし — 全国の会場を同じ条件で比較する公開調査版",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: publication.title,
    description: publication.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: publication.siteName,
  description: publication.description,
  url: publication.url,
  inLanguage: "ja",
  dateModified: publication.updatedAt,
  isAccessibleForFree: true,
  keywords: [
    "イベント会場",
    "小劇場",
    "ジャグリング",
    "ヨーヨー",
    "ディアボロ",
    "けん玉",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
