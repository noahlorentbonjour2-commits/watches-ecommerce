import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

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
    ...["mentions-legales", "cgv", "confidentialite", "cookies"].map((page) => ({
      url: `${siteUrl}/${page}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
