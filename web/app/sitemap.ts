import type { MetadataRoute } from "next";

// 静的書き出し（output: export）でビルド時に生成する。
export const dynamic = "force-static";
import { publication } from "./publication";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: publication.url,
      lastModified: publication.updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
