
import { useMemo } from 'react';
import { GenericFilter } from '@/components/shared/GenericFilter';
import { riskRegisterFilterConfig } from '@/config/filterPresets';
import { FilterState } from '@/types';

interface RiskRegisterFiltersProps {
  filters: FilterState;
  onUpdateFilter: (key: keyof FilterState, values: string[]) => void;
  departmentOptions: string[];
  departmentStructure: { [department: string]: string[] };
  riskCategoryStructure: { [principal: string]: string[] };
  ratingOptions: string[];
  statusOptions: string[];
}

export function RiskRegisterFilters({
  filters,
  onUpdateFilter,
  departmentOptions,
  departmentStructure,
  riskCategoryStructure,
  ratingOptions,
  statusOptions
}: RiskRegisterFiltersProps) {
  const filterConfig = useMemo(() => ({
    ...riskRegisterFilterConfig,
    fields: riskRegisterFilterConfig.fields.map(field => ({
      ...field,
      options: field.key === 'ratings' ? ratingOptions : field.options,
      structure: field.key === 'departments' ? departmentStructure :
                 field.key === 'categories' ? riskCategoryStructure :
                 field.structure
    }))
  }), [departmentStructure, riskCategoryStructure, ratingOptions]);

  const genericFilters = {
    departments: filters.departments,
    categories: filters.categories,
    ratings: filters.ratings
  };

  const handleFilterUpdate = (key: string, values: string[]) => {
    onUpdateFilter(key as keyof FilterState, values);
  };

  return (
    <GenericFilter
      config={filterConfig}
      filters={genericFilters}
      onFilterUpdate={handleFilterUpdate}
      title="Filters"
    />
  );
}
