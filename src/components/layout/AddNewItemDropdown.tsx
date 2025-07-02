import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
const actionItems = [{
  label: "Add a new risk",
  url: "https://dev.azure.com/flagstoneim/GRC/_workitems/create/enterprise%20risk"
}, {
  label: "Add a new control",
  url: "https://dev.azure.com/flagstoneim/GRC/_workitems/create/grc%20control"
}, {
  label: "Report a new risk incident",
  url: "https://dev.azure.com/flagstoneim/Flagstone/_workitems/create/incident"
}, {
  label: "Request a risk exception",
  url: "https://dev.azure.com/flagstoneim/GRC/_workitems/create/exception"
}, {
  label: "Raise a control finding",
  url: "https://dev.azure.com/flagstoneim/GRC/_workitems/create/assurance%20finding"
}];
export function AddNewItemDropdown() {
  const handleItemClick = (url: string) => {
    window.open(url, '_blank');
  };
  return <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-gray-800 text-white hover:bg-gray-700 h-10">
          <Plus size={16} />
          <span>Add Item</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {actionItems.map((item, index) => <DropdownMenuItem key={index} onClick={() => handleItemClick(item.url)} className="cursor-pointer">
            {item.label}
          </DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>;
}