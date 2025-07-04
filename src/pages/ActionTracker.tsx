import { useState, useMemo } from 'react';
import { useLocalDepartmentData } from '@/hooks/useLocalDepartmentData';
import { useGenericFilters } from '@/hooks/useGenericFilters';
import { useFavoriteFilters } from '@/hooks/useFavoriteFilters';
import { useActionTrackerApi } from '@/hooks/useActionTrackerApi';
import { createActionTrackerFilterConfig } from '@/config/actionTrackerFilterConfig';
import { ActionTrackerHeader } from '@/components/ActionTracker/ActionTrackerHeader';
import { ActionTrackerSummary } from '@/components/ActionTracker/ActionTrackerSummary';
import { ActionTrackerTable } from '@/components/ActionTracker/ActionTrackerTable';
import { AlertCircle } from 'lucide-react';

export default function ActionTracker() {
  const [selectedSummaryStatuses, setSelectedSummaryStatuses] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch data from API
  const { data: actionTrackerData, loading: apiLoading, error: apiError, refetch } = useActionTrackerApi(refreshKey);

  // Debug logs
  console.log('🎯 ActionTracker Page Debug:');
  console.log('📊 API Data:', actionTrackerData);
  console.log('⏳ Loading:', apiLoading);
  console.log('❌ Error:', apiError);
  console.log('🔢 Data count:', actionTrackerData?.length || 0);

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

  const handleRefresh = () => {
    // Force re-render and refetch data from API
    setRefreshKey(prev => prev + 1);
    refetch();
  };

  const handleLoadFavorite = () => {
    const favoriteFilters = loadFavoriteFilter();
    setFilters(favoriteFilters);
  };

  // Get department data from API data
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
      // Enhanced department filtering logic - check both department and subDepartment
      if (filters.departments?.length > 0) {
        const matchesDepartment = filters.departments.includes(item.department);
        const matchesSubDepartment = filters.departments.includes(item.subDepartment);
        
        if (!matchesDepartment && !matchesSubDepartment) {
          return false;
        }
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

  // Get unique statuses and categories from API data
  const statusOptions = [...new Set(actionTrackerData.map(item => item.status))];
  const categoryOptions = [...new Set(actionTrackerData.map(item => item.ticketType))];

  const filterConfig = useMemo(() => {
    if (departmentLoading || apiLoading) {
      return createActionTrackerFilterConfig([], {}, [], []);
    }
    
    return createActionTrackerFilterConfig(
      departmentOptions,
      departmentStructure,
      statusOptions,
      categoryOptions
    );
  }, [departmentOptions, departmentStructure, statusOptions, categoryOptions, departmentLoading, apiLoading]);

  // Handle loading states
  if (apiLoading || departmentLoading) {
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

  // Handle API errors
  if (apiError) {
    return (
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg sm:rounded-3xl p-6 sm:p-10">
          <div className="max-w-full mx-auto">
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
              <p className="text-gray-600 mb-4">{apiError}</p>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try Again
              </button>
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
              onRefresh={handleRefresh}
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