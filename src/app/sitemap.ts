import type { MetadataRoute } from "next";

const BASE = "https://williamlouislouisy.com";
const LOCALES = ["fr", "en"] as const;

const paths = ["/", "/my-projects", "/lab", "/contact-me", "/about-me"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticUrls = paths.flatMap((p) =>
    LOCALES.map((l) => ({
      url: `${BASE}/${l}${p}`,
      lastModified: now,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((ll) => [ll, `${BASE}/${ll}${p}`])
        ),
      },
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    }))
  );
  return staticUrls;
}
