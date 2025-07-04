
import { useState, useEffect, useCallback } from 'react';
import { GenericFilterState } from '@/types/filterConfig';

interface FavoriteFilter {
  ticketId: string;
  name: string;
  filters: GenericFilterState;
  createdAt: string;
}

interface LastFilterState {
  filters: GenericFilterState;
  timestamp: string;
}

export const useFavoriteFilters = (
  currentFilters: GenericFilterState,
  onFiltersChange?: (filters: GenericFilterState) => void,
  pageKey: string = 'default'
) => {
  const FAVORITE_STORAGE_KEY = `${pageKey}_favoriteFilter`;
  const LAST_STATE_STORAGE_KEY = `${pageKey}_lastFilterState`;
  
  const [favoriteFilter, setFavoriteFilter] = useState<FavoriteFilter | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Load favorite filter from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FavoriteFilter;
        setFavoriteFilter(parsed);
      }
    } catch (error) {
      console.error('Failed to load favorite filter:', error);
    }
  }, [FAVORITE_STORAGE_KEY]);

  // Auto-load LAST FILTER STATE (not favorite) when component mounts
  useEffect(() => {
    if (!hasInitialized && onFiltersChange) {
      try {
        const lastState = localStorage.getItem(LAST_STATE_STORAGE_KEY);
        if (lastState) {
          const parsed = JSON.parse(lastState) as LastFilterState;
          console.log(`Auto-loading last filter state for ${pageKey}:`, parsed.filters);
          onFiltersChange(parsed.filters);
        }
      } catch (error) {
        console.error('Failed to load last filter state:', error);
      }
      setHasInitialized(true);
    }
  }, [hasInitialized, onFiltersChange, pageKey, LAST_STATE_STORAGE_KEY]);

  // Save current filter state whenever it changes (including empty filters)
  useEffect(() => {
    if (hasInitialized) {
      const lastState: LastFilterState = {
        filters: currentFilters,
        timestamp: new Date().toISOString()
      };
      
      try {
        localStorage.setItem(LAST_STATE_STORAGE_KEY, JSON.stringify(lastState));
        console.log(`Saved last filter state for ${pageKey}:`, currentFilters);
      } catch (error) {
        console.error('Failed to save last filter state:', error);
      }
    }
  }, [currentFilters, hasInitialized, pageKey, LAST_STATE_STORAGE_KEY]);

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
      name: `${pageKey} Favorite Filter`,
      filters: currentFilters,
      createdAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(newFavorite));
      setFavoriteFilter(newFavorite);
      setIsFavorite(true);
      console.log(`Saved favorite filter for ${pageKey}`);
    } catch (error) {
      console.error('Failed to save favorite filter:', error);
    }
  }, [currentFilters, FAVORITE_STORAGE_KEY, pageKey]);

  const removeFavoriteFilter = useCallback(() => {
    try {
      localStorage.removeItem(FAVORITE_STORAGE_KEY);
      setFavoriteFilter(null);
      setIsFavorite(false);
      console.log(`Removed favorite filter for ${pageKey}`);
    } catch (error) {
      console.error('Failed to remove favorite filter:', error);
    }
  }, [FAVORITE_STORAGE_KEY, pageKey]);

  const loadFavoriteFilter = useCallback(() => {
    if (favoriteFilter && onFiltersChange) {
      console.log(`Loading favorite filter for ${pageKey}:`, favoriteFilter.filters);
      onFiltersChange(favoriteFilter.filters);
    }
    return favoriteFilter?.filters || {};
  }, [favoriteFilter, onFiltersChange, pageKey]);

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
