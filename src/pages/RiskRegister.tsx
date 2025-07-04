import { useState, useMemo, useEffect } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { useRiskExpansion } from '@/hooks/useRiskExpansion';
import { useGenericFilters } from '@/hooks/useGenericFilters';
import { useLocalDepartmentData } from '@/hooks/useLocalDepartmentData';
import { useFavoriteFilters } from '@/hooks/useFavoriteFilters';
import { useRiskRegisterApi } from '@/hooks/useRiskRegisterApi';
import { RiskRegisterPageHeader } from './RiskRegister/RiskRegisterPageHeader';
import { RiskRegisterTable } from './RiskRegister/RiskRegisterTable';
import { createRiskRegisterFilterConfig } from '@/config/riskRegisterFilterConfig';
import { Risk } from '@/types';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function RiskRegister() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { filters: legacyFilters, clearFilters: legacyClearFilters, hasActiveFilters: legacyHasActiveFilters } = useFilters();

  // Fetch data from API
  const { risks: topLevelRisks, allRisksData, loading: apiLoading, error: apiError, refetch } = useRiskRegisterApi(refreshKey);

  // Debug logs
  console.log('🎯 Risk Register Page Debug:');
  console.log('📊 API Data:', { topLevelRisks, allRisksData });
  console.log('⏳ Loading:', apiLoading);
  console.log('❌ Error:', apiError);
  console.log('🔢 Top-level risks count:', topLevelRisks?.length || 0);
  console.log('🔢 All data count:', allRisksData?.length || 0);

  // New generic filters for the dropdown
  const { 
    filters: dropdownFilters, 
    updateFilter: updateDropdownFilter, 
    clearFilters: clearDropdownFilters, 
    hasActiveFilters: hasActiveDropdownFilters,
    setFilters
  } = useGenericFilters({}, 'riskRegister');

  // Clear filters on initial load to see all data
  useEffect(() => {
    if (topLevelRisks && topLevelRisks.length > 0 && dropdownFilters.categories?.length > 0) {
      console.log('🧹 Clearing filters on initial load to show all categories');
      console.log('🧹 Current categories filter:', dropdownFilters.categories);
      clearDropdownFilters();
    }
  }, [topLevelRisks?.length, clearDropdownFilters]);

  // Temporarily clear localStorage for debugging
  useEffect(() => {
    console.log('🧹 Clearing Risk Register filters from localStorage for debugging');
    localStorage.removeItem('filters_riskRegister');
  }, []);

  const {
    isFavorite,
    saveFavoriteFilter,
    removeFavoriteFilter,
    loadFavoriteFilter,
    hasActiveFilters: hasFavoriteFilters
  } = useFavoriteFilters(dropdownFilters, setFilters, 'riskRegister');

  const handleLoadFavorite = () => {
    loadFavoriteFilter(); // Now handles the filter loading internally
  };

  const handleRefresh = () => {
    // Force re-render and refetch data from API
    setRefreshKey(prev => prev + 1);
    refetch();
  };

  // Get department data from local risk data using the new hook
  const { 
    departmentStructure, 
    departmentOptions 
  } = useLocalDepartmentData(allRisksData || []);

  // Generate risk category structure from API data
  const riskCategoryStructure = useMemo(() => {
    const structure: { [principal: string]: string[] } = {};
    
    (allRisksData || []).forEach(risk => {
      if (risk.principalRiskCategory) {
        if (!structure[risk.principalRiskCategory]) {
          structure[risk.principalRiskCategory] = [];
        }
        
        if (risk.subRiskCategory && !structure[risk.principalRiskCategory].includes(risk.subRiskCategory)) {
          structure[risk.principalRiskCategory].push(risk.subRiskCategory);
        }
      }
    });

    // Sort principal categories and sub-categories for consistent display
    Object.keys(structure).forEach(principal => {
      structure[principal].sort();
    });

    return structure;
  }, [allRisksData]);

  const filteredRisks = useMemo(() => {
    if (!topLevelRisks) return [];
    
    console.log('🔍 Filtering analysis - Input data:');
    console.log('🔍 Top-level risks count:', topLevelRisks.length);
    
    // Check categories in input data
    const inputCategories = [...new Set(topLevelRisks.map(item => item.principalRiskCategory))];
    console.log('🔍 Input categories:', inputCategories);
    
    // Show distribution of categories in input
    const inputCategoryDistribution = inputCategories.map(cat => ({
      category: cat,
      count: topLevelRisks.filter(r => r.principalRiskCategory === cat).length
    }));
    console.log('🔍 Input category distribution:', inputCategoryDistribution);
    
    const filtered = topLevelRisks.filter(risk => {
      // Enhanced department filtering logic
      if (dropdownFilters.departments?.length > 0) {
        const matchesDepartment = dropdownFilters.departments.includes(risk.department);
        const matchesSubDepartment = dropdownFilters.departments.includes(risk.subDepartment);
        
        if (!matchesDepartment && !matchesSubDepartment) {
          console.log('🔍 Risk filtered out by department:', risk.ticketId, risk.department, risk.subDepartment);
          return false;
        }
      }
      
      if (dropdownFilters.ratings?.length > 0 && risk.rating && !dropdownFilters.ratings.includes(risk.rating)) {
        console.log('🔍 Risk filtered out by rating:', risk.ticketId, risk.rating);
        return false;
      }
      if (dropdownFilters.statuses?.length > 0 && !dropdownFilters.statuses.includes(risk.status)) {
        console.log('🔍 Risk filtered out by status:', risk.ticketId, risk.status);
        return false;
      }
      
      // Enhanced category filtering logic - hierarchical support
      if (dropdownFilters.categories?.length > 0) {
        const matchesPrincipalCategory = risk.principalRiskCategory && dropdownFilters.categories.includes(risk.principalRiskCategory);
        const matchesSubCategory = risk.subRiskCategory && dropdownFilters.categories.includes(risk.subRiskCategory);
        
        if (!matchesPrincipalCategory && !matchesSubCategory) {
          console.log('🔍 Risk filtered out by category:', risk.ticketId, risk.principalRiskCategory, risk.subRiskCategory);
          return false;
        }
      }
      
      return true;
    });
    
    console.log('🔍 Filtering results:');
    console.log('🔍 Filtered risks count:', filtered.length);
    
    // Check categories in filtered data
    const filteredCategories = [...new Set(filtered.map(item => item.principalRiskCategory))];
    console.log('🔍 Filtered categories:', filteredCategories);
    
    // Show distribution of categories in filtered results
    const filteredCategoryDistribution = filteredCategories.map(cat => ({
      category: cat,
      count: filtered.filter(r => r.principalRiskCategory === cat).length
    }));
    console.log('🔍 Filtered category distribution:', filteredCategoryDistribution);
    
    return filtered;
  }, [dropdownFilters, topLevelRisks]);

  // Additional debug logs after filtered risks are calculated
  console.log('🔍 Risk Register Page - Filtered risks analysis:');
  console.log('🔍 Top-level risks from API:', topLevelRisks?.length || 0);
  console.log('🔍 Top-level risks sample:', topLevelRisks?.slice(0, 3).map(risk => ({
    ticketId: risk.ticketId,
    title: risk.title,
    principalRiskCategory: risk.principalRiskCategory,
    subRiskCategory: risk.subRiskCategory
  })));
  console.log('🔍 Filtered risks count:', filteredRisks?.length || 0);
  console.log('🔍 Filtered risks sample:', filteredRisks?.slice(0, 3).map(risk => ({
    ticketId: risk.ticketId,
    title: risk.title,
    principalRiskCategory: risk.principalRiskCategory,
    subRiskCategory: risk.subRiskCategory
  })));
  console.log('🎛️ Current dropdown filters:', dropdownFilters);
  console.log('🚨 FILTER CATEGORIES:', dropdownFilters.categories);
  
  // Check categories in filtered risks
  const filteredCategories = [...new Set(filteredRisks.map(item => item.principalRiskCategory))];
  console.log('🔍 Principal Risk Categories in filtered data:', filteredCategories);

  const { expandedItems, expandAll, toggleItemExpansion, toggleExpandAll } = useRiskExpansion(filteredRisks, allRisksData);

  // Explicitly type the getChildItems function
  const getChildItems = (parentId: number): Risk[] => {
    return (allRisksData || []).filter(item => item.parentId === parentId);
  };

  // Filter options - now using actual data from API
  const ratingOptions = ['Critical', 'High', 'Medium', 'Low'];
  const statusOptions = ['Active', 'Closed', 'Open', 'In Progress', 'Planned', 'Under Review'];

  // Create filter configuration
  const filterConfig = createRiskRegisterFilterConfig(
    departmentOptions,
    departmentStructure,
    riskCategoryStructure,
    ratingOptions,
    statusOptions
  );

  // Handle loading state
  if (apiLoading) {
    return (
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg sm:rounded-3xl p-6 sm:p-10">
          <div className="max-w-full mx-auto">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Risk Register Data</h3>
                <p className="text-gray-600">Please wait while we fetch the latest data...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle API error
  if (apiError) {
    return (
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg sm:rounded-3xl p-6 sm:p-10">
          <div className="max-w-full mx-auto">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
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
      </div>
    );
  }

  // Handle empty state
  if (!topLevelRisks || topLevelRisks.length === 0) {
    return (
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg sm:rounded-3xl p-6 sm:p-10">
          <div className="max-w-full mx-auto">
            <div className="divide-y divide-gray-200">
              <RiskRegisterPageHeader
                expandAll={expandAll}
                onToggleExpandAll={toggleExpandAll}
                filterConfig={filterConfig}
                filters={dropdownFilters}
                onFilterUpdate={updateDropdownFilter}
                hasActiveFilters={hasActiveDropdownFilters}
                onClearFilters={clearDropdownFilters}
                isFavorite={isFavorite}
                onSaveFavorite={saveFavoriteFilter}
                onRemoveFavorite={removeFavoriteFilter}
                onLoadFavorite={handleLoadFavorite}
                onRefresh={handleRefresh}
              />
              
              <div className="py-8">
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Risk Data Available</h3>
                  <p className="text-gray-600 mb-4">
                    No risk data could be loaded from the API endpoints. This could be due to:
                  </p>
                  <ul className="text-sm text-gray-500 text-left max-w-md mx-auto mb-6">
                    <li>• API server is not running</li>
                    <li>• Network connectivity issues</li>
                    <li>• No data available in the database</li>
                    <li>• API endpoint configuration issues</li>
                  </ul>
                  <button
                    onClick={handleRefresh}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Refresh Data
                  </button>
                </div>
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
            <RiskRegisterPageHeader
              expandAll={expandAll}
              onToggleExpandAll={toggleExpandAll}
              filterConfig={filterConfig}
              filters={dropdownFilters}
              onFilterUpdate={updateDropdownFilter}
              hasActiveFilters={hasActiveDropdownFilters}
              onClearFilters={clearDropdownFilters}
              isFavorite={isFavorite}
              onSaveFavorite={saveFavoriteFilter}
              onRemoveFavorite={removeFavoriteFilter}
              onLoadFavorite={handleLoadFavorite}
              onRefresh={handleRefresh}
            />
            
            <div className="py-8">
              <RiskRegisterTable
                filteredRisks={filteredRisks}
                expandedItems={expandedItems}
                onToggleExpansion={toggleItemExpansion}
                getChildItems={getChildItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
