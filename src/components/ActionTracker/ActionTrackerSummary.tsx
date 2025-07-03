
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, AlertCircle, Shield, Flag, BarChart3, FileX } from 'lucide-react';
import { ActionTracker } from '@/types';
import { GenericFilterState } from '@/types/filterConfig';

interface ActionTrackerSummaryProps {
  filteredInsights: ActionTracker[];
  hasActiveFilters: boolean;
  onSummaryBoxClick: (ticketType?: string) => void;
  filters: GenericFilterState;
}

export const ActionTrackerSummary = ({ 
  filteredInsights, 
  hasActiveFilters, 
  onSummaryBoxClick,
  filters 
}: ActionTrackerSummaryProps) => {
  const summaryData = useMemo(() => {
    const total = filteredInsights.length;
    const byType = filteredInsights.reduce((acc, insight) => {
      acc[insight.ticketType] = (acc[insight.ticketType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return { total, byType };
  }, [filteredInsights]);

  const getSummaryMessage = () => {
    const { total } = summaryData;
    if (hasActiveFilters) {
      const filterParts = [];
      if (filters.departments?.length || 0 > 0) {
        filterParts.push(`${filters.departments?.length || 0} department(s)`);
      }
      if (filters.categories?.length || 0 > 0) {
        filterParts.push(`${filters.categories?.length || 0} category(s)`);
      }
      return `Showing ${total} actions filtered by ${filterParts.join(' and ')}`;
    }
    return `Showing all ${total} action items across all departments and ticket types`;
  };

  const handleTypeBoxClick = (ticketType: string) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(ticketType)
      ? currentCategories.filter(c => c !== ticketType)
      : [...currentCategories, ticketType];
    
    onSummaryBoxClick(ticketType);
  };

  const handleTotalClick = () => {
    // Clear all filters when clicking total
    onSummaryBoxClick();
  };

  const getTypeSummaryCards = () => {
    const typeCards = [
      {
        type: 'Incident',
        displayName: 'Incident',
        pluralName: 'Incidents',
        count: summaryData.byType['Incident'] || 0,
        bgColor: 'bg-red-50',
        textColor: 'text-red-600',
        labelColor: 'text-red-800',
        hoverColor: 'hover:bg-red-100',
        selectedColor: 'bg-red-100 border-red-300 border-2',
        icon: AlertTriangle
      },
      {
        type: 'Issue',
        displayName: 'Issue',
        pluralName: 'Issues',
        count: summaryData.byType['Issue'] || 0,
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-600',
        labelColor: 'text-yellow-800',
        hoverColor: 'hover:bg-yellow-100',
        selectedColor: 'bg-yellow-100 border-yellow-300 border-2',
        icon: Flag
      },
      {
        type: 'Risk Action',
        displayName: 'Risk Action',
        pluralName: 'Risk Actions',
        count: summaryData.byType['Risk Action'] || 0,
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-600',
        labelColor: 'text-purple-800',
        hoverColor: 'hover:bg-purple-100',
        selectedColor: 'bg-purple-100 border-purple-300 border-2',
        icon: Shield
      },
      {
        type: 'General',
        displayName: 'General',
        pluralName: 'General',
        count: summaryData.byType['General'] || 0,
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-600',
        labelColor: 'text-gray-800',
        hoverColor: 'hover:bg-gray-100',
        selectedColor: 'bg-gray-100 border-gray-300 border-2',
        icon: AlertCircle
      },
      {
        type: 'Exception',
        displayName: 'Exception',
        pluralName: 'Exceptions',
        count: summaryData.byType['Exception'] || 0,
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-600',
        labelColor: 'text-orange-800',
        hoverColor: 'hover:bg-orange-100',
        selectedColor: 'bg-orange-100 border-orange-300 border-2',
        icon: FileX
      }
    ];

    return typeCards;
  };

  const isTypeSelected = (ticketType: string) => {
    return filters.categories?.includes(ticketType) || false;
  };

  const isTotalSelected = () => {
    return !hasActiveFilters;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{getSummaryMessage()}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Total Items Card */}
          <div 
            className={`${isTotalSelected() ? 'bg-blue-100 border-blue-300 border-2' : 'bg-blue-50'} p-4 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors`}
            onClick={handleTotalClick}
          >
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="text-blue-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-blue-600 text-center">{summaryData.total}</div>
            <div className="text-sm text-blue-800 text-center">Total Items</div>
          </div>
          
          {/* Type-specific Cards */}
          {getTypeSummaryCards().map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.type} 
                className={`${isTypeSelected(card.type) ? card.selectedColor : card.bgColor} ${card.hoverColor} p-4 rounded-lg cursor-pointer transition-colors`}
                onClick={() => handleTypeBoxClick(card.type)}
              >
                <div className="flex items-center justify-center mb-2">
                  <IconComponent className={card.textColor} size={24} />
                </div>
                <div className={`text-2xl font-bold ${card.textColor} text-center`}>{card.count}</div>
                <div className={`text-sm ${card.labelColor} text-center`}>{card.count === 1 ? card.displayName : card.pluralName}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
