import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RiskCountCardsProps {
  criticalRisks: number;
  highRisks: number;
  latestMonth: string;
}

export const RiskCountCards = ({ criticalRisks, highRisks, latestMonth }: RiskCountCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Critical Risks as of {latestMonth}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{criticalRisks}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            High Risks as of {latestMonth}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{highRisks}</div>
        </CardContent>
      </Card>
    </div>
  );
};
