import { TrendData } from '@/types';

export const trendsData: (Omit<TrendData, 'month' | 'year'> & { date: Date })[] = [
  { date: new Date(2024, 2, 1), principalRiskCategory: "Operational Risk", criticalCount: 1, highCount: 2, mediumCount: 3, lowCount: 2 },
  { date: new Date(2024, 2, 1), principalRiskCategory: "Financial Risk", criticalCount: 0, highCount: 1, mediumCount: 2, lowCount: 1 },
  { date: new Date(2024, 2, 1), principalRiskCategory: "Compliance Risk", criticalCount: 0, highCount: 1, mediumCount: 1, lowCount: 0 },
  { date: new Date(2024, 3, 1), principalRiskCategory: "Operational Risk", criticalCount: 1, highCount: 3, mediumCount: 2, lowCount: 2 },
  { date: new Date(2024, 3, 1), principalRiskCategory: "Financial Risk", criticalCount: 1, highCount: 1, mediumCount: 1, lowCount: 1 },
  { date: new Date(2024, 3, 1), principalRiskCategory: "Compliance Risk", criticalCount: 0, highCount: 2, mediumCount: 1, lowCount: 0 },
  { date: new Date(2024, 4, 1), principalRiskCategory: "Operational Risk", criticalCount: 2, highCount: 2, mediumCount: 3, lowCount: 1 },
  { date: new Date(2024, 4, 1), principalRiskCategory: "Financial Risk", criticalCount: 0, highCount: 2, mediumCount: 1, lowCount: 1 },
  { date: new Date(2024, 4, 1), principalRiskCategory: "Compliance Risk", criticalCount: 0, highCount: 1, mediumCount: 2, lowCount: 0 },
  { date: new Date(2024, 5, 1), principalRiskCategory: "Operational Risk", criticalCount: 1, highCount: 3, mediumCount: 2, lowCount: 2 },
  { date: new Date(2024, 5, 1), principalRiskCategory: "Financial Risk", criticalCount: 1, highCount: 1, mediumCount: 2, lowCount: 0 },
  { date: new Date(2024, 5, 1), principalRiskCategory: "Compliance Risk", criticalCount: 0, highCount: 2, mediumCount: 1, lowCount: 0 },
  { date: new Date(2024, 6, 1), principalRiskCategory: "Operational Risk", criticalCount: 2, highCount: 2, mediumCount: 2, lowCount: 2 },
  { date: new Date(2024, 6, 1), principalRiskCategory: "Financial Risk", criticalCount: 0, highCount: 2, mediumCount: 1, lowCount: 1 },
  { date: new Date(2024, 6, 1), principalRiskCategory: "Compliance Risk", criticalCount: 1, highCount: 1, mediumCount: 1, lowCount: 0 }
];