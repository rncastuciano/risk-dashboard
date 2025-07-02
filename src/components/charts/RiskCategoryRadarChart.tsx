
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { MonthSlider } from '../shared/MonthSelector';

const RISK_COLORS = {
  Critical: '#dc2626',
  High: '#ea580c',
  Medium: '#ca8a04',
  Low: '#16a34a'
};

interface RadarDataItem {
  category: string;
  Critical: number;
  High: number;
  Medium: number;
  Low: number;
  total: number;
}

interface RiskCategoryRadarChartProps {
  radarData: RadarDataItem[];
  selectedMonth: string;
  sliderValue: number[];
  onSliderChange: (value: number[]) => void;
  availableMonths: string[];
}

export const RiskCategoryRadarChart = ({ 
  radarData, 
  selectedMonth, 
  sliderValue, 
  onSliderChange,
  availableMonths
}: RiskCategoryRadarChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Category Distribution - {selectedMonth}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
            <Radar name="Critical" dataKey="Critical" stroke={RISK_COLORS.Critical} fill={RISK_COLORS.Critical} fillOpacity={0.1} strokeWidth={2} />
            <Radar name="High" dataKey="High" stroke={RISK_COLORS.High} fill={RISK_COLORS.High} fillOpacity={0.1} strokeWidth={2} />
            <Radar name="Medium" dataKey="Medium" stroke={RISK_COLORS.Medium} fill={RISK_COLORS.Medium} fillOpacity={0.1} strokeWidth={2} />
            <Radar name="Low" dataKey="Low" stroke={RISK_COLORS.Low} fill={RISK_COLORS.Low} fillOpacity={0.1} strokeWidth={2} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
        <MonthSlider 
          selectedMonth={selectedMonth}
          sliderValue={sliderValue}
          onSliderChange={onSliderChange}
          availableMonths={availableMonths}
        />
      </CardContent>
    </Card>
  );
};
