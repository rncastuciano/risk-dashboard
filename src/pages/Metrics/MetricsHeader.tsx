
import { FilterDropdown } from '@/components/shared/FilterDropdown';
import { FilterConfig, GenericFilterState } from '@/types/filterConfig';
import { Button } from '@/components/ui/button';

interface MetricsHeaderProps {
  filterConfig: FilterConfig;
  filters: GenericFilterState;
  onFilterUpdate: (key: string, values: string[]) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  expandAll: boolean;
  onToggleExpandAll: () => void;
  // Favorite filter props
  isFavorite?: boolean;
  onSaveFavorite?: () => void;
  onRemoveFavorite?: () => void;
  onLoadFavorite?: () => void;
}

export const MetricsHeader = ({
  filterConfig,
  filters,
  onFilterUpdate,
  hasActiveFilters,
  onClearFilters,
  expandAll,
  onToggleExpandAll,
  isFavorite,
  onSaveFavorite,
  onRemoveFavorite,
  onLoadFavorite
}: MetricsHeaderProps) => {
  return (
    <div className="pb-8 flex justify-between items-start">
      <div className="space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Risk Appetite Metrics
        </h1>
        <p className="text-gray-500 mt-2">
          Monitor key risk metrics against defined tolerances and thresholds
        </p>
        
        <div className="flex flex-wrap gap-4 items-center mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm">Within Tolerance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
            <span className="text-sm">Near Breach</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-sm">Tolerance Breach</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={onToggleExpandAll}
        >
          {expandAll ? 'Collapse All' : 'Expand All'}
        </Button>
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
  );
};
