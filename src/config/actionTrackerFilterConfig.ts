
import { FilterConfig } from '@/types/filterConfig';

export const createActionTrackerFilterConfig = (
  departmentOptions: string[],
  departmentStructure: { [key: string]: string[] },
  statusOptions: string[],
  categoryOptions: string[]
): FilterConfig => ({
  fields: [
    {
      key: 'departments',
      label: 'Department',
      type: 'hierarchical',
      placeholder: departmentOptions.length > 0 ? 'Select departments' : 'Loading departments...',
      structure: departmentStructure
    },
    {
      key: 'statuses',
      label: 'Status',
      type: 'simple',
      placeholder: 'Select statuses',
      options: statusOptions
    },
    {
      key: 'categories',
      label: 'Ticket Type',
      type: 'simple',
      placeholder: 'Select ticket types',
      options: categoryOptions
    }
  ],
  layout: 'grid-3'
});