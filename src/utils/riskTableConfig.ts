
export const columnWidths = {
  title: "w-80", // Increased width since it now includes the expand button
  type: "w-32", 
  owner: "w-24",
  department: "w-28",
  status: "w-24",
  rating: "w-32",
  ticketId: "w-24"
};

export const getRowBackground = (level: number) => {
  switch (level) {
    case 1: return 'bg-blue-50 font-semibold';
    case 2: return 'bg-gray-50 font-medium';
    case 3: return 'bg-white';
    case 4: return 'bg-green-25';
    case 5: return 'bg-red-25';
    default: return 'bg-white';
  }
};

export const getLevelLabel = (level: number) => {
  switch (level) {
    case 1: return 'Principal Risk Category';
    case 2: return 'Sub Risk Category';
    case 3: return 'Risk';
    case 4: return 'Control';
    case 5: return 'Incident/Issue';
    default: return 'Item';
  }
};
