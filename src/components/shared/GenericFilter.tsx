
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilterDropdown } from '@/components/forms/FilterDropdown';
import { MultiSelectDropdown } from '@/components/forms/MultiSelectDropdown';
import { HierarchicalFilterDropdown } from '@/components/forms/HierarchicalFilterDropdown';
import { HierarchicalRiskCategoryDropdown } from '@/components/forms/HierarchicalRiskCategoryDropdown';
import { FilterConfig, FilterFieldConfig, GenericFilterState } from '@/types/filterConfig';

interface GenericFilterProps {
  config: FilterConfig;
  filters: GenericFilterState;
  onFilterUpdate: (key: string, values: string[]) => void;
  title?: string;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
}

export const GenericFilter = ({
  config,
  filters,
  onFilterUpdate,
  title = "Filters",
  hasActiveFilters,
  onClearFilters
}: GenericFilterProps) => {
  const renderFilterField = (field: FilterFieldConfig) => {
    const selectedValues = filters[field.key] || [];

    switch (field.type) {
      case 'simple':
        return (
          <FilterDropdown
            title={field.label}
            options={field.options || []}
            selectedValues={selectedValues}
            onChange={(values) => onFilterUpdate(field.key, values)}
            placeholder={field.placeholder}
          />
        );

      case 'multiselect':
        return (
          <MultiSelectDropdown
            title={field.label}
            options={field.options || []}
            selectedValues={selectedValues}
            onChange={(values) => onFilterUpdate(field.key, values)}
            placeholder={field.placeholder}
          />
        );

      case 'hierarchical':
        return (
          <HierarchicalFilterDropdown
            title={field.label}
            departmentStructure={field.structure || {}}
            selectedValues={selectedValues}
            onChange={(values) => onFilterUpdate(field.key, values)}
            placeholder={field.placeholder}
          />
        );

      case 'hierarchical-category':
        return (
          <HierarchicalRiskCategoryDropdown
            title={field.label}
            riskCategoryStructure={field.structure || {}}
            selectedValues={selectedValues}
            onChange={(values) => onFilterUpdate(field.key, values)}
            placeholder={field.placeholder}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {hasActiveFilters && onClearFilters && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {config.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium mb-2">{field.label}</label>
              {renderFilterField(field)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
