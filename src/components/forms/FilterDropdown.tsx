
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterDropdownProps {
  title: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export const FilterDropdown = ({
  title,
  options,
  selectedValues,
  onChange,
  placeholder = "Select options..."
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const handleSelectAll = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const newValues = selectedValues.length === options.length ? [] : options;
    onChange(newValues);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) return selectedValues[0];
    return `${selectedValues.length} selected`;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span className="truncate">{getDisplayText()}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto bg-white border shadow-lg z-50">
        <DropdownMenuItem
          onClick={handleSelectAll}
          className="font-medium border-b"
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              selectedValues.length === options.length ? "opacity-100" : "opacity-0"
            )}
          />
          Select All
        </DropdownMenuItem>
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={(e) => handleSelect(option, e)}
            className="cursor-pointer"
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectedValues.includes(option) ? "opacity-100" : "opacity-0"
              )}
            />
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
