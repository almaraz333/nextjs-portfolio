import type { MetadataRoute } from "next";

import { CHANNELS } from "@/lib/channels";

const BASE_URL = "https://coltonalmaraz.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    return [
        {
            url: `${BASE_URL}/`,
            lastModified,
            changeFrequency: "monthly",
            priority: 1
        },
        ...CHANNELS.map(channel => ({
            url: `${BASE_URL}/c/${channel.slug}`,
            lastModified,
            changeFrequency: "monthly" as const,
            priority: 0.8
        }))
    ];
}
