
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface MultiSelectToggleProps {
  options: { value: string; label: string; count?: number }[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  className?: string;
}

export const MultiSelectToggle = ({
  options,
  selectedValues,
  onSelectionChange,
  className
}: MultiSelectToggleProps) => {
  const handleValueChange = (values: string[]) => {
    onSelectionChange(values);
  };

  return (
    <ToggleGroup
      type="multiple"
      value={selectedValues}
      onValueChange={handleValueChange}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-800 border border-gray-200 hover:bg-gray-50"
        >
          {option.label}
          {option.count !== undefined && (
            <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
              {option.count}
            </span>
          )}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
