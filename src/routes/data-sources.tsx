import { createFileRoute } from "@tanstack/react-router";
import { DataSourcesPage } from "@/components/terrafarm/data-sources-page";

export const Route = createFileRoute("/data-sources")({
  head: () => ({
    meta: [
      { title: "Data Sources — AgroMind" },
      {
        name: "description",
        content:
          "NASA Earth observation data sources used in AgroMind: SMAP, GPM, POWER, MODIS, Landsat, GRACE, and SRTM with spatial/temporal resolutions and limitations.",
      },
      { property: "og:title", content: "Data Sources — AgroMind" },
      {
        property: "og:description",
        content:
          "NASA Earth observation data sources used in AgroMind: SMAP, GPM, POWER, MODIS, Landsat, GRACE, and SRTM with spatial/temporal resolutions and limitations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DataSourcesPage,
});
