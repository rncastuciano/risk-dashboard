import { useState, useEffect, useMemo } from 'react';
// Import mock data directly
import mockMetricsData from '@/data/metrics';
import { topLevelRisks } from '@/data/risks';

export const useRiskCategoryData = () => {
  const [riskCategories, setRiskCategories] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);

      // Combine all data sources from mock files
      const allData = [
        ...mockMetricsData.map(item => ({
          Principal_Risk_Category: item.principalRiskCategory,
          Sub_Risk_Category: item.subRiskCategory,
        })),
        ...topLevelRisks.map(item => ({
          Principal_Risk_Category: item.principalRiskCategory,
          Sub_Risk_Category: item.subRiskCategory,
        })),
      ];

      // Build risk category structure
      const categoryMap = new Map<string, Set<string>>();

      allData.forEach(item => {
        if (item.Principal_Risk_Category) {
          if (!categoryMap.has(item.Principal_Risk_Category)) {
            categoryMap.set(item.Principal_Risk_Category, new Set());
          }
          if (item.Sub_Risk_Category) {
            categoryMap.get(item.Principal_Risk_Category)!.add(item.Sub_Risk_Category);
          }
        }
      });

      // Convert to object format
      const categoryStructure: { [key: string]: string[] } = {};
      categoryMap.forEach((subCategories, principalCategory) => {
        categoryStructure[principalCategory] = Array.from(subCategories).sort();
      });

      setRiskCategories(categoryStructure);
      setError(null);
    } catch (err) {
      console.error('Error fetching risk categories:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get flat list of all principal risk categories
  const categoryOptions = useMemo(() => {
    return Object.keys(riskCategories).sort();
  }, [riskCategories]);

  return {
    riskCategoryStructure: riskCategories,
    categoryOptions,
    loading,
    error
  };
};