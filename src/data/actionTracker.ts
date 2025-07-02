
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
    impact: "System Downtime",
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
    impact: "Performance Degradation",
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
    impact: "Improved Detection",
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
    impact: "Service Interruption",
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
    impact: "Validation",
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
    impact: "Knowledge Loss",
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
    impact: "Portfolio Impact",
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
    impact: "Financial Impact",
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
    impact: "Security Breach",
    parentId: 19
  }
];
