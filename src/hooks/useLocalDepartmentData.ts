import { useMemo } from 'react';

interface DepartmentItem {
  department: string;
  subDepartment: string;
}

interface DepartmentStructure {
  department: string;
  subDepartments: string[];
}

export const useLocalDepartmentData = <T extends DepartmentItem>(data: T[]) => {
  return useMemo(() => {
    if (!data || data.length === 0) {
      return {
        departmentOptions: [],
        subDepartmentOptions: [],
        departmentStructure: {},
        loading: false
      };
    }

    // Extract unique departments and sub-departments
    const departments = [...new Set(data.map(item => item.department).filter(Boolean))];
    const subDepartments = [...new Set(data.map(item => item.subDepartment).filter(Boolean))];
    
    // Create hierarchical department structure
    const departmentStructure: Record<string, string[]> = {};
    
    departments.forEach(dept => {
      departmentStructure[dept] = subDepartments.filter(sub => 
        data.some(item => item.department === dept && item.subDepartment === sub)
      );
    });

    return {
      departmentOptions: departments,
      subDepartmentOptions: subDepartments,
      departmentStructure,
      loading: false
    };
  }, [data]);
};
