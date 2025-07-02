
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Metric } from '@/types';

interface ToleranceBreachesTableProps {
  toleranceBreaches: Metric[];
}

export const ToleranceBreachesTable = ({ toleranceBreaches }: ToleranceBreachesTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Board Risk Appetite Breaches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Metric</th>
                <th className="text-left p-2">Owner</th>
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Current Value</th>
                <th className="text-left p-2">Tolerance</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {toleranceBreaches.map(metric => (
                <tr key={metric.metricId} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">{metric.metricName}</td>
                  <td className="p-2">{metric.owner}</td>
                  <td className="p-2">{metric.department}</td>
                  <td className="p-2">{metric.currentValue}</td>
                  <td className="p-2">{metric.tolerance}</td>
                  <td className="p-2">
                    <StatusBadge status={metric.status} />
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
