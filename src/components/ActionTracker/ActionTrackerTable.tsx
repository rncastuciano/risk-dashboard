
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ActionTracker } from '@/types';
import { ExternalLink } from 'lucide-react';

interface ActionTrackerTableProps {
  insights: ActionTracker[];
}

export const ActionTrackerTable = ({ insights }: ActionTrackerTableProps) => {
  const getTicketTypeBadge = (type: string) => {
    const colorMap: Record<string, string> = {
      'Incident': 'bg-red-100 text-red-800 border-red-200',
      'Issue': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Risk Action': 'bg-purple-100 text-purple-800 border-purple-200',
      'Risk': 'bg-gray-100 text-gray-800 border-gray-200'
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

  return (
    <Card>
      <CardContent className="p-0">
        {/* Single scroll container with both horizontal and vertical scrolling */}
        <div className="max-h-[70vh] overflow-auto">
          <table className="w-full text-sm table-fixed min-w-[800px]">
            <colgroup>
              <col className="w-32" /> {/* Ticket ID */}
              <col className="w-80" /> {/* Title */}
              <col className="w-32" /> {/* Type */}
              <col className="w-24" /> {/* Owner */}
              <col className="w-32" /> {/* Department */}
              <col className="w-32" /> {/* Sub Department */}
              <col className="w-24" /> {/* Status */}
            </colgroup>
            
            <thead className="bg-gray-50 border-b sticky top-0 z-20">
              <tr>
                <th className="text-left p-4">Ticket ID</th>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Owner</th>
                <th className="text-left p-4">Department</th>
                <th className="text-left p-4">Sub Department</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>
            
            <tbody>
              {insights.map((insight) => (
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
                    <StatusBadge status={insight.status} />
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
