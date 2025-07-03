import { useState, useMemo } from 'react';
import { useLocalDepartmentData } from '@/hooks/useLocalDepartmentData';
import { useGenericFilters } from '@/hooks/useGenericFilters';
import { useFavoriteFilters } from '@/hooks/useFavoriteFilters';
import { createActionTrackerFilterConfig } from '@/config/actionTrackerFilterConfig';
import { ActionTrackerHeader } from '@/components/ActionTracker/ActionTrackerHeader';
import { ActionTrackerSummary } from '@/components/ActionTracker/ActionTrackerSummary';
import { ActionTrackerTable } from '@/components/ActionTracker/ActionTrackerTable';
// Import mock data directly
import { others as actionTrackerData } from '@/data/actionTracker';

export default function ActionTracker() {
  const [selectedSummaryStatuses, setSelectedSummaryStatuses] = useState<string[]>([]);

  const { 
    filters, 
    updateFilter, 
    clearFilters, 
    hasActiveFilters,
    setFilters
  } = useGenericFilters();

  const {
    isFavorite,
    saveFavoriteFilter,
    removeFavoriteFilter,
    loadFavoriteFilter,
    hasActiveFilters: hasFavoriteFilters
  } = useFavoriteFilters(filters);

  const handleLoadFavorite = () => {
    const favoriteFilters = loadFavoriteFilter();
    setFilters(favoriteFilters);
  };

  // Get department data from local action tracker data
  const { 
    departmentStructure, 
    departmentOptions, 
    loading: departmentLoading 
  } = useLocalDepartmentData(actionTrackerData);

  const handleSummaryStatusToggle = (status: string) => {
    const newStatuses = selectedSummaryStatuses.includes(status)
      ? selectedSummaryStatuses.filter(s => s !== status)
      : [...selectedSummaryStatuses, status];
    
    setSelectedSummaryStatuses(newStatuses);
    updateFilter('statuses', newStatuses);
  };

  const handleClearSummarySelection = () => {
    setSelectedSummaryStatuses([]);
    updateFilter('statuses', []);
  };

  // Handler for summary box clicks (category filter)
  const onSummaryBoxClick = (ticketType?: string) => {
    if (!ticketType) {
      // Clear all categories filter if total is clicked
      updateFilter('categories', []);
    } else {
      const currentCategories = filters.categories || [];
      const newCategories = currentCategories.includes(ticketType)
        ? currentCategories.filter(c => c !== ticketType)
        : [...currentCategories, ticketType];
      updateFilter('categories', newCategories);
    }
  };

  const filteredData = useMemo(() => {
    return actionTrackerData.filter(item => {
      if (filters.departments?.length > 0 && !filters.departments.includes(item.department)) {
        return false;
      }
      if (filters.statuses?.length > 0 && !filters.statuses.includes(item.status)) {
        return false;
      }
      if (filters.categories?.length > 0 && !filters.categories.includes(item.ticketType)) {
        return false;
      }
      return true;
    });
  }, [filters, actionTrackerData]);

  // Get unique statuses and categories from data
  const statusOptions = [...new Set(actionTrackerData.map(item => item.status))];
  const categoryOptions = [...new Set(actionTrackerData.map(item => item.ticketType))];

  const filterConfig = useMemo(() => {
    if (departmentLoading) {
      return createActionTrackerFilterConfig([], {}, statusOptions, categoryOptions);
    }
    
    return createActionTrackerFilterConfig(
      departmentOptions,
      departmentStructure,
      statusOptions,
      categoryOptions
    );
  }, [departmentOptions, departmentStructure, statusOptions, categoryOptions, departmentLoading]);

  if (departmentLoading) {
    return (
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg sm:rounded-3xl p-6 sm:p-10">
          <div className="max-w-full mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg sm:rounded-3xl p-6 sm:p-10">
        <div className="max-w-full mx-auto">
          <div className="divide-y divide-gray-200">
            <ActionTrackerHeader
              filterConfig={filterConfig}
              filters={filters}
              onFilterUpdate={updateFilter}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
              isFavorite={isFavorite}
              onSaveFavorite={saveFavoriteFilter}
              onRemoveFavorite={removeFavoriteFilter}
              onLoadFavorite={handleLoadFavorite}
            />

            <div className="py-8 space-y-6">
              <ActionTrackerSummary 
                filteredInsights={filteredData}
                hasActiveFilters={hasActiveFilters}
                onSummaryBoxClick={onSummaryBoxClick}
                filters={filters}
              />

              <ActionTrackerTable insights={filteredData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}