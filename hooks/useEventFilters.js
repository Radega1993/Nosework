import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Hook for managing event filters with URL synchronization
 * @param {Array} events - Array of all events to filter
 * @returns {Object} Filter state and functions
 */
export function useEventFilters(events = []) {
  const router = useRouter();
  const { query } = router;

  // Initialize filters from URL or defaults
  const [filters, setFilters] = useState({
    dateFrom: query.dateFrom || "",
    dateTo: query.dateTo || "",
    level: query.level ? (Array.isArray(query.level) ? query.level : [query.level]) : [],
    type: query.type ? (Array.isArray(query.type) ? query.type : [query.type]) : [],
    location: query.location || "",
    status: query.status ? (Array.isArray(query.status) ? query.status : [query.status]) : [],
  });

  // Update filters when URL query changes
  useEffect(() => {
    setFilters({
      dateFrom: query.dateFrom || "",
      dateTo: query.dateTo || "",
      level: query.level ? (Array.isArray(query.level) ? query.level : [query.level]) : [],
      type: query.type ? (Array.isArray(query.type) ? query.type : [query.type]) : [],
      location: query.location || "",
      status: query.status ? (Array.isArray(query.status) ? query.status : [query.status]) : [],
    });
  }, [query]);

  // Update URL when filters change
  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Update URL query parameters
    const queryParams = {};
    if (updatedFilters.dateFrom) queryParams.dateFrom = updatedFilters.dateFrom;
    if (updatedFilters.dateTo) queryParams.dateTo = updatedFilters.dateTo;
    if (updatedFilters.level.length > 0) queryParams.level = updatedFilters.level;
    if (updatedFilters.type.length > 0) queryParams.type = updatedFilters.type;
    if (updatedFilters.location) queryParams.location = updatedFilters.location;
    if (updatedFilters.status.length > 0) queryParams.status = updatedFilters.status;

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, ...queryParams, page: 1 }, // Reset to page 1 when filters change
      },
      undefined,
      { shallow: true }
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      level: [],
      type: [],
      location: "",
      status: [],
    });
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Date range filter
      if (filters.dateFrom) {
        const eventDate = new Date(event.date);
        const fromDate = new Date(filters.dateFrom);
        if (eventDate < fromDate) return false;
      }
      if (filters.dateTo) {
        const eventDate = new Date(event.date);
        const toDate = new Date(filters.dateTo);
        if (eventDate > toDate) return false;
      }

      // Level filter
      if (filters.level.length > 0 && event.level) {
        const eventLevel = event.level.toLowerCase();
        if (!filters.level.some((l) => l.toLowerCase() === eventLevel)) {
          return false;
        }
      }

      // Type filter
      if (filters.type.length > 0 && event.type) {
        const eventType = event.type.toLowerCase();
        if (!filters.type.some((t) => t.toLowerCase() === eventType)) {
          return false;
        }
      }

      // Location filter
      if (filters.location) {
        const searchLocation = filters.location.toLowerCase();
        const eventLocation = (event.location || event.city || "").toLowerCase();
        if (!eventLocation.includes(searchLocation)) {
          return false;
        }
      }

      // Status filter
      if (filters.status.length > 0 && event.status) {
        const eventStatus = event.status.toLowerCase();
        if (!filters.status.some((s) => s.toLowerCase() === eventStatus)) {
          return false;
        }
      }

      return true;
    });
  }, [events, filters]);

  return {
    filters,
    updateFilters,
    clearFilters,
    filteredEvents,
  };
}
