
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metric } from '@/types';

interface MetricsSummaryCardsProps {
  filteredMetrics: Metric[];
  selectedStatuses: string[];
  onStatusToggle: (status: string) => void;
  onClearAll: () => void;
}

export function MetricsSummaryCards({ 
  filteredMetrics, 
  selectedStatuses, 
  onStatusToggle, 
  onClearAll 
}: MetricsSummaryCardsProps) {
  const toleranceBreaches = filteredMetrics.filter(m => m.status === 'Tolerance Breach').length;
  const nearBreaches = filteredMetrics.filter(m => m.status === 'Near Breach').length;
  
  const isStatusSelected = (status: string) => selectedStatuses.includes(status);
  const isTotalSelected = selectedStatuses.length === 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${
          isTotalSelected ? 'bg-blue-50 border-blue-300 border-2' : 'hover:bg-gray-50'
        }`}
        onClick={onClearAll}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{filteredMetrics.length}</div>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${
          isStatusSelected('Tolerance Breach') 
            ? 'bg-red-50 border-red-300 border-2' 
            : 'hover:bg-gray-50'
        }`}
        onClick={() => onStatusToggle('Tolerance Breach')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Tolerance Breaches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {toleranceBreaches}
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${
          isStatusSelected('Near Breach') 
            ? 'bg-yellow-50 border-yellow-300 border-2' 
            : 'hover:bg-gray-50'
        }`}
        onClick={() => onStatusToggle('Near Breach')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Near Breach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">
            {nearBreaches}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
