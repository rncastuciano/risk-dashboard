
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

const RISK_COLORS = {
  Critical: '#dc2626',
  High: '#ea580c',
  Medium: '#ca8a04',
  Low: '#16a34a'
};

interface TrendDataItem {
  month: string;
  Critical: number;
  High: number;
  Medium: number;
  Low: number;
  total: number;
}

interface MonthlyTrendsChartProps {
  monthlyTrends: TrendDataItem[];
}

export const MonthlyTrendsChart = ({ monthlyTrends }: MonthlyTrendsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Risk Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Critical" stackId="1" stroke={RISK_COLORS.Critical} fill={RISK_COLORS.Critical} fillOpacity={0.8} />
            <Area type="monotone" dataKey="High" stackId="1" stroke={RISK_COLORS.High} fill={RISK_COLORS.High} fillOpacity={0.8} />
            <Area type="monotone" dataKey="Medium" stackId="1" stroke={RISK_COLORS.Medium} fill={RISK_COLORS.Medium} fillOpacity={0.8} />
            <Area type="monotone" dataKey="Low" stackId="1" stroke={RISK_COLORS.Low} fill={RISK_COLORS.Low} fillOpacity={0.8} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
