
import { Button } from '@/components/ui/button';
import { AddNewItemDropdown } from '@/components/layout/AddNewItemDropdown';
import { FilterDropdown } from '@/components/shared/FilterDropdown';
import { FilterConfig, GenericFilterState } from '@/types/filterConfig';
import { RefreshCw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RiskRegisterPageHeaderProps {
  expandAll: boolean;
  onToggleExpandAll: () => void;
  filterConfig?: FilterConfig;
  filters?: GenericFilterState;
  onFilterUpdate?: (key: string, values: string[]) => void;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
  // Favorite filter props
  isFavorite?: boolean;
  onSaveFavorite?: () => void;
  onRemoveFavorite?: () => void;
  onLoadFavorite?: () => void;
  onRefresh?: () => void;
}

export function RiskRegisterPageHeader({
  expandAll,
  onToggleExpandAll,
  filterConfig,
  filters,
  onFilterUpdate,
  hasActiveFilters,
  onClearFilters,
  isFavorite,
  onSaveFavorite,
  onRemoveFavorite,
  onLoadFavorite,
  onRefresh
}: RiskRegisterPageHeaderProps) {
  return (
    <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 py-0">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Risk and Controls Register
            </h1>
            <p className="text-gray-500 py-[7px]">
              Hierarchical view of risks, controls, and related risk events from Azure DevOps Boards
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {onRefresh && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={onRefresh}
                      className="h-9 w-9 flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <RefreshCw size={18} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Refresh data</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <AddNewItemDropdown />
            <Button
              variant="outline"
              onClick={onToggleExpandAll}
            >
              {expandAll ? 'Collapse All' : 'Expand All'}
            </Button>
            {filterConfig && filters && onFilterUpdate && (
              <FilterDropdown
                config={filterConfig}
                filters={filters}
                onFilterUpdate={onFilterUpdate}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={onClearFilters}
                isFavorite={isFavorite}
                onSaveFavorite={onSaveFavorite}
                onRemoveFavorite={onRemoveFavorite}
                onLoadFavorite={onLoadFavorite}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center text-sm bg-blue-50 text-blue-700 p-3 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          Data is synchronized with Azure DevOps Boards. Click on ticket IDs to view details in Azure DevOps.
        </span>
      </div>
    </div>
  );
}
