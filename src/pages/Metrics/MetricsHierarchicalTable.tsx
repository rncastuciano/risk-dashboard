
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Metric } from '@/types';
import { MetricsTableHeader } from '@/components/Metrics/MetricsTableHeader';
import { MetricsCategoryBanner } from '@/components/Metrics/MetricsCategoryBanner';
import { MetricsSubCategoryTable } from '@/components/Metrics/MetricsSubCategoryTable';

interface MetricsHierarchicalTableProps {
  filteredMetrics: Metric[];
  expandedItems: Set<string>;
  onToggleExpansion: (itemId: string) => void;
}

export function MetricsHierarchicalTable({
  filteredMetrics,
  expandedItems,
  onToggleExpansion
}: MetricsHierarchicalTableProps) {
  // Group metrics by principal risk category
  const groupedByPrincipal = filteredMetrics.reduce((acc, metric) => {
    const category = metric.principalRiskCategory || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(metric);
    return acc;
  }, {} as Record<string, Metric[]>);

  const renderSubCategories = (metricsInCategory: Metric[], principalKey: string) => {
    const subCategories = [...new Set(metricsInCategory.map(m => m.subRiskCategory).filter(Boolean))];
    
    if (subCategories.length > 0) {
      return subCategories.map((subCategory) => {
        const subKey = `${principalKey}-${subCategory}`;
        const isSubExpanded = expandedItems.has(subKey);
        const metricsInSubCategory = metricsInCategory.filter(m => m.subRiskCategory === subCategory);
        
        return (
          <React.Fragment key={subKey}>
            <MetricsCategoryBanner
              categoryName={subCategory}
              level={2}
              itemKey={subKey}
              isExpanded={isSubExpanded}
              onToggleExpansion={onToggleExpansion}
              metricsCount={metricsInSubCategory.length}
            />
            {isSubExpanded && (
              <MetricsSubCategoryTable
                metrics={metricsInSubCategory}
                parentKey={subKey}
              />
            )}
          </React.Fragment>
        );
      });
    } else {
      // No sub categories, render metrics directly
      return (
        <MetricsSubCategoryTable
          metrics={metricsInCategory}
          parentKey={principalKey}
        />
      );
    }
  };

  const principalCategories = Object.keys(groupedByPrincipal);

  return (
    <Card>
      <CardContent className="p-0">
        {/* Single scroll container with both horizontal and vertical scrolling */}
        <div className="max-h-[70vh] overflow-auto">
          <table className="w-full text-sm table-fixed min-w-[1000px]">
            <colgroup>
              <col className="w-80" /> {/* Metric */}
              <col className="w-24" /> {/* Type */}
              <col className="w-32" /> {/* Owner */}
              <col className="w-32" /> {/* Department */}
              <col className="w-32" /> {/* Sub Department */}
              <col className="w-32" /> {/* Status */}
              <col className="w-32" /> {/* Current Value */}
              <col className="w-32" /> {/* Tolerance */}
              <col className="w-24" /> {/* Trend */}
            </colgroup>
            
            {/* Sticky header */}
            <MetricsTableHeader />
            
            {/* Table body with all content */}
            <tbody>
              {principalCategories.map((principalCategory) => {
                const principalKey = `-${principalCategory}`;
                const isPrincipalExpanded = expandedItems.has(principalKey);
                const metricsInCategory = groupedByPrincipal[principalCategory];
                
                return (
                  <React.Fragment key={principalKey}>
                    <MetricsCategoryBanner
                      categoryName={principalCategory}
                      level={1}
                      itemKey={principalKey}
                      isExpanded={isPrincipalExpanded}
                      onToggleExpansion={onToggleExpansion}
                      metricsCount={metricsInCategory.length}
                    />
                    
                    {isPrincipalExpanded && renderSubCategories(metricsInCategory, principalKey)}
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
