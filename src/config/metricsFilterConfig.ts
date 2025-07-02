
import { FilterConfig } from '@/types/filterConfig';

export const createMetricsFilterConfig = (
  departmentOptions: string[],
  departmentStructure: { [key: string]: string[] },
  statusOptions: string[],
  categoryOptions: string[],
  riskCategoryStructure: { [key: string]: string[] }
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
      label: 'Risk Category',
      type: 'hierarchical-category',
      placeholder: categoryOptions.length > 0 ? 'Select categories' : 'Loading categories...',
      structure: riskCategoryStructure
    }
  ],
  layout: 'grid-3'
});
