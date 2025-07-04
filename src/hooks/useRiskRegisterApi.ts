import { useState, useEffect, useCallback, useMemo } from 'react';
import { Risk } from '@/types';

interface UseRiskRegisterApiResult {
  risks: Risk[];
  controls: Risk[];
  others: Risk[];
  allRisksData: Risk[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Helper function to normalize rating values
const normalizeRating = (rating: string): 'Critical' | 'High' | 'Medium' | 'Low' | undefined => {
  if (!rating) return undefined;
  
  const lowerRating = rating.toLowerCase();
  if (lowerRating.includes('critical') || lowerRating.includes('4')) return 'Critical';
  if (lowerRating.includes('high') || lowerRating.includes('3')) return 'High';
  if (lowerRating.includes('medium') || lowerRating.includes('2')) return 'Medium';
  if (lowerRating.includes('low') || lowerRating.includes('1')) return 'Low';
  
  return undefined;
};

// Helper function to normalize department values
const normalizeDepartment = (department: string): string => {
  if (!department || department === 'Unknown' || department.trim() === '') {
    return 'Unknown';
  }
  return department;
};

// Helper function to transform API data to Risk type
const transformToRisk = (item: any): Risk => {
  // For now, let's NOT modify the principalRiskCategory at all
  // to see what the raw data looks like
  const principalCategory = item.principalRiskCategory || 'Uncategorized';
  
  // Debug every transformation to see what's happening
  if (item.ticketId <= 140015) { // Debug first few items
    console.log('🔄 Raw transformation:', {
      ticketId: item.ticketId,
      title: item.title,
      originalPrincipalRiskCategory: item.principalRiskCategory,
      finalPrincipalRiskCategory: principalCategory
    });
  }
  
  return {
    ticketId: item.ticketId,
    title: item.title,
    type: item.type || item.ticketType || 'Risk',
    owner: item.owner || 'Unassigned',
    subDepartment: normalizeDepartment(item.subDepartment),
    department: normalizeDepartment(item.department),
    status: item.status,
    rating: normalizeRating(item.rating),
    principalRiskCategory: principalCategory,
    subRiskCategory: item.subRiskCategory || 'General',
    parentId: item.parentId,
    controlMaturity: item.controlMaturity,
    controlEffectiveness: item.controlEffectiveness,
    severity: normalizeRating(item.severity),
  };
};

export const useRiskRegisterApi = (refreshKey: number = 0): UseRiskRegisterApiResult => {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [controls, setControls] = useState<Risk[]>([]);
  const [others, setOthers] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    console.log('🎯 Risk Register API: Starting data fetch...');
    setLoading(true);
    setError(null);

    try {
      // Fetch all three endpoints in parallel
      const [risksResponse, controlsResponse, othersResponse] = await Promise.allSettled([
        fetch('http://localhost:3000/api/workitems/enterprise-risks').catch(() => 
          fetch('/api/workitems/enterprise-risks')
        ),
        fetch('http://localhost:3000/api/workitems/grc-controls').catch(() => 
          fetch('/api/workitems/grc-controls')
        ),
        fetch('http://localhost:3000/api/action-tracker').catch(() => 
          fetch('/api/action-tracker')
        )
      ]);

      // Handle risks data
      if (risksResponse.status === 'fulfilled' && risksResponse.value.ok) {
        const risksData = await risksResponse.value.json();
        console.log('📊 Raw Risks API Response sample:', risksData.slice(0, 5));
        console.log('📊 Raw Risks Count:', risksData.length);
        
        // Check unique categories in raw data
        const rawPrincipalCategories = [...new Set(risksData.map(item => item.principalRiskCategory))];
        console.log('📊 Raw Principal Risk Categories:', rawPrincipalCategories);
        
        // Show distribution of raw categories
        const rawCategoryDistribution = rawPrincipalCategories.map(cat => ({
          category: cat || '(empty)',
          count: risksData.filter(r => r.principalRiskCategory === cat).length
        }));
        console.log('📊 Raw category distribution:', rawCategoryDistribution);
        
        // Check parentId distribution
        const withParentId = risksData.filter(item => item.parentId);
        const withoutParentId = risksData.filter(item => !item.parentId);
        console.log('📊 Risks with parentId:', withParentId.length);
        console.log('📊 Risks without parentId (top-level):', withoutParentId.length);
        
        const transformedRisks = Array.isArray(risksData) ? risksData.map(transformToRisk) : [];
        console.log('📊 Transformed Risks sample:', transformedRisks.slice(0, 5));
        console.log('📊 Transformed Risks Count:', transformedRisks.length);
        
        // Check unique categories in transformed data
        const transformedPrincipalCategories = [...new Set(transformedRisks.map(item => item.principalRiskCategory))];
        console.log('📊 Transformed Principal Risk Categories:', transformedPrincipalCategories);
        
        // Show distribution of transformed categories
        const transformedCategoryDistribution = transformedPrincipalCategories.map(cat => ({
          category: cat,
          count: transformedRisks.filter(r => r.principalRiskCategory === cat).length
        }));
        console.log('📊 Transformed category distribution:', transformedCategoryDistribution);
        
        // Debug: Show sample risks from each category
        transformedPrincipalCategories.forEach(cat => {
          const sampleRisks = transformedRisks.filter(r => r.principalRiskCategory === cat).slice(0, 3);
          console.log(`📊 Sample risks in category "${cat}":`, sampleRisks.map(r => ({
            ticketId: r.ticketId,
            title: r.title,
            originalCategory: risksData.find(orig => orig.ticketId === r.ticketId)?.principalRiskCategory
          })));
        });
        
        setRisks(transformedRisks);
      } else {
        console.warn('❌ Failed to fetch risks data');
        setRisks([]);
      }

      // Handle controls data
      if (controlsResponse.status === 'fulfilled' && controlsResponse.value.ok) {
        const controlsData = await controlsResponse.value.json();
        console.log('🛡️ Controls API Response:', controlsData);
        const transformedControls = Array.isArray(controlsData) ? controlsData.map(transformToRisk) : [];
        console.log('🛡️ Transformed Controls:', transformedControls);
        setControls(transformedControls);
      } else {
        console.warn('❌ Failed to fetch controls data');
        setControls([]);
      }

      // Handle others data
      if (othersResponse.status === 'fulfilled' && othersResponse.value.ok) {
        const othersData = await othersResponse.value.json();
        console.log('📋 Others API Response:', othersData);
        const transformedOthers = Array.isArray(othersData) ? othersData.map(transformToRisk) : [];
        console.log('📋 Transformed Others:', transformedOthers);
        setOthers(transformedOthers);
      } else {
        console.warn('❌ Failed to fetch others data');
        setOthers([]);
      }

      // Check if all requests failed
      const allFailed = [risksResponse, controlsResponse, othersResponse].every(
        response => response.status === 'rejected' || !response.value.ok
      );

      if (allFailed) {
        throw new Error('All API endpoints failed to respond');
      }

    } catch (err) {
      console.error('💥 Risk Register API Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch risk register data');
      setRisks([]);
      setControls([]);
      setOthers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch and refetch on refreshKey change
  useEffect(() => {
    fetchData();
  }, [fetchData, refreshKey]);

  // Combine all data for filtering and processing
  const allRisksData = useMemo(() => {
    return [...risks, ...controls, ...others];
  }, [risks, controls, others]);

  // Filter for top-level risks only (risks without parentId)
  const topLevelRisks = useMemo(() => {
    const filtered = risks.filter(risk => !risk.parentId);
    console.log('🔍 Top-level risks filtering:');
    console.log('🔍 Total risks:', risks.length);
    console.log('🔍 Top-level risks (no parentId):', filtered.length);
    
    // Check categories in top-level risks
    const topLevelCategories = [...new Set(filtered.map(item => item.principalRiskCategory))];
    console.log('🔍 Top-level Principal Risk Categories:', topLevelCategories);
    
    // Show a sample of top-level risks
    console.log('🔍 Sample top-level risks:', filtered.slice(0, 5).map(risk => ({
      ticketId: risk.ticketId,
      title: risk.title,
      principalRiskCategory: risk.principalRiskCategory,
      subRiskCategory: risk.subRiskCategory,
      parentId: risk.parentId
    })));
    
    return filtered;
  }, [risks]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    risks: topLevelRisks, // Top-level risks only (equivalent to topLevelRisks)
    controls,
    others,
    allRisksData, // Combined data for filtering and child lookups
    loading,
    error,
    refetch
  };
};
