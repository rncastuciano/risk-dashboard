import { useState, useMemo, useEffect } from 'react';
import { trendsData } from '@/data/trends';
import { metricsData } from '@/data/metrics';
import { RiskOverviewHeader } from '@/components/RiskOverview/RiskOverviewHeader';
import { RiskOverviewContent } from '@/components/RiskOverview/RiskOverviewContent';
import { RiskOverviewEmpty } from '@/components/RiskOverview/RiskOverviewEmpty';
import { Card } from '@/components/ui/card';

export default function RiskOverview() {
  // Build availableMonths and defaultMonth from trendsData
  const availableMonths = useMemo(() => {
    // Format: "Month YYYY"
    const months = Array.from(
      new Set(
        trendsData.map(d =>
          d.date.toLocaleString('default', { month: 'long', year: 'numeric' })
        )
      )
    );
    return months;
  }, []);

  const defaultMonth = availableMonths[availableMonths.length - 1] || '';

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [sliderValue, setSliderValue] = useState([Math.max(0, availableMonths.indexOf(defaultMonth))]);

  // Update slider and selectedMonth when user interacts
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    if (availableMonths[value[0]]) {
      setSelectedMonth(availableMonths[value[0]]);
    }
  };

  // Filter trendsData for the selected month
  const filteredTrendsData = useMemo(() => {
    return trendsData.filter(
      d =>
        d.date.toLocaleString('default', { month: 'long', year: 'numeric' }) === selectedMonth
    );
  }, [selectedMonth]);

  // Radar data for the selected month
  const radarData = useMemo(() => {
    return filteredTrendsData.map(item => ({
      category: item.principalRiskCategory.replace(' Risk', ''),
      Critical: item.criticalCount || 0,
      High: item.highCount || 0,
      Medium: item.mediumCount || 0,
      Low: item.lowCount || 0,
      total:
        (item.criticalCount || 0) +
        (item.highCount || 0) +
        (item.mediumCount || 0) +
        (item.lowCount || 0),
    }));
  }, [filteredTrendsData]);

  // Monthly trends for the chart
  const monthlyTrends = useMemo(() => {
    return availableMonths.map(month => {
      const monthData = trendsData.filter(
        d => d.date.toLocaleString('default', { month: 'long', year: 'numeric' }) === month
      );
      const totals = monthData.reduce(
        (acc, item) => ({
          criticalCount: acc.criticalCount + (item.criticalCount || 0),
          highCount: acc.highCount + (item.highCount || 0),
          mediumCount: acc.mediumCount + (item.mediumCount || 0),
          lowCount: acc.lowCount + (item.lowCount || 0),
        }),
        { criticalCount: 0, highCount: 0, mediumCount: 0, lowCount: 0 }
      );
      return {
        month,
        Critical: totals.criticalCount,
        High: totals.highCount,
        Medium: totals.mediumCount,
        Low: totals.lowCount,
        total: totals.criticalCount + totals.highCount + totals.mediumCount + totals.lowCount,
      };
    });
  }, [availableMonths, trendsData]);

  // Tolerance breaches from metricsData
  const toleranceBreaches = useMemo(() => {
    return metricsData.filter(metric => metric.status === 'Tolerance Breach');
  }, []);

  // Calculate critical and high risk counts for the selected month
  const riskCounts = useMemo(() => {
    if (!selectedMonth || !filteredTrendsData.length) {
      return { critical: 0, high: 0 };
    }
    const totals = filteredTrendsData.reduce(
      (acc, item) => ({
        critical: acc.critical + (item.criticalCount || 0),
        high: acc.high + (item.highCount || 0),
      }),
      { critical: 0, high: 0 }
    );
    return totals;
  }, [selectedMonth, filteredTrendsData]);

  // Show message if no data available
  if (!availableMonths.length) {
    return <RiskOverviewEmpty />;
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <Card className="p-6 sm:p-10">
        <div className="max-w-full mx-auto">
          <div className="divide-y divide-gray-200">
            <RiskOverviewHeader
              title="Enterprise Risk Posture"
              subtitle="An aggregated view of organisational risks"
            />

            <RiskOverviewContent
              riskCounts={riskCounts}
              selectedMonth={selectedMonth}
              radarData={radarData}
              monthlyTrends={monthlyTrends}
              sliderValue={sliderValue}
              onSliderChange={handleSliderChange}
              availableMonths={availableMonths}
              toleranceBreaches={toleranceBreaches}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}