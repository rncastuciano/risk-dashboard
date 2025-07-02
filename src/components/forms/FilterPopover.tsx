
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FilterState } from '@/types';

interface FilterPopoverProps {
  filters: FilterState;
  departmentOptions: string[];
  ticketTypeOptions: string[];
  onFilterUpdate: (key: keyof FilterState, values: string[]) => void;
  onClearFilters: () => void;
  children: React.ReactNode;
}

export const FilterPopover = ({
  filters,
  departmentOptions,
  ticketTypeOptions,
  onFilterUpdate,
  onClearFilters,
  children
}: FilterPopoverProps) => {
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);

  // Mock sub-departments for each department
  const departmentSubDepartments: Record<string, string[]> = {
    'Technology': ['IT Infrastructure', 'Cybersecurity'],
    'Finance': ['Accounting', 'Treasury'],
    'Operations': ['Supply Chain', 'Logistics'],
    'People': ['HR', 'Recruitment'],
    'Compliance': ['Legal & Compliance', 'Risk Management']
  };

  const toggleDepartmentExpansion = (department: string) => {
    setExpandedDepartments(prev => 
      prev.includes(department) 
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  const handleDepartmentChange = (department: string, checked: boolean) => {
    const subDepts = departmentSubDepartments[department] || [];
    const allDeptValues = [department, ...subDepts];
    
    if (checked) {
      // Add all department and sub-department values
      const newValues = [...new Set([...filters.departments, ...allDeptValues])];
      onFilterUpdate('departments', newValues);
    } else {
      // Remove all department and sub-department values
      const newValues = filters.departments.filter(d => !allDeptValues.includes(d));
      onFilterUpdate('departments', newValues);
    }
  };

  const handleSubDepartmentChange = (subDept: string, checked: boolean) => {
    if (checked) {
      onFilterUpdate('departments', [...filters.departments, subDept]);
    } else {
      onFilterUpdate('departments', filters.departments.filter(d => d !== subDept));
    }
  };

  const handleTicketTypeChange = (ticketType: string, checked: boolean) => {
    if (checked) {
      onFilterUpdate('ticketTypes', [...filters.ticketTypes, ticketType]);
    } else {
      onFilterUpdate('ticketTypes', filters.ticketTypes.filter(t => t !== ticketType));
    }
  };

  const isDepartmentChecked = (department: string) => {
    const subDepts = departmentSubDepartments[department] || [];
    const allDeptValues = [department, ...subDepts];
    return allDeptValues.some(value => filters.departments.includes(value));
  };

  const isSubDepartmentChecked = (subDept: string) => {
    return filters.departments.includes(subDept);
  };

  const isTicketTypeChecked = (ticketType: string) => {
    return filters.ticketTypes.includes(ticketType);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-white border shadow-lg z-50" align="end">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className='font-semibold text-lg'>Filters</h3>
            <Button
              variant='ghost'
              size='sm'
              className='text-xs h-7 px-2 text-primary hover:text-primary'
              onClick={onClearFilters}
            >
              Clear All Filters
            </Button>
          </div>

          {/* Type Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Type</h4>
            <div className="space-y-2">
              {ticketTypeOptions.map((ticketType) => (
                <div key={ticketType} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${ticketType}`}
                    checked={isTicketTypeChecked(ticketType)}
                    onCheckedChange={(checked) => handleTicketTypeChange(ticketType, checked as boolean)}
                  />
                  <label
                    htmlFor={`type-${ticketType}`}
                    className="text-sm cursor-pointer"
                  >
                    {ticketType}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <h4 className="font-medium mb-3">Department</h4>
            <div className="space-y-1">
              {departmentOptions.map((department) => (
                <div key={department}>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`dept-${department}`}
                      checked={isDepartmentChecked(department)}
                      onCheckedChange={(checked) => handleDepartmentChange(department, checked as boolean)}
                    />
                    <label
                      htmlFor={`dept-${department}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {department}
                    </label>
                    {departmentSubDepartments[department] && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto"
                        onClick={() => toggleDepartmentExpansion(department)}
                      >
                        {expandedDepartments.includes(department) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                  
                  {departmentSubDepartments[department] && (
                    <Collapsible open={expandedDepartments.includes(department)}>
                      <CollapsibleContent className="ml-6 mt-1 space-y-1">
                        {departmentSubDepartments[department].map((subDept) => (
                          <div key={subDept} className="flex items-center space-x-2">
                            <Checkbox
                              id={`subdept-${subDept}`}
                              checked={isSubDepartmentChecked(subDept)}
                              onCheckedChange={(checked) => handleSubDepartmentChange(subDept, checked as boolean)}
                            />
                            <label
                              htmlFor={`subdept-${subDept}`}
                              className="text-sm cursor-pointer text-gray-600"
                            >
                              {subDept}
                            </label>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
