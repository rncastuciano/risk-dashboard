import { useState, useMemo } from 'react';
import { useLocalDepartmentData } from '@/hooks/useLocalDepartmentData';
import { useRiskCategoryData } from '@/hooks/useRiskCategoryData';
import { useGenericFilters } from '@/hooks/useGenericFilters';
import { useFavoriteFilters } from '@/hooks/useFavoriteFilters';
import { MetricsHeader } from './Metrics/MetricsHeader';
import { MetricsSummaryCards } from './Metrics/MetricsSummaryCards';
import { MetricsHierarchicalTable } from './Metrics/MetricsHierarchicalTable';
import { createMetricsFilterConfig } from '@/config/metricsFilterConfig';
// Import mock data directly
import metricsData from '@/data/metrics';

export default function Metrics() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [expandAll, setExpandAll] = useState(true);
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

  // Use mock metrics data instead of Supabase
  // const { data: metricsData = [], isLoading: metricsLoading, error: metricsError } = useSupabaseMetrics();

  // Get department data from local metrics data
  const { 
    departmentStructure, 
    departmentOptions, 
    loading: departmentLoading 
  } = useLocalDepartmentData(metricsData);

  const { 
    riskCategoryStructure, 
    categoryOptions, 
    loading: categoryLoading 
  } = useRiskCategoryData();

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

  const toggleItemExpansion = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      const itemsToRemove = Array.from(newExpanded).filter(id => id.startsWith(itemId));
      itemsToRemove.forEach(id => newExpanded.delete(id));
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const toggleExpandAll = () => {
    if (expandAll) {
      setExpandedItems(new Set());
    } else {
      const allItems = new Set<string>();
      const principalCategories = [...new Set(filteredMetrics.map(m => m.principalRiskCategory))];
      
      principalCategories.forEach(category => {
        const principalKey = `-${category}`;
        allItems.add(principalKey);
        
        const metricsInCategory = filteredMetrics.filter(m => m.principalRiskCategory === category);
        const subCategories = [...new Set(metricsInCategory.map(m => m.subRiskCategory).filter(Boolean))];
        
        subCategories.forEach(subCategory => {
          const subKey = `${principalKey}-${subCategory}`;
          allItems.add(subKey);
        });
      });
      
      setExpandedItems(allItems);
    }
    setExpandAll(!expandAll);
  };

  const filteredMetrics = useMemo(() => {
    return metricsData.filter(metric => {
      // Enhanced department filtering logic - check both department and subDepartment
      if (filters.departments?.length > 0) {
        const matchesDepartment = filters.departments.includes(metric.department);
        const matchesSubDepartment = filters.departments.includes(metric.subDepartment);
        
        if (!matchesDepartment && !matchesSubDepartment) {
          return false;
        }
      }
      
      if (filters.statuses?.length > 0 && !filters.statuses.includes(metric.status)) {
        return false;
      }
      if (filters.categories?.length > 0 && !filters.categories.includes(metric.principalRiskCategory)) {
        return false;
      }
      return true;
    });
  }, [filters, metricsData]);

  const statusOptions = ['Within Tolerance', 'Near Breach', 'Tolerance Breach'];

  // Create status toggle options with counts
  const statusToggleOptions = useMemo(() => {
    return statusOptions.map(status => ({
      value: status,
      label: status,
      count: metricsData.filter(m => m.status === status).length
    }));
  }, [metricsData]);

  const filterConfig = useMemo(() => {
    if (departmentLoading || categoryLoading) {
      return createMetricsFilterConfig([], {}, statusOptions, [], {});
    }
    
    return createMetricsFilterConfig(
      departmentOptions,
      departmentStructure,
      statusOptions,
      categoryOptions,
      riskCategoryStructure
    );
  }, [
    departmentOptions, 
    departmentStructure, 
    categoryOptions, 
    riskCategoryStructure, 
    departmentLoading, 
    categoryLoading
  ]);

  const initializeExpandedItems = () => {
    const allItems = new Set<string>();
    const principalCategories = [...new Set(filteredMetrics.map(m => m.principalRiskCategory))];
    
    principalCategories.forEach(category => {
      const principalKey = `-${category}`;
      allItems.add(principalKey);
      
      const metricsInCategory = filteredMetrics.filter(m => m.principalRiskCategory === category);
      const subCategories = [...new Set(metricsInCategory.map(m => m.subRiskCategory).filter(Boolean))];
      
      subCategories.forEach(subCategory => {
        const subKey = `${principalKey}-${subCategory}`;
        allItems.add(subKey);
      });
    });
    
    return allItems;
  };

  useMemo(() => {
    if (!departmentLoading && !categoryLoading && filteredMetrics.length > 0 && expandedItems.size === 0) {
      setExpandedItems(initializeExpandedItems());
    }
  }, [departmentLoading, categoryLoading, filteredMetrics.length]);

  // Remove metricsLoading and metricsError checks since mock data is always available
  // If you want to keep loading/error UI, you can add your own state for mock loading/error

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg sm:rounded-3xl p-6 sm:p-10">
        <div className="max-w-full mx-auto">
          <div className="divide-y divide-gray-200">
            <MetricsHeader
              filterConfig={filterConfig}
              filters={filters}
              onFilterUpdate={updateFilter}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
              expandAll={expandAll}
              onToggleExpandAll={toggleExpandAll}
              isFavorite={isFavorite}
              onSaveFavorite={saveFavoriteFilter}
              onRemoveFavorite={removeFavoriteFilter}
              onLoadFavorite={handleLoadFavorite}
            />

            <div className="py-8 space-y-6">
              <MetricsSummaryCards 
                filteredMetrics={filteredMetrics}
                selectedStatuses={selectedSummaryStatuses}
                onStatusToggle={handleSummaryStatusToggle}
                onClearAll={handleClearSummarySelection}
              />

              <MetricsHierarchicalTable
                filteredMetrics={filteredMetrics}
                expandedItems={expandedItems}
                onToggleExpansion={toggleItemExpansion}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}