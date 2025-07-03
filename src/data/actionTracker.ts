import { ActionTracker } from '@/types';

export const others: ActionTracker[] = [
  {
    ticketId: 31,
    title: "Server Hardware Failure",
    ticketType: "Incident",
    owner: "John Smith",
    subDepartment: "IT Operations",
    department: "Technology",
    status: "Closed",
    severity: "Medium",
    dueDate: "2024-07-15",
    parentId: 11
  },
  {
    ticketId: 32,
    title: "Network Connectivity Issues",
    ticketType: "Issue",
    owner: "Alex Kumar",
    subDepartment: "IT Operations",
    department: "Technology",
    status: "Open",
    severity: "Low",
    dueDate: "2024-07-20",
    parentId: 11
  },
  {
    ticketId: 33,
    title: "Monitoring System Upgrade",
    ticketType: "Risk Action",
    owner: "John Smith",
    subDepartment: "IT Operations",
    department: "Technology",
    status: "In Progress",
    severity: "Low",
    dueDate: "2024-07-25",
    parentId: 11
  },
  {
    ticketId: 34,
    title: "Data Center Power Upgrade",
    ticketType: "Incident",
    owner: "Alex Kumar",
    subDepartment: "IT Operations",
    department: "Technology",
    status: "Closed",
    severity: "High",
    dueDate: "2024-07-10",
    parentId: 12
  },
  {
    ticketId: 35,
    title: "Backup System Testing",
    ticketType: "Risk Action",
    owner: "Alex Kumar",
    subDepartment: "IT Operations",
    department: "Technology",
    status: "Planned",
    severity: "Medium",
    dueDate: "2024-07-30",
    parentId: 12
  },
  {
    ticketId: 36,
    title: "Senior Developer Resignation",
    ticketType: "Incident",
    owner: "Jane Doe",
    subDepartment: "Human Resource",
    department: "People",
    status: "Closed",
    severity: "High",
    dueDate: "2024-07-05",
    parentId: 13
  },
  {
    ticketId: 40,
    title: "Interest Rate Spike Event",
    ticketType: "Incident",
    owner: "Mary Brown",
    subDepartment: "Finance",
    department: "Finance",
    status: "Closed",
    severity: "Critical",
    dueDate: "2024-07-12",
    parentId: 15
  },
  {
    ticketId: 44,
    title: "Budget Overspend Alert",
    ticketType: "Incident",
    owner: "Keanu Reeves",
    subDepartment: "Finance",
    department: "Finance",
    status: "Closed",
    severity: "Medium",
    dueDate: "2024-07-18",
    parentId: 17
  },
  {
    ticketId: 48,
    title: "Malware Detection Event",
    ticketType: "Exception",
    owner: "Mike Johnson",
    subDepartment: "IT Security",
    department: "Technology",
    status: "Closed",
    severity: "High",
    dueDate: "2024-07-08",
    parentId: 19
  }
];