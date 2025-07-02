
import { FilterConfig } from '@/types/filterConfig';

export const createRiskRegisterFilterConfig = (
  departmentOptions: string[],
  departmentStructure: { [key: string]: string[] },
  riskCategoryStructure: { [key: string]: string[] },
  ratingOptions: string[],
  statusOptions: string[]
): FilterConfig => ({
  fields: [
    {
      key: 'departments',
      label: 'Department',
      type: 'hierarchical',
      placeholder: 'All departments',
      structure: departmentStructure
    },
    {
      key: 'ratings',
      label: 'Risk Rating',
      type: 'simple',
      placeholder: 'All ratings',
      options: ratingOptions
    },
    {
      key: 'statuses',
      label: 'Status',
      type: 'simple',
      placeholder: 'All statuses',
      options: statusOptions
    },
    {
      key: 'categories',
      label: 'Risk Category',
      type: 'hierarchical-category',
      placeholder: 'All categories',
      structure: riskCategoryStructure
    }
  ],
  layout: 'grid-2'
});
