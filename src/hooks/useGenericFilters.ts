
import { useState, useCallback, useMemo, useEffect } from 'react';
import { GenericFilterState } from '@/types/filterConfig';

const STORAGE_KEY_PREFIX = 'filters_';

export const useGenericFilters = (
  initialFilters: GenericFilterState = {},
  storageKey: string = 'default'
) => {
  const [filters, setFilters] = useState<GenericFilterState>({});
  const [isLoading, setIsLoading] = useState(true);

  const fullStorageKey = `${STORAGE_KEY_PREFIX}${storageKey}`;

  // Load filters from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(fullStorageKey);
      if (stored) {
        const parsedFilters = JSON.parse(stored) as GenericFilterState;
        setFilters(parsedFilters);
      } else {
        setFilters(initialFilters);
      }
    } catch (error) {
      console.error('Failed to load filters from localStorage:', error);
      setFilters(initialFilters);
    } finally {
      setIsLoading(false);
    }
  }, [fullStorageKey]);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        if (Object.keys(filters).length === 0 || Object.values(filters).every(values => values.length === 0)) {
          localStorage.removeItem(fullStorageKey);
        } else {
          localStorage.setItem(fullStorageKey, JSON.stringify(filters));
        }
      } catch (error) {
        console.error('Failed to save filters to localStorage:', error);
      }
    }
  }, [filters, fullStorageKey, isLoading]);

  const updateFilter = useCallback((key: string, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: values
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(values => values.length > 0);
  }, [filters]);

  const getFilterCount = useMemo(() => {
    return Object.values(filters).reduce((total, values) => total + values.length, 0);
  }, [filters]);

  return {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    getFilterCount,
    setFilters,
    isLoading
  };
};
