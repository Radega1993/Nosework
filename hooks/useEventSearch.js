import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { useDebouncedCallback } from "use-debounce";

/**
 * Hook for managing event search with debouncing and URL synchronization
 * @param {Array} events - Array of events to search
 * @returns {Object} Search state and functions
 */
export function useEventSearch(events = []) {
  const router = useRouter();
  const { query } = router;

  const [searchQuery, setSearchQuery] = useState(query.search || "");

  // Update search query when URL query changes
  useEffect(() => {
    setSearchQuery(query.search || "");
  }, [query.search]);

  // Debounced search update to URL
  const debouncedUpdateSearch = useDebouncedCallback((value) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, search: value || undefined, page: 1 }, // Reset to page 1 when search changes
      },
      undefined,
      { shallow: true }
    );
  }, 300);

  // Update search query and sync with URL
  const updateSearch = (value) => {
    setSearchQuery(value);
    debouncedUpdateSearch(value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, search: undefined, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  // Search events based on query
  const searchedEvents = useMemo(() => {
    if (!searchQuery.trim()) {
      return events;
    }

    const query = searchQuery.toLowerCase();
    return events.filter((event) => {
      const titleMatch = event.title?.toLowerCase().includes(query);
      const descriptionMatch = event.description?.toLowerCase().includes(query);
      return titleMatch || descriptionMatch;
    });
  }, [events, searchQuery]);

  return {
    searchQuery,
    updateSearch,
    clearSearch,
    searchedEvents,
  };
}
