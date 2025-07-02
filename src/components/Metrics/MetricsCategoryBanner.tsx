
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MetricsCategoryBannerProps {
  categoryName: string;
  level: number;
  itemKey: string;
  isExpanded: boolean;
  onToggleExpansion: (itemKey: string) => void;
  metricsCount: number;
}

export function MetricsCategoryBanner({
  categoryName,
  level,
  itemKey,
  isExpanded,
  onToggleExpansion,
  metricsCount
}: MetricsCategoryBannerProps) {
  const bgColor = level === 1 ? 'bg-gray-100' : 'bg-gray-50';
  const getIndentLevel = (level: number) => level * 20;
  
  return (
    <tr className={`${bgColor} border-b`}>
      <td className="p-3 font-medium text-gray-800" style={{
        paddingLeft: `${16 + getIndentLevel(level - 1)}px`
      }}>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleExpansion(itemKey)}
            className="p-0 w-4 h-4 flex-shrink-0"
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </Button>
          <span className="text-sm font-semibold">{categoryName}</span>
          <span className="text-xs text-gray-600 ml-2">
            ({metricsCount} metrics)
          </span>
        </div>
      </td>
      <td className="p-3"></td>
      <td className="p-3"></td>
      <td className="p-3"></td>
      <td className="p-3"></td>
      <td className="p-3"></td>
      <td className="p-3"></td>
      <td className="p-3"></td>
      <td className="p-3"></td>
    </tr>
  );
}
