import { Card } from '@/components/ui/card';

export const RiskOverviewEmpty = () => {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <Card className="p-6 sm:p-10">
        <div className="max-w-full mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">No trend data available</div>
          </div>
        </div>
      </Card>
    </div>
  );
};