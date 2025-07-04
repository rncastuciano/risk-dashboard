
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Risk } from '@/types';
import { RiskRegisterTableHeader } from './RiskRegisterTableHeader';
import { CategoryBanner } from '@/components/RiskRegister/CategoryBanner';
import { RisksTable } from './RisksTable';
import { columnWidths } from '@/utils/riskTableConfig';

interface RiskRegisterTableProps {
  filteredRisks: Risk[];
  expandedItems: Set<string>;
  onToggleExpansion: (itemId: string) => void;
  getChildItems: (parentId: number) => Risk[];
}

export function RiskRegisterTable({
  filteredRisks,
  expandedItems,
  onToggleExpansion,
  getChildItems
}: RiskRegisterTableProps) {
  // Group risks by principal risk category
  const groupedByPrincipal = filteredRisks.reduce((acc, risk) => {
    const category = risk.principalRiskCategory || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(risk);
    return acc;
  }, {} as Record<string, Risk[]>);

  // Debug logging for grouping
  console.log('📊 RiskRegisterTable - Grouping analysis:');
  console.log('📊 Input filtered risks:', filteredRisks.length);
  console.log('📊 Grouped by principal:', Object.keys(groupedByPrincipal));
  console.log('📊 Group counts:', Object.entries(groupedByPrincipal).map(([key, risks]) => ({
    category: key,
    count: risks.length
  })));
  
  // Show first few risks from each category
  Object.entries(groupedByPrincipal).forEach(([category, risks]) => {
    console.log(`📊 Category "${category}" sample:`, risks.slice(0, 2).map(risk => ({
      ticketId: risk.ticketId,
      title: risk.title,
      subRiskCategory: risk.subRiskCategory
    })));
  });

  const renderSubCategories = (risksInCategory: Risk[], principalKey: string) => {
    const subCategories = [...new Set(risksInCategory.map(r => r.subRiskCategory).filter(Boolean))];
    
    if (subCategories.length > 0) {
      return subCategories.map((subCategory) => {
        const subKey = `${principalKey}-${subCategory}`;
        const isSubExpanded = expandedItems.has(subKey);
        const risksInSubCategory = risksInCategory.filter(r => r.subRiskCategory === subCategory);
        
        return (
          <React.Fragment key={subKey}>
            <CategoryBanner
              categoryName={subCategory}
              level={2}
              itemKey={subKey}
              isExpanded={isSubExpanded}
              onToggleExpansion={onToggleExpansion}
            />
            {isSubExpanded && (
              <RisksTable
                risks={risksInSubCategory}
                parentKey={subKey}
                expandedItems={expandedItems}
                onToggleExpansion={onToggleExpansion}
                getChildItems={getChildItems}
              />
            )}
          </React.Fragment>
        );
      });
    } else {
      // No sub categories, render risks directly
      return (
        <RisksTable
          risks={risksInCategory}
          parentKey={principalKey}
          expandedItems={expandedItems}
          onToggleExpansion={onToggleExpansion}
          getChildItems={getChildItems}
        />
      );
    }
  };

  const principalCategories = Object.keys(groupedByPrincipal);
  console.log('📊 Principal categories to render:', principalCategories);

  return (
    <Card>
      <CardContent className="p-0">
        {/* Single scroll container with both horizontal and vertical scrolling */}
        <div className="max-h-[70vh] overflow-auto">
          <table className="w-full text-sm table-fixed min-w-[900px]">
            <colgroup>
              <col className={columnWidths.title} />
              <col className={columnWidths.type} />
              <col className={columnWidths.owner} />
              <col className={columnWidths.department} />
              <col className="w-32" /> {/* Sub Department column */}
              <col className={columnWidths.status} />
              <col className={columnWidths.rating} />
              <col className={columnWidths.ticketId} />
            </colgroup>
            
            {/* Sticky header */}
            <RiskRegisterTableHeader />
            
            {/* Table body with all content */}
            <tbody>
              {principalCategories.map((principalCategory) => {
                const principalKey = `-${principalCategory}`;
                const isPrincipalExpanded = expandedItems.has(principalKey);
                const risksInCategory = groupedByPrincipal[principalCategory];
                
                console.log(`📊 Rendering category "${principalCategory}" with ${risksInCategory.length} risks, expanded: ${isPrincipalExpanded}`);
                
                return (
                  <React.Fragment key={principalKey}>
                    <CategoryBanner
                      categoryName={principalCategory}
                      level={1}
                      itemKey={principalKey}
                      isExpanded={isPrincipalExpanded}
                      onToggleExpansion={onToggleExpansion}
                    />
                    
                    {isPrincipalExpanded && renderSubCategories(risksInCategory, principalKey)}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
