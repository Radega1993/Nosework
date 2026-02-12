import { getCanonicalUrl } from "@/utils/seo";

/**
 * Generate main sitemap index that references all sitemaps
 * Includes static pages and references to dynamic sitemaps
 */
function generateSitemapIndex() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.noseworktrialcommunity.com";

  // Static pages with priorities and change frequencies
  const staticPages = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/que-es-nosework-trial", priority: "0.9", changefreq: "weekly" },
    { path: "/reglamento", priority: "0.9", changefreq: "weekly" },
    { path: "/como-empezar", priority: "0.8", changefreq: "weekly" },
    { path: "/events", priority: "0.8", changefreq: "daily" },
    { path: "/about", priority: "0.7", changefreq: "monthly" },
    { path: "/contact", priority: "0.7", changefreq: "monthly" },
    { path: "/normativas", priority: "0.7", changefreq: "monthly" },
  ];

  // Generate URLs for static pages
  const staticUrls = staticPages.map((page) => {
    const loc = getCanonicalUrl(page.path);
    const lastmod = new Date().toISOString().split("T")[0];

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Generate sitemap index that references events sitemap
  const sitemapIndex = `  <sitemap>
    <loc>${escapeXml(getCanonicalUrl("/sitemap-events.xml"))}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </sitemap>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join("\n")}
</urlset>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default function Sitemap() {
  // This will be replaced by getServerSideProps, but we need a default return
  return null;
}

// Set content type header and generate XML using getServerSideProps
export async function getServerSideProps({ res }) {
  if (res) {
    res.setHeader("Content-Type", "application/xml");
  }

  const xml = generateSitemapIndex();
  
  // Send XML response directly
  if (res) {
    res.write(xml);
    res.end();
  }

  return { props: {} };
}
