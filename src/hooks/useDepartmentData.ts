import { useState, useEffect, useMemo } from 'react';
// Import mock data directly
import mockMetricsData from '@/data/metrics';
import { topLevelRisks } from '@/data/risks';
import { others as actionTrackerData } from '@/data/actionTracker';

export interface DepartmentData {
  name: string;
  subDepartments: string[];
}

export const useDepartmentData = () => {
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);

      // Combine all data sources from mock files
      const allData = [
        ...mockMetricsData.map(item => ({
          Department: item.department,
          Sub_Department: item.subDepartment,
        })),
        ...topLevelRisks.map(item => ({
          Department: item.department,
          Sub_Department: item.subDepartment,
        })),
        ...actionTrackerData.map(item => ({
          Department: item.department,
          Sub_Department: item.subDepartment,
        })),
      ];

      // Build department structure
      const departmentMap = new Map<string, Set<string>>();

      allData.forEach(item => {
        if (item.Department) {
          if (!departmentMap.has(item.Department)) {
            departmentMap.set(item.Department, new Set());
          }
          if (item.Sub_Department) {
            departmentMap.get(item.Department)!.add(item.Sub_Department);
          }
        }
      });

      // Convert to array format
      const departmentArray: DepartmentData[] = Array.from(departmentMap.entries()).map(([name, subDepts]) => ({
        name,
        subDepartments: Array.from(subDepts).sort()
      })).sort((a, b) => a.name.localeCompare(b.name));

      setDepartments(departmentArray);
      setError(null);
    } catch (err) {
      console.error('Error fetching departments:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create department structure for hierarchical filters
  const departmentStructure = useMemo(() => {
    return departments.reduce((acc, dept) => {
      acc[dept.name] = dept.subDepartments;
      return acc;
    }, {} as { [key: string]: string[] });
  }, [departments]);

  // Get flat list of all department names
  const departmentOptions = useMemo(() => {
    return departments.map(dept => dept.name);
  }, [departments]);

  return {
    departments,
    departmentStructure,
    departmentOptions,
    loading,
    error
  };
};