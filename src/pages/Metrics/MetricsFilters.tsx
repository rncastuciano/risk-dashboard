
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilterDropdown } from '@/components/forms/FilterDropdown';
import { FilterState } from '@/types';

interface MetricsFiltersProps {
  filters: FilterState;
  onUpdateFilter: (key: keyof FilterState, values: string[]) => void;
  departmentOptions: string[];
  statusOptions: string[];
  categoryOptions: string[];
}

export function MetricsFilters({
  filters,
  onUpdateFilter,
  departmentOptions,
  statusOptions,
  categoryOptions
}: MetricsFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <FilterDropdown
              title="Department"
              options={departmentOptions}
              selectedValues={filters.departments}
              onChange={(values) => onUpdateFilter('departments', values)}
              placeholder="All departments"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <FilterDropdown
              title="Status"
              options={statusOptions}
              selectedValues={filters.statuses}
              onChange={(values) => onUpdateFilter('statuses', values)}
              placeholder="All statuses"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Risk Category</label>
            <FilterDropdown
              title="Category"
              options={categoryOptions}
              selectedValues={filters.categories}
              onChange={(values) => onUpdateFilter('categories', values)}
              placeholder="All categories"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
