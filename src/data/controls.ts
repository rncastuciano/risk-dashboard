
import { Risk } from '@/types';

export const controls: Risk[] = [
  {
    ticketId: 11,
    title: "Server Monitoring System",
    type: "Control",
    owner: "John Smith",
    subDepartment: "IT Operations",
    department: "Technology",
    status: "Active",
    controlMaturity: "Automated",
    controlEffectiveness: "Effective",
    parentId: 1
  },
  {
    ticketId: 12,
    title: "Backup Data Center",
    type: "Control",
    owner: "Alex Kumar",
    subDepartment: "IT Operations",
    department: "Technology",
    status: "Active",
    controlMaturity: "Auto w/ Manual Dependency",
    controlEffectiveness: "Ineffective",
    parentId: 1
  },
  {
    ticketId: 13,
    title: "Knowledge Documentation",
    type: "Control",
    owner: "Jane Doe",
    subDepartment: "Human Resource",
    department: "People",
    status: "Active",
    controlMaturity: "Manual",
    controlEffectiveness: "Partially Ineffective",
    parentId: 2
  },
  {
    ticketId: 14,
    title: "Succession Planning",
    type: "Control",
    owner: "Mark Thompson",
    subDepartment: "Human Resource",
    department: "People",
    status: "Active",
    controlMaturity: "Manual",
    controlEffectiveness: "Effective",
    parentId: 2
  },
  {
    ticketId: 15,
    title: "Interest Rate Hedging",
    type: "Control",
    owner: "Mary Brown",
    subDepartment: "Finance",
    department: "Finance",
    status: "Active",
    controlMaturity: "Automated",
    controlEffectiveness: "Effective",
    parentId: 3
  },
  {
    ticketId: 16,
    title: "Financial Derivatives",
    type: "Control",
    owner: "David Lee",
    subDepartment: "Finance",
    department: "Finance",
    status: "Active",
    controlMaturity: "Auto w/ Manual Dependency",
    controlEffectiveness: "Ineffective",
    parentId: 3
  },
  {
    ticketId: 17,
    title: "Monthly Budget Reviews",
    type: "Control",
    owner: "Keanu Reeves",
    subDepartment: "Finance",
    department: "Finance",
    status: "Active",
    controlMaturity: "Manual",
    controlEffectiveness: "Partially Ineffective",
    parentId: 4
  },
  {
    ticketId: 18,
    title: "Expense Approval Workflow",
    type: "Control",
    owner: "Anna Rodriguez",
    subDepartment: "Finance",
    department: "Finance",
    status: "Active",
    controlMaturity: "Auto w/ Manual Dependency",
    controlEffectiveness: "Effective",
    parentId: 4
  },
  {
    ticketId: 19,
    title: "Firewall Protection",
    type: "Control",
    owner: "Mike Johnson",
    subDepartment: "IT Security",
    department: "Technology",
    status: "Active",
    controlMaturity: "Automated",
    controlEffectiveness: "Effective",
    parentId: 5
  },
  {
    ticketId: 20,
    title: "Employee Security Training",
    type: "Control",
    owner: "Rachel Green",
    subDepartment: "IT Security",
    department: "Technology",
    status: "Active",
    controlMaturity: "Manual",
    controlEffectiveness: "Partially Ineffective",
    parentId: 5
  }
];
