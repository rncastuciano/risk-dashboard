
import { Risk } from '@/types';
import { RiskTableRow } from '@/components/RiskRegister/RiskTableRow';
import { RiskChildItems } from '@/components/RiskRegister/RiskChildItems';

interface RisksTableProps {
  risks: Risk[];
  parentKey: string;
  expandedItems: Set<string>;
  onToggleExpansion: (itemId: string) => void;
  getChildItems: (parentId: number) => Risk[];
}

export function RisksTable({
  risks,
  parentKey,
  expandedItems,
  onToggleExpansion,
  getChildItems
}: RisksTableProps) {
  return (
    <>
      {risks.map((risk) => {
        const itemKey = `${parentKey}-${risk.ticketId}`;
        const isExpanded = expandedItems.has(itemKey);
        const childItems = getChildItems(risk.ticketId);
        
        return (
          <RiskTableRow
            key={itemKey}
            risk={risk}
            level={3}
            isExpanded={isExpanded}
            onToggleExpansion={() => onToggleExpansion(itemKey)}
            hasChildren={childItems.length > 0}
          >
            {isExpanded && childItems.length > 0 && (
              <RiskChildItems
                parentId={risk.ticketId}
                parentKey={itemKey}
                level={4}
                expandedItems={expandedItems}
                onToggleExpansion={onToggleExpansion}
                getChildItems={getChildItems}
              />
            )}
          </RiskTableRow>
        );
      })}
    </>
  );
}
