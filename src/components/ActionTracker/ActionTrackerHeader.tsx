
import { FilterDropdown } from '@/components/shared/FilterDropdown';
import { FilterConfig, GenericFilterState } from '@/types/filterConfig';

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
  onLoadFavorite
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
