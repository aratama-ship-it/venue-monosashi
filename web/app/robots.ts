import type { MetadataRoute } from "next";
import { publication } from "./publication";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", publication.url).href,
    host: publication.url,
  };
}
