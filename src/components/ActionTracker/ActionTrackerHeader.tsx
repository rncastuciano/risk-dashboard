
import { FilterDropdown } from '@/components/shared/FilterDropdown';
import { FilterConfig, GenericFilterState } from '@/types/filterConfig';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ActionTrackerHeaderProps {
  filterConfig: FilterConfig;
  filters: GenericFilterState;
  onFilterUpdate: (key: string, values: string[]) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  isFavorite: boolean;
  onSaveFavorite: () => void;
  onRemoveFavorite: () => void;
  onLoadFavorite: () => void;
  onRefresh?: () => void;
}

export const ActionTrackerHeader = ({
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
}: ActionTrackerHeaderProps) => {
  return (
    <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 py-0">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Action Tracker
            </h1>
            <p className="text-gray-500 py-[7px]">
              Track and manage action items across departments and categories
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
          </div>
        </div>
      </div>
    </div>
  );
};
