
import { Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface FavoriteFilterButtonProps {
  isFavorite: boolean;
  hasActiveFilters: boolean;
  onSave: () => void;
  onRemove: () => void;
  onLoad: () => void;
}

export const FavoriteFilterButton = ({
  isFavorite,
  hasActiveFilters,
  onSave,
  onRemove,
  onLoad
}: FavoriteFilterButtonProps) => {
  const handleClick = () => {
    if (isFavorite) {
      onRemove();
    } else if (hasActiveFilters) {
      onSave();
    } else {
      onLoad();
    }
  };

  const getTooltipText = () => {
    if (isFavorite) {
      return 'Remove from favourites';
    } else if (hasActiveFilters) {
      return 'Save current filters as favourite';
    } else {
      return 'Load favourite filters';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleClick}
            className={cn(
              "h-9 w-9 flex items-center justify-center rounded-md transition-colors",
              isFavorite 
                ? "text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50" 
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            )}
          >
            <Star 
              size={18} 
              className={cn(
                isFavorite ? "fill-yellow-500" : ""
              )}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
