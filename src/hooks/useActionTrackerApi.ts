import { useState, useEffect } from 'react';
import { ActionTracker } from '@/types';

interface UseActionTrackerApiReturn {
  data: ActionTracker[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useActionTrackerApi = (refreshKey: number = 0): UseActionTrackerApiReturn => {
  const [data, setData] = useState<ActionTracker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Attempting to fetch from API...'); // Debug log
      
      // Try the proxy first, then fallback to direct URL
      let response;
      try {
        response = await fetch('/api/action-tracker', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('📡 Proxy response status:', response.status); // Debug log
      } catch (proxyError) {
        console.log('⚠️ Proxy failed, trying direct URL...', proxyError);
        response = await fetch('http://localhost:3000/api/action-tracker', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('📡 Direct response status:', response.status); // Debug log
      }
      
      console.log('📡 Response ok:', response.ok); // Debug log
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      const apiData = await response.json();
      console.log('📦 API Data received:', apiData); // Debug log
      console.log('📦 Data type:', typeof apiData); // Debug log
      console.log('📦 Data length:', Array.isArray(apiData) ? apiData.length : 'Not an array'); // Debug log
      
      setData(Array.isArray(apiData) ? apiData : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching data';
      setError(errorMessage);
      console.error('❌ Error fetching action tracker data:', err);
      console.error('❌ Error details:', {
        name: err instanceof Error ? err.name : 'Unknown',
        message: errorMessage,
        stack: err instanceof Error ? err.stack : undefined
      });
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    console.log('🔄 Manual refetch triggered');
    fetchData();
  };

  useEffect(() => {
    console.log('🚀 useActionTrackerApi hook mounted, refreshKey:', refreshKey);
    fetchData();
  }, [refreshKey]);

  return {
    data,
    loading,
    error,
    refetch
  };
};
