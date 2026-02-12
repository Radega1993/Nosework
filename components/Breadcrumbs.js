import Link from "next/link";
import { getCanonicalUrl } from "@/utils/seo";

/**
 * Breadcrumbs component - Renders visual breadcrumb navigation and Schema.org BreadcrumbList
 * 
 * This component automatically generates both the visual breadcrumb navigation and
 * the Schema.org BreadcrumbList JSON-LD markup for SEO purposes.
 * 
 * @example
 * ```jsx
 * <Breadcrumbs
 *   items={[
 *     { label: "Inicio", href: "/" },
 *     { label: "Eventos", href: "/events" },
 *     { label: "Event Title", href: "/events/1" }
 *   ]}
 * />
 * ```
 * 
 * @param {Array} items - Array of breadcrumb items. Each item should have:
 *   - `label` (string): Display text for the breadcrumb
 *   - `href` (string): URL path (relative or absolute)
 * 
 * @returns {JSX.Element|null} Returns null if items array is empty or undefined
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) {
    return null;
  }

  // Generate Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: getCanonicalUrl(item.href),
    })),
  };

  return (
    <>
      {/* Visual breadcrumb navigation */}
      <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
        <div className="container-custom py-4">
          <ol className="flex items-center space-x-2 text-sm">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="text-gray-400 mx-2" aria-hidden="true">
                      /
                    </span>
                  )}
                  {isLast ? (
                    <span
                      className="text-gray-900 font-medium"
                      aria-current="page"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>

      {/* Schema.org BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
