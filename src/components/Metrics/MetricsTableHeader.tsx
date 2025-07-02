export function MetricsTableHeader() {
  return (
    <thead className="bg-gray-50 border-b sticky top-0 z-20">
      <tr>
        <th className="text-left p-4">Metric</th>
        <th className="text-left p-4">Type</th>
        <th className="text-left p-4">Owner</th>
        <th className="text-left p-4">Department</th>
        <th className="text-left p-4">Sub Department</th>
        <th className="text-left p-4">Status</th>
        <th className="text-left p-4">Current Value</th>
        <th className="text-left p-4">Tolerance</th>
        <th className="text-left p-4">Trend</th>
      </tr>
    </thead>
  );
}
