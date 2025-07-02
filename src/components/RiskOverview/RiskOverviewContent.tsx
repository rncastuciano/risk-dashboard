
import { RiskCountCards } from '@/components/cards/RiskCountCards';
import { ToleranceBreachesTable } from '@/components/tables/ToleranceBreachesTable';
import { RiskOverviewCharts } from './RiskOverviewCharts';
import { Metric } from '@/types';

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

interface RiskOverviewContentProps {
  riskCounts: {
    critical: number;
    high: number;
  };
  selectedMonth: string;
  radarData: RadarDataItem[];
  monthlyTrends: TrendDataItem[];
  sliderValue: number[];
  onSliderChange: (value: number[]) => void;
  availableMonths: string[];
  toleranceBreaches: Metric[];
}

export const RiskOverviewContent = ({
  riskCounts,
  selectedMonth,
  radarData,
  monthlyTrends,
  sliderValue,
  onSliderChange,
  availableMonths,
  toleranceBreaches
}: RiskOverviewContentProps) => {
  return (
    <div className="pt-8 space-y-6">
      <RiskCountCards 
        criticalRisks={riskCounts.critical}
        highRisks={riskCounts.high}
        latestMonth={selectedMonth}
      />

      <RiskOverviewCharts
        radarData={radarData}
        monthlyTrends={monthlyTrends}
        selectedMonth={selectedMonth}
        sliderValue={sliderValue}
        onSliderChange={onSliderChange}
        availableMonths={availableMonths}
      />

      <ToleranceBreachesTable toleranceBreaches={toleranceBreaches} />
    </div>
  );
};
