
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MultiSelectDropdownProps {
  title: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export const MultiSelectDropdown = ({
  title,
  options,
  selectedValues,
  onChange,
  placeholder = "Select options..."
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const handleSelectAll = () => {
    const newValues = selectedValues.length === options.length ? [] : options;
    onChange(newValues);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) return selectedValues[0];
    return `${selectedValues.length} selected`;
  };

  const isAllSelected = selectedValues.length === options.length;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span className="truncate">{getDisplayText()}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 bg-white border shadow-lg z-50 p-0" 
        align="start"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="p-3">
          <div className="mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="w-full"
            >
              {isAllSelected ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
          <div className="space-y-2">
            {options.map((option) => (
              <div 
                key={option} 
                className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                <Checkbox
                  id={`checkbox-${option}`}
                  checked={selectedValues.includes(option)}
                  onChange={() => handleSelect(option)}
                  className="cursor-pointer"
                />
                <label 
                  htmlFor={`checkbox-${option}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
