import { getDBConnection } from "@/utils/db";
import { getCanonicalUrl } from "@/utils/seo";

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

/**
 * Generate sitemap for events dynamically from database
 * Includes future events and events from the last 30 days
 */
export default function SitemapEvents() {
  // This will be replaced by getServerSideProps, but we need a default return
  return null;
}

// Set content type header and generate XML using getServerSideProps
export async function getServerSideProps({ res }) {
  if (res) {
    res.setHeader("Content-Type", "application/xml");
  }

  try {
    const db = getDBConnection();

    // Calculate date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split("T")[0];

    // Get future events and events from last 30 days
    // Only include events that are not cancelled (if status field exists)
    let events;
    try {
      // Try to query with status field if it exists
      events = db
        .prepare(
          `SELECT id, date, updated_at FROM events 
           WHERE date >= ? 
           AND (status IS NULL OR status != 'cancelled')
           ORDER BY date ASC`
        )
        .all(thirtyDaysAgoStr);
    } catch (error) {
      // Fallback if status field doesn't exist yet
      events = db
        .prepare(
          `SELECT id, date FROM events 
           WHERE date >= ? 
           ORDER BY date ASC`
        )
        .all(thirtyDaysAgoStr);
    }

    // Generate XML sitemap
    const urls = events.map((event) => {
      const lastmod = event.updated_at
        ? new Date(event.updated_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];
      const loc = getCanonicalUrl(`/events/${event.id}`);

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    // Send XML response directly
    if (res) {
      res.write(xml);
      res.end();
    }

    return { props: {} };
  } catch (error) {
    console.error("Error generating events sitemap:", error);
    // Return empty sitemap on error
    const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    
    if (res) {
      res.write(emptyXml);
      res.end();
    }
    
    return { props: {} };
  }
}
