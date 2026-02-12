import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Hook for managing event pagination with URL synchronization
 * @param {Array} events - Array of events to paginate
 * @param {Number} itemsPerPage - Number of items per page (default: 12)
 * @returns {Object} Pagination state and functions
 */
export function useEventPagination(events = [], itemsPerPage = 12) {
  const router = useRouter();
  const { query } = router;

  // Get current page from URL or default to 1
  const currentPage = parseInt(query.page) || 1;

  // Calculate total pages
  const totalPages = Math.ceil(events.length / itemsPerPage);

  // Get paginated events
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return events.slice(startIndex, endIndex);
  }, [events, currentPage, itemsPerPage]);

  // Navigate to specific page
  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: pageNumber },
      },
      undefined,
      { shallow: true }
    );
    // Scroll to top of events list
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Navigate to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Navigate to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Reset to page 1 when events change significantly
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      goToPage(1);
    }
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedEvents,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    startIndex: (currentPage - 1) * itemsPerPage + 1,
    endIndex: Math.min(currentPage * itemsPerPage, events.length),
    totalItems: events.length,
  };
}
