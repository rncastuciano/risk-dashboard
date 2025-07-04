interface SeverityBadgeProps {
  severity: string;
}

export const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  const getSeverityBadge = (severity: string) => {
    // If severity is null, undefined, or empty, return plain text
    if (!severity || severity.trim() === '') {
      return <span>{severity || ''}</span>;
    }

    const colorMap: Record<string, string> = {
      'Critical': 'bg-red-100 text-red-800 border-red-200',
      'High': 'bg-orange-100 text-orange-800 border-orange-200',
      'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Low': 'bg-green-100 text-green-800 border-green-200',
      'Major Incident': 'bg-red-100 text-red-800 border-red-200',
      'Incident': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorMap[severity] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {severity}
      </span>
    );
  };

  return getSeverityBadge(severity);
};
