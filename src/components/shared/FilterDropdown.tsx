
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { GenericFilter } from '@/components/shared/GenericFilter';
import { FavoriteFilterButton } from '@/components/shared/FavoriteFilterButton';
import { FilterConfig, GenericFilterState } from '@/types/filterConfig';

interface FilterDropdownProps {
  config: FilterConfig;
  filters: GenericFilterState;
  onFilterUpdate: (key: string, values: string[]) => void;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
  title?: string;
  // Favorite filter props
  isFavorite?: boolean;
  onSaveFavorite?: () => void;
  onRemoveFavorite?: () => void;
  onLoadFavorite?: () => void;
}

export const FilterDropdown = ({
  config,
  filters,
  onFilterUpdate,
  hasActiveFilters,
  onClearFilters,
  title = "Filters",
  isFavorite,
  onSaveFavorite,
  onRemoveFavorite,
  onLoadFavorite
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const showFavoriteIcon = isFavorite !== undefined && onSaveFavorite && onRemoveFavorite && onLoadFavorite;

  return (
    <div className="flex items-center">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Filter size={16} />
            <span>Filter</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[400px] p-0 bg-white border shadow-lg z-50" 
          align="start"
          side="bottom"
          sideOffset={8}
        >
          <GenericFilter
            config={config}
            filters={filters}
            onFilterUpdate={onFilterUpdate}
            title={title}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={onClearFilters}
          />
        </PopoverContent>
      </Popover>
      
      {showFavoriteIcon && (
        <div className="ml-2">
          <FavoriteFilterButton
            isFavorite={isFavorite!}
            hasActiveFilters={hasActiveFilters || false}
            onSave={onSaveFavorite!}
            onRemove={onRemoveFavorite!}
            onLoad={onLoadFavorite!}
          />
        </div>
      )}
    </div>
  );
};
