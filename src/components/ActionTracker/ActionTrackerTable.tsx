
import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SeverityBadge } from '@/components/shared/SeverityBadge';
import { ActionTracker } from '@/types';
import { ExternalLink, ChevronUp, ChevronDown, ChevronsUpDown, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ActionTrackerTableProps {
  insights: ActionTracker[];
}

type SortField = 'dueDate' | 'severity';
type SortDirection = 'asc' | 'desc' | null;

export const ActionTrackerTable = ({ insights }: ActionTrackerTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const getTicketTypeBadge = (type: string) => {
    const colorMap: Record<string, string> = {
      'Incident': 'bg-red-100 text-red-800 border-red-200',
      'Issue': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Risk Action': 'bg-purple-100 text-purple-800 border-purple-200',
      'Exception': 'bg-orange-100 text-orange-800 border-orange-200',
      'General': 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorMap[type] || colorMap['Risk']}`}>
        {type}
      </span>
    );
  };

  const getAzureDevOpsUrl = (ticketId: number | string) => {
    return `https://dev.azure.com/flagstoneim/flagstone/_workitems/edit/${ticketId}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid date
    
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  const isOverdue = (dateString: string) => {
    if (!dateString) return false;
    
    const dueDate = new Date(dateString);
    const today = new Date();
    
    // Set time to start of day for accurate comparison
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate < today;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null (back to default)
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronsUpDown size={16} className="text-gray-400" />;
    }
    if (sortDirection === 'asc') {
      return <ChevronUp size={16} className="text-blue-600" />;
    }
    if (sortDirection === 'desc') {
      return <ChevronDown size={16} className="text-blue-600" />;
    }
    return <ChevronsUpDown size={16} className="text-gray-400" />;
  };

  const sortedInsights = useMemo(() => {
    return [...insights].sort((a, b) => {
      const severityOrder = { 'Major Incident': 4, 'Critical': 4, 'High': 3, 'Incident': 2, 'Medium': 2, 'Low': 1 };
      
      // If user has manually selected a sort field, apply that as the primary sort
      if (sortField && sortDirection) {
        let aValue: any;
        let bValue: any;

        if (sortField === 'dueDate') {
          // Handle null/empty dates by putting them at the end
          const aDateStr = a.dueDate?.trim();
          const bDateStr = b.dueDate?.trim();
          
          // If both are empty, they're equal
          if (!aDateStr && !bDateStr) return 0;
          // If only a is empty, put it at the end
          if (!aDateStr) return 1;
          // If only b is empty, put it at the end
          if (!bDateStr) return -1;
          
          // Both have dates, compare them
          aValue = new Date(aDateStr).getTime();
          bValue = new Date(bDateStr).getTime();
          
          // Handle invalid dates (NaN) by putting them at the end
          if (isNaN(aValue) && isNaN(bValue)) return 0;
          if (isNaN(aValue)) return 1;
          if (isNaN(bValue)) return -1;
        } else if (sortField === 'severity') {
          aValue = severityOrder[a.severity as keyof typeof severityOrder] || 0;
          bValue = severityOrder[b.severity as keyof typeof severityOrder] || 0;
        }

        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      }
      
      // Default sorting: first by criticality (severity descending), then by due date (ascending)
      const aSeverity = severityOrder[a.severity as keyof typeof severityOrder] || 0;
      const bSeverity = severityOrder[b.severity as keyof typeof severityOrder] || 0;
      
      if (aSeverity !== bSeverity) {
        return bSeverity - aSeverity; // Descending order (Critical first)
      }
      
      // If severity is the same, sort by due date (ascending - earliest first)
      // Handle null/empty dates by putting them at the end
      const aDateStr = a.dueDate?.trim();
      const bDateStr = b.dueDate?.trim();
      
      // If both are empty, they're equal
      if (!aDateStr && !bDateStr) return 0;
      // If only a is empty, put it at the end
      if (!aDateStr) return 1;
      // If only b is empty, put it at the end
      if (!bDateStr) return -1;
      
      // Both have dates, compare them
      const aDate = new Date(aDateStr).getTime();
      const bDate = new Date(bDateStr).getTime();
      
      // Handle invalid dates (NaN) by putting them at the end
      if (isNaN(aDate) && isNaN(bDate)) return 0;
      if (isNaN(aDate)) return 1;
      if (isNaN(bDate)) return -1;
      
      return aDate - bDate; // Ascending order (earliest first)
    });
  }, [insights, sortField, sortDirection]);

  return (
    <Card>
      <CardContent className="p-0">
        {/* Single scroll container with both horizontal and vertical scrolling */}
        <div className="max-h-[70vh] overflow-auto">
          <table className="w-full text-sm table-fixed min-w-[800px]">
            <colgroup>
              <col className="w-20" /> {/* Ticket ID */}
              <col className="w-64" /> {/* Title */}
              <col className="w-20" /> {/* Type */}
              <col className="w-24" /> {/* Owner */}
              <col className="w-24" /> {/* Department */}
              <col className="w-28" /> {/* Sub Department */}
              <col className="w-20" /> {/* Due Date */}
              <col className="w-20" /> {/* Criticality */}
              <col className="w-20" /> {/* Status */}
            </colgroup>
            
            <thead className="bg-gray-50 border-b sticky top-0 z-20">
              <tr>
                <th className="text-left p-4">Ticket ID</th>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Owner</th>
                <th className="text-left p-4">Department</th>
                <th className="text-left p-4">Sub Department</th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('dueDate')}
                    className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    Due Date
                    {getSortIcon('dueDate')}
                  </button>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('severity')}
                    className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    Criticality
                    {getSortIcon('severity')}
                  </button>
                </th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>
            
            <tbody>
              {sortedInsights.map((insight) => (
                <tr key={insight.ticketId} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm">
                    <a
                      href={getAzureDevOpsUrl(insight.ticketId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {insight.ticketId}
                      <ExternalLink size={12} />
                    </a>
                  </td>
                  <td className="p-4 font-medium">{insight.title}</td>
                  <td className="p-4">
                    {getTicketTypeBadge(insight.ticketType)}
                  </td>
                  <td className="p-4">{insight.owner}</td>
                  <td className="p-4">{insight.department}</td>
                  <td className="p-4">{insight.subDepartment}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={isOverdue(insight.dueDate) ? 'text-red-600 font-medium' : ''}>
                        {formatDate(insight.dueDate)}
                      </span>
                      {isOverdue(insight.dueDate) && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>
                                <AlertCircle size={16} className="text-red-600" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Overdue</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <SeverityBadge severity={insight.severity} />
                  </td>
                  <td className="p-4">
                    {insight.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
