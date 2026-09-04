import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./editorial-concept.css";
import { publication } from "./publication";

export const metadata: Metadata = {
  metadataBase: new URL(publication.url),
  title: publication.title,
  description: publication.description,
  applicationName: publication.siteName,
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
  keywords: [...publication.keywords],
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
  keywords: [...publication.keywords],
};

const cloudflareAnalyticsToken =
  process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim() ||
  "977721791a104a10ae5b37312104bbf5";
const cloudflareAnalyticsEnabled = /^[0-9a-f]{32}$/i.test(
  cloudflareAnalyticsToken,
);

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
        {cloudflareAnalyticsEnabled ? (
          <Script
            id="cloudflare-web-analytics"
            strategy="afterInteractive"
            type="module"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({
              token: cloudflareAnalyticsToken.toLowerCase(),
            })}
          />
        ) : null}
      </body>
    </html>
  );
}
