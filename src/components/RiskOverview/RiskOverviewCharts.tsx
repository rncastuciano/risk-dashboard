
import { RiskCategoryRadarChart } from '@/components/charts/RiskCategoryRadarChart';
import { MonthlyTrendsChart } from '@/components/charts/MonthlyTrendsChart';

interface RadarDataItem {
  category: string;
  Critical: number;
  High: number;
  Medium: number;
  Low: number;
  total: number;
}

interface TrendDataItem {
  month: string;
  Critical: number;
  High: number;
  Medium: number;
  Low: number;
  total: number;
}

interface RiskOverviewChartsProps {
  radarData: RadarDataItem[];
  monthlyTrends: TrendDataItem[];
  selectedMonth: string;
  sliderValue: number[];
  onSliderChange: (value: number[]) => void;
  availableMonths: string[];
}

export const RiskOverviewCharts = ({
  radarData,
  monthlyTrends,
  selectedMonth,
  sliderValue,
  onSliderChange,
  availableMonths
}: RiskOverviewChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RiskCategoryRadarChart 
        radarData={radarData}
        selectedMonth={selectedMonth}
        sliderValue={sliderValue}
        onSliderChange={onSliderChange}
        availableMonths={availableMonths}
      />

      <MonthlyTrendsChart monthlyTrends={monthlyTrends} />
    </div>
  );
};
