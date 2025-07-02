
// import { useQuery } from '@tanstack/react-query';
// import { supabase } from '@/integrations/supabase/client';
// import { ActionableInsight } from '@/types';

// // Define the valid ticket types to ensure type safety
// const VALID_TICKET_TYPES = [
//   'Control', 'Incident', 'Issue', 'Risk Action', 'Risk', 'Exceptions', 'General', 'Exception'
// ] as const;

// type ValidTicketType = typeof VALID_TICKET_TYPES[number];

// // Helper function to validate and convert ticket type
// const getValidTicketType = (ticketType: string | null): ValidTicketType => {
//   if (!ticketType) return 'General';
  
//   // Check if the ticket type is one of the valid types
//   const validType = VALID_TICKET_TYPES.find(
//     type => type.toLowerCase() === ticketType.toLowerCase()
//   );
  
//   return validType || 'General';
// };

// // Helper function to validate status
// const getValidStatus = (status: string | null): ActionableInsight['status'] => {
//   const validStatuses = ['Active', 'Closed', 'Open', 'In Progress', 'Planned'] as const;
//   if (!status) return 'Open';
  
//   const validStatus = validStatuses.find(
//     s => s.toLowerCase() === status.toLowerCase()
//   );
  
//   return validStatus || 'Open';
// };

// // Helper function to validate priority
// const getValidPriority = (priority: string | null): ActionableInsight['priority'] => {
//   const validPriorities = ['Critical', 'High', 'Medium', 'Low'] as const;
//   if (!priority) return undefined;
  
//   const validPriority = validPriorities.find(
//     p => p.toLowerCase() === priority.toLowerCase()
//   );
  
//   return validPriority;
// };

// export const useSupabaseActionTracker = () => {
//   return useQuery({
//     queryKey: ['actionTracker'],
//     queryFn: async () => {
//       console.log('Fetching action tracker data from Supabase...');
      
//       const { data, error } = await supabase
//         .from('actionTrackerTable')
//         .select('*');

//       if (error) {
//         console.error('Error fetching action tracker data:', error);
//         throw error;
//       }

//       console.log('Raw Supabase data:', data);

//       // Transform Supabase data to ActionableInsight format
//       const transformedData: ActionableInsight[] = (data || []).map(item => ({
//         ticketId: item.Ticket_ID || 0,
//         title: item.Title || 'Untitled',
//         ticketType: getValidTicketType(item.Ticket_Type),
//         owner: item.Owner || 'Unassigned',
//         department: item.Department || 'Unknown',
//         subDepartment: item.Sub_Department || item.Department || 'Unknown',
//         status: getValidStatus(item.Status),
//         parentId: item.Parent_ID || undefined,
//         priority: getValidPriority(item.Rating),
//         description: item.Title || 'No description available'
//       }));

//       console.log('Transformed data:', transformedData);
//       return transformedData;
//     },
//   });
// };
