
// import { useQuery } from '@tanstack/react-query';
// import { supabase } from '@/integrations/supabase/client';
// import { TrendData } from '@/types';

// // Transform Supabase data to our TrendData interface
// const transformSupabaseTrend = (item: any): TrendData => {
//   // Convert full month name to MMM YYYY format
//   const formatMonthToMMM = (fullMonth: string, monthDate?: string): string => {
//     if (!fullMonth) return '';
    
//     const monthMap: { [key: string]: string } = {
//       'January': 'Jan',
//       'February': 'Feb',
//       'March': 'Mar',
//       'April': 'Apr',
//       'May': 'May',
//       'June': 'Jun',
//       'July': 'Jul',
//       'August': 'Aug',
//       'September': 'Sep',
//       'October': 'Oct',
//       'November': 'Nov',
//       'December': 'Dec'
//     };
    
//     // Extract month name (remove year part if present in the Month field)
//     const monthPart = fullMonth.split(' ')[0];
//     const abbreviatedMonth = monthMap[monthPart] || monthPart;
    
//     // Get year from month_date field or default to 2024
//     const year = monthDate ? new Date(monthDate).getFullYear() : 2024;
    
//     return `${abbreviatedMonth} ${year}`;
//   };

//   return {
//     month: formatMonthToMMM(item.Month || '', item.month_date),
//     year: item.month_date ? new Date(item.month_date).getFullYear() : 2024,
//     principalRiskCategory: item.Principal_Risk_Category || '',
//     criticalCount: item.Critical_Count || 0,
//     highCount: item.High_Count || 0,
//     mediumCount: item.Medium_Count || 0,
//     lowCount: item.Low_Count || 0
//   };
// };

// export const useSupabaseTrends = () => {
//   const { data: trendsData, isLoading, error } = useQuery({
//     queryKey: ['monthlyPostureByTaxonomy'],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('monthlyPostureByTaxonomy')
//         .select('*')
//         .order('month_date', { ascending: true }); // Order by the new date column
      
//       if (error) throw error;
//       return data.map(transformSupabaseTrend);
//     }
//   });

//   // Get unique months from the data, preserving chronological order
//   const availableMonths = trendsData ? 
//     [...new Set(trendsData.map(item => item.month))].filter(Boolean) : [];

//   // Get the latest month as default
//   const defaultMonth = availableMonths.length > 0 ? 
//     availableMonths[availableMonths.length - 1] : '';

//   return {
//     trendsData: trendsData || [],
//     availableMonths,
//     defaultMonth,
//     isLoading,
//     error
//   };
// };
