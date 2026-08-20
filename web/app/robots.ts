import type { MetadataRoute } from "next";

// 静的書き出し（output: export）でビルド時に生成する。
export const dynamic = "force-static";
import { publication } from "./publication";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    // 相対で解決する。先頭に / を付けるとサブパスが落ちる。
    sitemap: new URL("sitemap.xml", publication.url).href,
    host: publication.url,
  };
}
