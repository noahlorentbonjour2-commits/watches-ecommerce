import type { MetadataRoute } from "next";
import { siteUrl } from "./layout";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteUrl}/montre-personnalisee`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
