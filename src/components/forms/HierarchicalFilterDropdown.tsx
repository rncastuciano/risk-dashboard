
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

interface DepartmentStructure {
  [department: string]: string[];
}

interface HierarchicalFilterDropdownProps {
  title: string;
  departmentStructure: DepartmentStructure;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export const HierarchicalFilterDropdown = ({
  title,
  departmentStructure,
  selectedValues,
  onChange,
  placeholder = "Select departments..."
}: HierarchicalFilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);

  const toggleDepartmentExpansion = (department: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setExpandedDepartments(prev => 
      prev.includes(department) 
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  const handleDepartmentChange = (department: string, checked: boolean, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const subDepartments = departmentStructure[department] || [];
    const allDeptValues = [department, ...subDepartments];
    
    if (checked) {
      const newValues = [...new Set([...selectedValues, ...allDeptValues])];
      onChange(newValues);
    } else {
      const newValues = selectedValues.filter(d => !allDeptValues.includes(d));
      onChange(newValues);
    }
  };

  const handleSubDepartmentChange = (subDept: string, checked: boolean, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (checked) {
      onChange([...selectedValues, subDept]);
    } else {
      onChange(selectedValues.filter(d => d !== subDept));
    }
  };

  const getDepartmentSelectionState = (department: string) => {
    const subDepartments = departmentStructure[department] || [];
    const isDeptSelected = selectedValues.includes(department);
    const selectedSubDepts = subDepartments.filter(sub => selectedValues.includes(sub));
    
    if (isDeptSelected || selectedSubDepts.length === subDepartments.length) {
      return 'selected';
    } else if (selectedSubDepts.length > 0) {
      return 'partial';
    }
    return 'none';
  };

  const isSubDepartmentSelected = (subDept: string) => {
    return selectedValues.includes(subDept);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) return selectedValues[0];
    return `${selectedValues.length} selected`;
  };

  const handleSelectAll = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const allValues = Object.keys(departmentStructure).concat(
      Object.values(departmentStructure).flat()
    );
    const newValues = selectedValues.length === allValues.length ? [] : allValues;
    onChange(newValues);
  };

  const allValues = Object.keys(departmentStructure).concat(
    Object.values(departmentStructure).flat()
  );

  if (Object.keys(departmentStructure).length === 0) {
    return (
      <Button variant="outline" className="w-full justify-between" disabled>
        <span className="truncate">Loading departments...</span>
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

        {Object.keys(departmentStructure).map((department) => {
          const subDepartments = departmentStructure[department] || [];
          const selectionState = getDepartmentSelectionState(department);
          const isExpanded = expandedDepartments.includes(department);

          return (
            <div key={department}>
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
                      onClick={(e) => handleDepartmentChange(department, selectionState !== 'selected', e)}
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
                      <span className="font-medium">{department}</span>
                    </div>
                  </div>
                  
                  {subDepartments.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto"
                      onClick={(e) => toggleDepartmentExpansion(department, e)}
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
              
              {isExpanded && subDepartments.map((subDept) => (
                <DropdownMenuItem
                  key={subDept}
                  onClick={(e) => handleSubDepartmentChange(subDept, !isSubDepartmentSelected(subDept), e)}
                  className="cursor-pointer pl-8"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isSubDepartmentSelected(subDept) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="text-gray-600">{subDept}</span>
                </DropdownMenuItem>
              ))}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
