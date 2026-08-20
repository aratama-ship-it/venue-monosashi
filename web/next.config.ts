import type { NextConfig } from "next";

// GitHub Pagesへ静的書き出しするときだけ export モードにする。
// 会場ものさしは / の1ページとrobots・sitemapだけで、サーバー機能を使っていない。
// 独自ドメインへ切り替えたら BASE_PATH を空にする（CNAMEを置く場合はサブパス不要）。
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.PAGES_BASE_PATH ?? "/venue-monosashi";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
