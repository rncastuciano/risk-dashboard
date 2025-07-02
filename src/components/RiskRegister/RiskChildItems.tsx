
import { Risk } from '@/types';
import { RiskTableRow } from '@/components/RiskRegister/RiskTableRow';

interface RiskChildItemsProps {
  parentId: number;
  parentKey: string;
  level: number;
  expandedItems: Set<string>;
  onToggleExpansion: (itemId: string) => void;
  getChildItems: (parentId: number) => Risk[];
}

export function RiskChildItems({
  parentId,
  parentKey,
  level,
  expandedItems,
  onToggleExpansion,
  getChildItems
}: RiskChildItemsProps) {
  const childItems = getChildItems(parentId);

  return (
    <>
      {childItems.map((childItem) => {
        const childKey = `${parentKey}-${childItem.ticketId}`;
        const childIsExpanded = expandedItems.has(childKey);
        const grandChildItems = getChildItems(childItem.ticketId);
        
        return (
          <RiskTableRow
            key={childKey}
            risk={childItem}
            level={level}
            isExpanded={childIsExpanded}
            onToggleExpansion={() => onToggleExpansion(childKey)}
            hasChildren={grandChildItems.length > 0}
          >
            {childIsExpanded && grandChildItems.length > 0 && (
              <RiskChildItems
                parentId={childItem.ticketId}
                parentKey={childKey}
                level={level + 1}
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
