import { Metric } from '@/types';
import { MetricsTableRow } from './MetricsTableRow';

interface MetricsSubCategoryTableProps {
  metrics: Metric[];
  parentKey: string;
}

export function MetricsSubCategoryTable({
  metrics,
  parentKey
}: MetricsSubCategoryTableProps) {
  return (
    <>
      {metrics.map((metric) => (
        <MetricsTableRow
          key={`${parentKey}-${metric.metricId}`}
          metric={metric}
          level={3}
        />
      ))}
    </>
  );
}
