
export interface FilterFieldConfig {
  key: string;
  label: string;
  type: 'simple' | 'hierarchical' | 'multiselect' | 'hierarchical-category';
  placeholder?: string;
  options?: string[];
  structure?: { [key: string]: string[] };
}

export interface FilterConfig {
  fields: FilterFieldConfig[];
  layout?: 'grid-2' | 'grid-3' | 'grid-4' | 'flex';
  showClearAll?: boolean;
}

export interface GenericFilterState {
  [key: string]: string[];
}