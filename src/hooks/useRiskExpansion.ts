
import { useState, useMemo, useEffect } from 'react';
import { Risk } from '@/types';

export const useRiskExpansion = (filteredRisks: Risk[], allRisksData: Risk[]) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [expandAll, setExpandAll] = useState(true); // Changed to true for default expand

  const toggleItemExpansion = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      // Collapse this item and all its children
      const itemsToRemove = Array.from(newExpanded).filter(ticketId => ticketId.startsWith(itemId));
      itemsToRemove.forEach(ticketId => newExpanded.delete(ticketId));
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const getAllItemsRecursively = (parentId: number, parentKey: string): string[] => {
    const items: string[] = [];
    const children = allRisksData.filter(item => item.parentId === parentId);
    
    children.forEach(child => {
      const childKey = `${parentKey}-${child.ticketId}`;
      items.push(childKey);
      
      // Recursively get all descendants
      const grandChildren = getAllItemsRecursively(child.ticketId, childKey);
      items.push(...grandChildren);
    });
    
    return items;
  };

  const getAllExpandedItems = () => {
    const allItems = new Set<string>();
    const principalCategories = [...new Set(filteredRisks.map(r => r.principalRiskCategory).filter(Boolean))];
    
    principalCategories.forEach(category => {
      const principalKey = `-${category}`;
      allItems.add(principalKey);
      
      // Add sub categories
      const risksInCategory = filteredRisks.filter(r => r.principalRiskCategory === category);
      const subCategories = [...new Set(risksInCategory.map(r => r.subRiskCategory).filter(Boolean))];
      
      subCategories.forEach(subCategory => {
        const subKey = `${principalKey}-${subCategory}`;
        allItems.add(subKey);
        
        // Add risks in this subcategory
        const risksInSubCategory = risksInCategory.filter(r => r.subRiskCategory === subCategory);
        risksInSubCategory.forEach(risk => {
          const riskKey = `${subKey}-${risk.ticketId}`;
          allItems.add(riskKey);
          
          // Recursively add all children (controls, incidents, etc.)
          const allChildren = getAllItemsRecursively(risk.ticketId, riskKey);
          allChildren.forEach(childKey => allItems.add(childKey));
        });
      });
      
      // Handle risks without subcategories
      const risksWithoutSubcategory = risksInCategory.filter(r => !r.subRiskCategory);
      risksWithoutSubcategory.forEach(risk => {
        const riskKey = `${principalKey}-${risk.ticketId}`;
        allItems.add(riskKey);
        
        // Recursively add all children (controls, incidents, etc.)
        const allChildren = getAllItemsRecursively(risk.ticketId, riskKey);
        allChildren.forEach(childKey => allItems.add(childKey));
      });
    });
    
    return allItems;
  };

  const toggleExpandAll = () => {
    if (expandAll) {
      setExpandedItems(new Set());
    } else {
      const allItems = getAllExpandedItems();
      setExpandedItems(allItems);
    }
    setExpandAll(!expandAll);
  };

  // Auto-expand all on initial load when data is available
  useEffect(() => {
    if (filteredRisks.length > 0 && allRisksData.length > 0 && expandedItems.size === 0) {
      console.log('🔄 Auto-expanding all items on initial load');
      const allItems = getAllExpandedItems();
      console.log('🔄 All items to expand:', Array.from(allItems));
      setExpandedItems(allItems);
    }
  }, [filteredRisks.length, allRisksData.length]);

  console.log('🔄 useRiskExpansion debug:', {
    expandAll,
    expandedItemsCount: expandedItems.size,
    expandedItems: Array.from(expandedItems),
    filteredRisksCount: filteredRisks.length
  });

  return {
    expandedItems,
    expandAll,
    toggleItemExpansion,
    toggleExpandAll
  };
};
