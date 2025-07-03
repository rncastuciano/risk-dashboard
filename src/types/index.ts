
export interface Risk {
  ticketId: number;
  title: string;
  type: 'Risk' | 'Control' | 'Incident' | 'Issue' | 'Risk Action' | 'Exception' | 'General';
  owner: string;
  subDepartment: string;
  department: string;
  status: string;
  rating?: 'Critical' | 'High' | 'Medium' | 'Low';
  principalRiskCategory?: string;
  subRiskCategory?: string;
  parentId?: number;
  controlType?: 'Preventive' | 'Detective' | 'Mitigating' | 'Contingency';
  controlEffectiveness?: 'Effective' | 'Ineffective' | 'Partially Ineffective';
  controlObjective?: string;
  severity?: 'Critical' | 'High' | 'Medium' | 'Low';
  impact?: string;
}

export interface Metric {
  metricId: string;
  metricName: string;
  metricDescription: string;
  owner: string;
  subDepartment: string;
  department: string;
  currentValue: string;
  tolerance: string;
  status: string;
  principalRiskCategory: string;
  subRiskCategory: string;
}

export interface ActionTracker {
  ticketId: number | string;
  title: string;
  ticketType: 'Incident' | 'Issue' | 'Risk Action' | 'Exception' | 'General';
  owner: string;
  subDepartment: string;
  department: string;
  status: 'Active' | 'Closed' | 'Open' | 'In Progress' | 'Planned';
  parentId?: number;
  description?: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  dueDate?: string;
  createdDate?: string;
}

export interface TrendData {
  month: string;
  year: number;
  principalRiskCategory: string;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
}

export interface Department {
  id: string;
  name: string;
  parentId?: string;
  children?: Department[];
  subDepartments?: string[];
}

export interface FilterState {
  departments: string[];
  categories: string[];
  ratings: string[];
  statuses: string[];
  ticketTypes: string[];
}
