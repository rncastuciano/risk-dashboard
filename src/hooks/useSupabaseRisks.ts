
// import { useState, useEffect, useMemo } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { supabase } from '@/integrations/supabase/client';
// import { Risk } from '@/types';

// // Transform Supabase data to our Risk interface
// const transformSupabaseRisk = (item: any): Risk => {
//   return {
//     id: item.Ticket_ID,
//     title: item.Title || '',
//     type: item.Ticket_Type || 'Risk',
//     owner: item.Owner || '',
//     subDepartment: item.Sub_Department || '',
//     department: item.Department || '',
//     status: item.Status || 'Active',
//     rating: item.Rating || undefined,
//     principalRiskCategory: item.Principal_Risk_Category || undefined,
//     subRiskCategory: item.Sub_Risk_Category || undefined,
//     parentId: item.Parent_ID || undefined,
//     controlObjective: item.Control_Objective || undefined
//   };
// };

// export const useSupabaseRisks = () => {
//   const { data: risksData, isLoading: risksLoading, error: risksError } = useQuery({
//     queryKey: ['risks'],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('risksTable')
//         .select('*');
      
//       if (error) throw error;
//       return data.map(transformSupabaseRisk);
//     }
//   });

//   const { data: controlsData, isLoading: controlsLoading, error: controlsError } = useQuery({
//     queryKey: ['controls'],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('controlsTable')
//         .select('*');
      
//       if (error) throw error;
//       return data.map(transformSupabaseRisk);
//     }
//   });

//   const { data: actionTrackerData, isLoading: actionTrackerLoading, error: actionTrackerError } = useQuery({
//     queryKey: ['actionTracker'],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('actionTrackerTable')
//         .select('*');
      
//       if (error) throw error;
//       return data.map(transformSupabaseRisk);
//     }
//   });

//   const allRisksData = [
//     ...(risksData || []),
//     ...(controlsData || []),
//     ...(actionTrackerData || [])
//   ];

//   const topLevelRisks = risksData || [];

//   // Generate department structure from actual data
//   const departmentStructure = useMemo(() => {
//     const structure: { [department: string]: string[] } = {};
    
//     allRisksData.forEach(risk => {
//       if (risk.department) {
//         if (!structure[risk.department]) {
//           structure[risk.department] = [];
//         }
        
//         if (risk.subDepartment && !structure[risk.department].includes(risk.subDepartment)) {
//           structure[risk.department].push(risk.subDepartment);
//         }
//       }
//     });

//     // Sort departments and sub-departments for consistent display
//     Object.keys(structure).forEach(dept => {
//       structure[dept].sort();
//     });

//     return structure;
//   }, [allRisksData]);

//   // Generate risk category structure from actual data
//   const riskCategoryStructure = useMemo(() => {
//     const structure: { [principal: string]: string[] } = {};
    
//     allRisksData.forEach(risk => {
//       if (risk.principalRiskCategory) {
//         if (!structure[risk.principalRiskCategory]) {
//           structure[risk.principalRiskCategory] = [];
//         }
        
//         if (risk.subRiskCategory && !structure[risk.principalRiskCategory].includes(risk.subRiskCategory)) {
//           structure[risk.principalRiskCategory].push(risk.subRiskCategory);
//         }
//       }
//     });

//     // Sort principal categories and sub-categories for consistent display
//     Object.keys(structure).forEach(principal => {
//       structure[principal].sort();
//     });

//     return structure;
//   }, [allRisksData]);

//   const isLoading = risksLoading || controlsLoading || actionTrackerLoading;
//   const error = risksError || controlsError || actionTrackerError;

//   return {
//     topLevelRisks,
//     allRisksData,
//     departmentStructure,
//     riskCategoryStructure,
//     isLoading,
//     error
//   };
// };
