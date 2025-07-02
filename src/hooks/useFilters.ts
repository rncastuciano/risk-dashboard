
import { useState, useMemo } from 'react';
import { FilterState } from '@/types';

export const useFilters = (initialFilters: Partial<FilterState> = {}) => {
  const [filters, setFilters] = useState<FilterState>({
    departments: [],
    categories: [],
    ratings: [],
    statuses: [],
    ticketTypes: [],
    ...initialFilters
  });

  const updateFilter = (key: keyof FilterState, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: values
    }));
  };

  const clearFilters = () => {
    setFilters({
      departments: [],
      categories: [],
      ratings: [],
      statuses: [],
      ticketTypes: []
    });
  };

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(filter => filter.length > 0);
  }, [filters]);

  return {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters
  };
};
