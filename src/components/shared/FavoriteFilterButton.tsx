
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
          <Star 
            size={16} 
            onClick={handleClick}
            className={cn(
              "cursor-pointer transition-colors hover:scale-110",
              isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400 hover:text-gray-600"
            )}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
