
import { useState } from 'react';
import { Check, ChevronDown, ChevronRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface RiskCategoryStructure {
  [principal: string]: string[];
}

interface HierarchicalRiskCategoryDropdownProps {
  title: string;
  riskCategoryStructure: RiskCategoryStructure;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export const HierarchicalRiskCategoryDropdown = ({
  title,
  riskCategoryStructure,
  selectedValues,
  onChange,
  placeholder = "Select categories..."
}: HierarchicalRiskCategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategoryExpansion = (category: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePrincipalCategoryChange = (principal: string, checked: boolean, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const subCategories = riskCategoryStructure[principal] || [];
    const allCategoryValues = [principal, ...subCategories];
    
    if (checked) {
      const newValues = [...new Set([...selectedValues, ...allCategoryValues])];
      onChange(newValues);
    } else {
      const newValues = selectedValues.filter(c => !allCategoryValues.includes(c));
      onChange(newValues);
    }
  };

  const handleSubCategoryChange = (subCategory: string, checked: boolean, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (checked) {
      onChange([...selectedValues, subCategory]);
    } else {
      onChange(selectedValues.filter(c => c !== subCategory));
    }
  };

  const getPrincipalCategorySelectionState = (principal: string) => {
    const subCategories = riskCategoryStructure[principal] || [];
    const isPrincipalSelected = selectedValues.includes(principal);
    const selectedSubCategories = subCategories.filter(sub => selectedValues.includes(sub));
    
    if (isPrincipalSelected || selectedSubCategories.length === subCategories.length) {
      return 'selected';
    } else if (selectedSubCategories.length > 0) {
      return 'partial';
    }
    return 'none';
  };

  const isSubCategorySelected = (subCategory: string) => {
    return selectedValues.includes(subCategory);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) return selectedValues[0];
    return `${selectedValues.length} selected`;
  };

  const handleSelectAll = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const allValues = Object.keys(riskCategoryStructure).concat(
      Object.values(riskCategoryStructure).flat()
    );
    const newValues = selectedValues.length === allValues.length ? [] : allValues;
    onChange(newValues);
  };

  const allValues = Object.keys(riskCategoryStructure).concat(
    Object.values(riskCategoryStructure).flat()
  );

  if (Object.keys(riskCategoryStructure).length === 0) {
    return (
      <Button variant="outline" className="w-full justify-between" disabled>
        <span className="truncate">Loading categories...</span>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span className="truncate">{getDisplayText()}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 max-h-80 overflow-y-auto bg-white border shadow-lg z-50">
        <DropdownMenuItem
          onClick={handleSelectAll}
          className="font-medium border-b"
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              selectedValues.length === allValues.length ? "opacity-100" : "opacity-0"
            )}
          />
          Select All
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {Object.keys(riskCategoryStructure).map((principal) => {
          const subCategories = riskCategoryStructure[principal] || [];
          const selectionState = getPrincipalCategorySelectionState(principal);
          const isExpanded = expandedCategories.includes(principal);

          return (
            <div key={principal}>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="cursor-default p-0"
              >
                <div className="flex items-center w-full px-2 py-1.5">
                  <div className="flex items-center flex-1">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={(e) => handlePrincipalCategoryChange(principal, selectionState !== 'selected', e)}
                    >
                      {selectionState === 'selected' && (
                        <Check className="mr-2 h-4 w-4 opacity-100" />
                      )}
                      {selectionState === 'partial' && (
                        <Minus className="mr-2 h-4 w-4 opacity-100" />
                      )}
                      {selectionState === 'none' && (
                        <div className="mr-2 h-4 w-4" />
                      )}
                      <span className="font-medium">{principal}</span>
                    </div>
                  </div>
                  
                  {subCategories.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto"
                      onClick={(e) => toggleCategoryExpansion(principal, e)}
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </DropdownMenuItem>
              
              {isExpanded && subCategories.map((subCategory) => (
                <DropdownMenuItem
                  key={subCategory}
                  onClick={(e) => handleSubCategoryChange(subCategory, !isSubCategorySelected(subCategory), e)}
                  className="cursor-pointer pl-8"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isSubCategorySelected(subCategory) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="text-gray-600">{subCategory}</span>
                </DropdownMenuItem>
              ))}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
