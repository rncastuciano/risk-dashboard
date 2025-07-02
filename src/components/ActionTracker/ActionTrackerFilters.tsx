
import { useMemo } from 'react';
import { GenericFilter } from '@/components/shared/GenericFilter';
import { actionTrackerFilterConfig } from '@/config/filterPresets';
import { FilterState } from '@/types';

interface ActionTrackerFiltersProps {
  filters: FilterState;
  departmentOptions: string[];
  ticketTypeOptions: string[];
  statusOptions: string[];
  onFilterUpdate: (key: keyof FilterState, values: string[]) => void;
}

export const ActionTrackerFilters = ({
  filters,
  departmentOptions,
  ticketTypeOptions,
  statusOptions,
  onFilterUpdate
}: ActionTrackerFiltersProps) => {
  const filterConfig = useMemo(() => ({
    ...actionTrackerFilterConfig,
    fields: actionTrackerFilterConfig.fields.map(field => ({
      ...field,
      options: field.key === 'departments' ? departmentOptions :
               field.key === 'ticketTypes' ? ticketTypeOptions :
               field.key === 'statuses' ? statusOptions :
               field.options
    }))
  }), [departmentOptions, ticketTypeOptions, statusOptions]);

  const genericFilters = {
    departments: filters.departments,
    ticketTypes: filters.ticketTypes,
    statuses: filters.statuses
  };

  const handleFilterUpdate = (key: string, values: string[]) => {
    onFilterUpdate(key as keyof FilterState, values);
  };

  return (
    <GenericFilter
      config={filterConfig}
      filters={genericFilters}
      onFilterUpdate={handleFilterUpdate}
      title="Filters"
    />
  );
};
