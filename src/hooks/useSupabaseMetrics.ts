
// import { useQuery } from '@tanstack/react-query';
// import { supabase } from '@/integrations/supabase/client';
// import { Metric } from '@/types';

// export const useSupabaseMetrics = () => {
//   return useQuery({
//     queryKey: ['metrics'],
//     queryFn: async (): Promise<Metric[]> => {
//       console.log('Fetching metrics from Supabase...');
      
//       const { data, error } = await supabase
//         .from('metrics')
//         .select('*');

//       if (error) {
//         console.error('Error fetching metrics:', error);
//         throw new Error(`Failed to fetch metrics: ${error.message}`);
//       }

//       console.log('Raw metrics data from Supabase:', data);

//       // Transform the data to match our Metric interface
//       const transformedMetrics: Metric[] = data?.map((item) => ({
//         metricId: item.Metric_ID,
//         metricName: item.Metric_Name || '',
//         metricDescription: item.Metric_Description || '',
//         owner: item.Owner || '',
//         subDepartment: item.Sub_Department || '',
//         department: item.Department || '',
//         currentValue: item.Current_Value || '',
//         tolerance: item.Tolerance || '',
//         status: item.Status || '',
//         principalRiskCategory: item.Principal_Risk_Category || '',
//         subRiskCategory: item.Sub_Risk_Category || ''
//       })) || [];

//       console.log('Transformed metrics:', transformedMetrics);
//       return transformedMetrics;
//     },
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
//   });
// };
