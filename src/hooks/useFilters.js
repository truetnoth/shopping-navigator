import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterBrands, INITIAL_FILTERS } from '../utils/filterBrands';

function parseArrayParam(value) {
  if (!value) return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

function serializeFilters(filters) {
  const params = {};
  if (filters.categories.length > 0) params.category = filters.categories.join(',');
  if (filters.types.length > 0) params.type = filters.types.join(',');
  if (filters.priceSegments.length > 0) params.price = filters.priceSegments.join(',');
  if (filters.hasOwnProduction) params.own = '1';
  if (filters.search) params.q = filters.search;
  return params;
}

export function useFilters(brands) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  const filtersFromUrl = useMemo(() => ({
    categories: parseArrayParam(searchParams.get('category')),
    types: parseArrayParam(searchParams.get('type')),
    priceSegments: parseArrayParam(searchParams.get('price')),
    hasOwnProduction: searchParams.get('own') === '1',
    search: searchParams.get('q') || '',
  }), [searchParams]);

  const [filters, setFilters] = useState(filtersFromUrl);

  // Debounce URL sync for search
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setSearchParams(serializeFilters(filters), { replace: true });
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, setSearchParams]);

  const toggleArrayFilter = useCallback((key, value) => {
    setFilters((prev) => {
      const arr = prev[key];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
  }, []);

  const toggleBoolean = useCallback((key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const setSearch = useCallback((value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const isActive = useMemo(() => (
    filters.categories.length > 0 ||
    filters.types.length > 0 ||
    filters.priceSegments.length > 0 ||
    filters.hasOwnProduction ||
    filters.search.length > 0
  ), [filters]);

  const filteredBrands = useMemo(() => filterBrands(brands, filters), [brands, filters]);

  return {
    filters,
    filteredBrands,
    isActive,
    toggleArrayFilter,
    toggleBoolean,
    setSearch,
    resetFilters,
  };
}
