
import { FilterConfig } from '@/types/filterConfig';

export const actionTrackerFilterConfig: FilterConfig = {
  fields: [
    {
      key: 'departments',
      label: 'Department',
      type: 'simple',
      placeholder: 'All departments',
      options: []
    },
    {
      key: 'ticketTypes',
      label: 'Type',
      type: 'multiselect',
      placeholder: 'Select Categories',
      options: []
    },
    {
      key: 'statuses',
      label: 'Status',
      type: 'simple',
      placeholder: 'All statuses',
      options: []
    }
  ],
  layout: 'grid-3',
  showClearAll: true
};

export const riskRegisterFilterConfig: FilterConfig = {
  fields: [
    {
      key: 'departments',
      label: 'Department',
      type: 'hierarchical',
      placeholder: 'All departments',
      structure: {}
    },
    {
      key: 'categories',
      label: 'Risk Category',
      type: 'hierarchical-category',
      placeholder: 'All categories',
      structure: {}
    },
    {
      key: 'ratings',
      label: 'Risk Rating',
      type: 'simple',
      placeholder: 'All ratings',
      options: []
    }
  ],
  layout: 'grid-4',
  showClearAll: true
};
