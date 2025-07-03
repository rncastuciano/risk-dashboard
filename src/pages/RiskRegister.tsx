
import { useState, useMemo } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { useRiskExpansion } from '@/hooks/useRiskExpansion';
import { useGenericFilters } from '@/hooks/useGenericFilters';
import { useLocalDepartmentData } from '@/hooks/useLocalDepartmentData';
import { useFavoriteFilters } from '@/hooks/useFavoriteFilters';
import { RiskRegisterPageHeader } from './RiskRegister/RiskRegisterPageHeader';
import { RiskRegisterTable } from './RiskRegister/RiskRegisterTable';
import { createRiskRegisterFilterConfig } from '@/config/riskRegisterFilterConfig';
import { Risk } from '@/types';
import { topLevelRisks, allRisksData } from '@/data';

export default function RiskRegister() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { filters: legacyFilters, clearFilters: legacyClearFilters, hasActiveFilters: legacyHasActiveFilters } = useFilters();

  // New generic filters for the dropdown
  const { 
    filters: dropdownFilters, 
    updateFilter: updateDropdownFilter, 
    clearFilters: clearDropdownFilters, 
    hasActiveFilters: hasActiveDropdownFilters,
    setFilters
  } = useGenericFilters();

  const {
    isFavorite,
    saveFavoriteFilter,
    removeFavoriteFilter,
    loadFavoriteFilter,
    hasActiveFilters: hasFavoriteFilters
  } = useFavoriteFilters(dropdownFilters);

  const handleLoadFavorite = () => {
    const favoriteFilters = loadFavoriteFilter();
    setFilters(favoriteFilters);
  };

  const handleRefresh = () => {
    // Force re-render and clear any cached state
    setRefreshKey(prev => prev + 1);
    // Optionally clear filters
    // clearDropdownFilters();
  };

  // Get department data from local risk data using the new hook
  const { 
    departmentStructure, 
    departmentOptions 
  } = useLocalDepartmentData(allRisksData);

  // Generate risk category structure from mock data
  const riskCategoryStructure = useMemo(() => {
    const structure: { [principal: string]: string[] } = {};
    
    allRisksData.forEach(risk => {
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
  }, []);

  const filteredRisks = useMemo(() => {
    return topLevelRisks.filter(risk => {
      // Enhanced department filtering logic
      if (dropdownFilters.departments?.length > 0) {
        const matchesDepartment = dropdownFilters.departments.includes(risk.department);
        const matchesSubDepartment = dropdownFilters.departments.includes(risk.subDepartment);
        
        if (!matchesDepartment && !matchesSubDepartment) {
          return false;
        }
      }
      
      if (dropdownFilters.ratings?.length > 0 && risk.rating && !dropdownFilters.ratings.includes(risk.rating)) {
        return false;
      }
      if (dropdownFilters.statuses?.length > 0 && !dropdownFilters.statuses.includes(risk.status)) {
        return false;
      }
      
      // Enhanced category filtering logic - hierarchical support
      if (dropdownFilters.categories?.length > 0) {
        const matchesPrincipalCategory = risk.principalRiskCategory && dropdownFilters.categories.includes(risk.principalRiskCategory);
        const matchesSubCategory = risk.subRiskCategory && dropdownFilters.categories.includes(risk.subRiskCategory);
        
        if (!matchesPrincipalCategory && !matchesSubCategory) {
          return false;
        }
      }
      
      return true;
    });
  }, [dropdownFilters]);

  const { expandedItems, expandAll, toggleItemExpansion, toggleExpandAll } = useRiskExpansion(filteredRisks, allRisksData);

  // Explicitly type the getChildItems function
  const getChildItems = (parentId: number): Risk[] => {
    return allRisksData.filter(item => item.parentId === parentId);
  };

  // Filter options - now using actual data from mock data
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
