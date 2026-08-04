import type { MetadataRoute } from "next";
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
