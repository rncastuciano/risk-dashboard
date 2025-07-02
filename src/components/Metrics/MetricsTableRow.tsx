import { Metric } from '@/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsTableRowProps {
  metric: Metric;
  level: number;
}

export function MetricsTableRow({ metric, level }: MetricsTableRowProps) {
  const getIndentLevel = (level: number) => level * 20;
  
  const getTrendIcon = (metric: Metric) => {
    if (metric.status === 'Tolerance Breach') return <TrendingDown className="w-4 h-4 text-red-500" />;
    if (metric.status === 'Near Breach') return <TrendingDown className="w-4 h-4 text-yellow-500" />;
    return <TrendingUp className="w-4 h-4 text-green-500" />;
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4" style={{ paddingLeft: `${16 + getIndentLevel(level - 1)}px` }}>
        <div>
          <div className="font-medium text-sm">{metric.metricName}</div>
          <div className="text-xs text-gray-500 mt-1">{metric.metricDescription}</div>
        </div>
      </td>
      <td className="p-4 text-sm">Metric</td>
      <td className="p-4 text-sm">{metric.owner}</td>
      <td className="p-4 text-sm">{metric.department}</td>
      <td className="p-4 text-sm">{metric.subDepartment}</td>
      <td className="p-4">
        <StatusBadge status={metric.status} />
      </td>
      <td className="p-4 text-sm">{metric.currentValue}</td>
      <td className="p-4 text-sm">{metric.tolerance}</td>
      <td className="p-4">
        {getTrendIcon(metric)}
      </td>
    </tr>
  );
}
