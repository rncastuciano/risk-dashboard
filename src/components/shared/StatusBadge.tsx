
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getColorClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Open':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Planned':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Under Review':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Within Tolerance':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Near Breach':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Tolerance Breach':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      getColorClass(status),
      className
    )}>
      {status}
    </span>
  );
};
