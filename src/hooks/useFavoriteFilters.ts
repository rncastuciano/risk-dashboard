
import { useState, useEffect, useCallback } from 'react';
import { GenericFilterState } from '@/types/filterConfig';

const STORAGE_KEY = 'actionTracker_favoriteFilter';

interface FavoriteFilter {
  ticketId: string;
  name: string;
  filters: GenericFilterState;
  createdAt: string;
}

export const useFavoriteFilters = (
  currentFilters: GenericFilterState,
  onFiltersChange?: (filters: GenericFilterState) => void
) => {
  const [favoriteFilter, setFavoriteFilter] = useState<FavoriteFilter | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hasAutoLoaded, setHasAutoLoaded] = useState(false);

  // Load favorite filter from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FavoriteFilter;
        setFavoriteFilter(parsed);
      }
    } catch (error) {
      console.error('Failed to load favorite filter:', error);
    }
  }, []);

  // Auto-load favorite filters if no current filters exist
  useEffect(() => {
    if (
      favoriteFilter && 
      !hasAutoLoaded && 
      Object.values(currentFilters).every(values => values.length === 0) &&
      onFiltersChange
    ) {
      console.log('Auto-loading favorite filters');
      onFiltersChange(favoriteFilter.filters);
      setHasAutoLoaded(true);
    }
  }, [favoriteFilter, currentFilters, hasAutoLoaded, onFiltersChange]);

  // Check if current filters match the favorite
  useEffect(() => {
    if (!favoriteFilter) {
      setIsFavorite(false);
      return;
    }

    const currentFiltersKeys = Object.keys(currentFilters);
    const favoriteFiltersKeys = Object.keys(favoriteFilter.filters);

    // Check if both have the same keys and values
    const isMatch = currentFiltersKeys.length === favoriteFiltersKeys.length &&
      currentFiltersKeys.every(key => {
        const currentValues = currentFilters[key] || [];
        const favoriteValues = favoriteFilter.filters[key] || [];
        return currentValues.length === favoriteValues.length &&
          currentValues.every(value => favoriteValues.includes(value));
      });

    setIsFavorite(isMatch);
  }, [currentFilters, favoriteFilter]);

  const saveFavoriteFilter = useCallback(() => {
    const newFavorite: FavoriteFilter = {
      ticketId: 'default',
      name: 'My Favorite Filter',
      filters: currentFilters,
      createdAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorite));
      setFavoriteFilter(newFavorite);
      setIsFavorite(true);
    } catch (error) {
      console.error('Failed to save favorite filter:', error);
    }
  }, [currentFilters]);

  const removeFavoriteFilter = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setFavoriteFilter(null);
      setIsFavorite(false);
    } catch (error) {
      console.error('Failed to remove favorite filter:', error);
    }
  }, []);

  const loadFavoriteFilter = useCallback(() => {
    return favoriteFilter?.filters || {};
  }, [favoriteFilter]);

  const hasActiveFilters = Object.values(currentFilters).some(values => values.length > 0);

  return {
    isFavorite,
    favoriteFilter,
    saveFavoriteFilter,
    removeFavoriteFilter,
    loadFavoriteFilter,
    hasActiveFilters
  };
};
