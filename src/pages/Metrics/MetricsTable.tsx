
import { useState } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { metricsData } from '@/data/metrics';

interface MetricsTableProps {
  groupedMetrics: { [key: string]: typeof metricsData };
  expandedCategories: Set<string>;
  onToggleCategoryExpansion: (category: string) => void;
}

export function MetricsTable({
  groupedMetrics,
  expandedCategories,
  onToggleCategoryExpansion
}: MetricsTableProps) {
  const getTrendIcon = (metric: typeof metricsData[0]) => {
    if (metric.status === 'Tolerance Breach') return <TrendingDown className="w-4 h-4 text-red-500" />;
    if (metric.status === 'Near Breach') return <TrendingDown className="w-4 h-4 text-yellow-500" />;
    return <TrendingUp className="w-4 h-4 text-green-500" />;
  };

  return (
    <div className="space-y-4">
      {Object.entries(groupedMetrics).map(([category, metrics]) => {
        const isExpanded = expandedCategories.has(category);
        
        return (
          <Card key={category}>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onToggleCategoryExpansion(category)}
            >
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  <span>{category}</span>
                  <span className="text-sm text-gray-500">({metrics.length} metrics)</span>
                </div>
              </CardTitle>
            </CardHeader>
            
            {isExpanded && (
              <CardContent className="pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-3">Metric</th>
                        <th className="text-left p-3">Owner</th>
                        <th className="text-left p-3">Department</th>
                        <th className="text-left p-3">Current Value</th>
                        <th className="text-left p-3">Tolerance</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.map((metric) => (
                        <tr key={metric.metricId} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{metric.metricName}</div>
                              <div className="text-xs text-gray-500">{metric.metricDescription}</div>
                            </div>
                          </td>
                          <td className="p-3">{metric.owner}</td>
                          <td className="p-3">{metric.department}</td>
                          <td className="p-3 font-mono">{metric.currentValue}</td>
                          <td className="p-3 font-mono">{metric.tolerance}</td>
                          <td className="p-3">
                            <StatusBadge status={metric.status} />
                          </td>
                          <td className="p-3">
                            {getTrendIcon(metric)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
