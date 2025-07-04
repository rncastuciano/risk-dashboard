
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RiskBadge } from '@/components/shared/RiskBadge';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Risk } from '@/types';
import { getRowBackground, getLevelLabel } from '@/utils/riskTableConfig';

interface RiskTableRowProps {
  risk: Risk | null;
  categoryName?: string;
  level: number;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  hasChildren: boolean;
  children?: React.ReactNode;
}

export function RiskTableRow({
  risk,
  categoryName,
  level,
  isExpanded,
  onToggleExpansion,
  hasChildren,
  children
}: RiskTableRowProps) {
  const getIndentLevel = (level: number) => level * 20;
  const displayName = categoryName || risk?.title || '';
  const displayType = categoryName ? getLevelLabel(level) : risk?.type || '';

  const renderTicketId = () => {
    if (!risk?.ticketId) return '-';
    
    return (
      <a
        href={`https://dev.azure.com/flagstoneim/GRC/_workitems/edit/${risk.ticketId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
      >
        {risk.ticketId}
        <ExternalLink size={12} />
      </a>
    );
  };

  return (
    <>
      <tr className={`border-b hover:bg-opacity-75 ${getRowBackground(level)}`}>
        <td className="p-4 font-medium" style={{
          paddingLeft: `${16 + getIndentLevel(level - 1)}px`
        }}>
          <div className="flex items-center gap-2">
            {hasChildren && (
              <Button variant="ghost" size="sm" onClick={onToggleExpansion} className="p-0 w-4 h-4 flex-shrink-0">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </Button>
            )}
            <span className="truncate">{displayName}</span>
          </div>
        </td>
        <td className="p-4">{displayType}</td>
        <td className="p-4">{risk?.owner || '-'}</td>
        <td className="p-4">{risk?.department || '-'}</td>
        <td className="p-4">{risk?.subDepartment || '-'}</td>
        <td className="p-4">
          {risk?.status && <StatusBadge status={risk.status} />}
        </td>
        <td className="p-4">
          {risk?.rating && <RiskBadge rating={risk.rating} />}
          {risk?.severity && <RiskBadge rating={risk.severity as any} />}
        </td>
        <td className="p-4">
          {renderTicketId()}
        </td>
      </tr>
      {children}
    </>
  );
}
