
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface MonthSelectorProps {
  selectedMonth: string;
  sliderValue: number[];
  onMonthChange: (month: string) => void;
  onSliderChange: (value: number[]) => void;
  availableMonths: string[];
}

export const MonthSelector = ({ 
  selectedMonth, 
  sliderValue, 
  onMonthChange, 
  onSliderChange,
  availableMonths
}: MonthSelectorProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900">Risk Overview</h1>
      <Select value={selectedMonth} onValueChange={onMonthChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {availableMonths.map(month => (
            <SelectItem key={month} value={month}>{month}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const MonthSlider = ({ 
  selectedMonth, 
  sliderValue, 
  onSliderChange,
  availableMonths
}: { 
  selectedMonth: string; 
  sliderValue: number[]; 
  onSliderChange: (value: number[]) => void;
  availableMonths: string[];
}) => {
  const maxIndex = Math.max(0, availableMonths.length - 1);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Month:</span>
        <span className="font-medium">{selectedMonth}</span>
      </div>
      <Slider 
        value={sliderValue} 
        onValueChange={onSliderChange} 
        max={maxIndex} 
        min={0} 
        step={1} 
        className="w-full" 
      />
      <div className="flex justify-between text-xs text-gray-500">
        {availableMonths.map((month, index) => (
          <span key={month} className={index === sliderValue[0] ? 'font-medium text-blue-600' : ''}>
            {month.split(' ')[0]} {/* Show just the month name for space */}
          </span>
        ))}
      </div>
    </div>
  );
};
