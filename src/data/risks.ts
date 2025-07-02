
import { Risk } from '@/types';

export const topLevelRisks: Risk[] = [
  {
    ticketId: 1,
    title: "System Availability Risk",
    type: "Risk",
    owner: "John Smith",
    subDepartment: "IT Operations",
    department: "Technology",
    status: "Active",
    rating: "High",
    principalRiskCategory: "Operational Risk",
    subRiskCategory: "Technology & Infrastructure"
  },
  {
    ticketId: 2,
    title: "Key Personnel Departure",
    type: "Risk",
    owner: "Jane Doe",
    subDepartment: "Human Resource",
    department: "People",
    status: "Active",
    rating: "Medium",
    principalRiskCategory: "Operational Risk",
    subRiskCategory: "Human Resources"
  },
  {
    ticketId: 3,
    title: "Interest Rate Fluctuation",
    type: "Risk",
    owner: "Mary Brown",
    subDepartment: "Finance",
    department: "Finance",
    status: "Active",
    rating: "Critical",
    principalRiskCategory: "Financial Risk",
    subRiskCategory: "Market Risk"
  },
  {
    ticketId: 4,
    title: "Budget Variance Risk",
    type: "Risk",
    owner: "Keanu Reeves",
    subDepartment: "Finance",
    department: "Finance",
    status: "Active",
    rating: "Low",
    principalRiskCategory: "Financial Risk",
    subRiskCategory: "Financial Planning & Control"
  },
  {
    ticketId: 5,
    title: "Cybersecurity Breach",
    type: "Risk",
    owner: "Mike Johnson",
    subDepartment: "IT Security",
    department: "Technology",
    status: "Active",
    rating: "Critical",
    principalRiskCategory: "Operational Risk",
    subRiskCategory: "Information Security"
  },
  {
    ticketId: 6,
    title: "Regulatory Compliance",
    type: "Risk",
    owner: "Sarah Wilson",
    subDepartment: "Regulatory Affairs",
    department: "Compliance",
    status: "Active",
    rating: "High",
    principalRiskCategory: "Compliance Risk",
    subRiskCategory: "Regulatory Compliance"
  }
];
