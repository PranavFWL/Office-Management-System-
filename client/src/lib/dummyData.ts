import type { Project, Task, Employee, Finance } from "@shared/schema";

export const dummyProjects: (Project & { id: number })[] = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design",
    status: "in-progress",
    client: "Acme Corporation",
    progress: 75,
    budget: "45000.00",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-03-15"),
    createdAt: new Date("2024-01-10"),
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "iOS and Android app for customer engagement",
    status: "planning",
    client: "TechStart Inc.",
    progress: 25,
    budget: "80000.00",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-06-01"),
    createdAt: new Date("2024-01-20"),
  },
  {
    id: 3,
    name: "Brand Identity",
    description: "Logo and brand guidelines development",
    status: "completed",
    client: "Creative Studio",
    progress: 100,
    budget: "15000.00",
    startDate: new Date("2023-12-01"),
    endDate: new Date("2024-01-31"),
    createdAt: new Date("2023-11-25"),
  },
  {
    id: 4,
    name: "E-commerce Platform",
    description: "Custom e-commerce solution with payment integration",
    status: "on-hold",
    client: "Retail Pro",
    progress: 40,
    budget: "120000.00",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-05-01"),
    createdAt: new Date("2023-12-15"),
  },
];

export const dummyTasks: (Task & { id: number; projectName?: string; assigneeName?: string; frequency?: 'daily' | 'weekly' | 'monthly' | 'one-time' })[] = [
  // Daily Tasks
  {
    id: 1,
    title: "Daily standup meeting",
    description: "Team sync and progress updates",
    status: "done",
    priority: "high",
    projectId: 1,
    projectName: "Website Redesign",
    assigneeId: 1,
    assigneeName: "Sarah Wilson",
    dueDate: new Date("2024-02-15"),
    createdAt: new Date("2024-01-15"),
    frequency: "daily"
  },
  {
    id: 2,
    title: "Code review and testing",
    description: "Review team code submissions and run tests",
    status: "in-progress",
    priority: "high",
    projectId: 2,
    projectName: "Mobile App Development",
    assigneeId: 2,
    assigneeName: "Mike Johnson",
    dueDate: new Date("2024-03-01"),
    createdAt: new Date("2024-02-01"),
    frequency: "daily"
  },
  {
    id: 3,
    title: "Monitor system performance",
    description: "Check server metrics and database performance",
    status: "todo",
    priority: "medium",
    projectId: 4,
    projectName: "E-commerce Platform",
    assigneeId: 3,
    assigneeName: "Alex Chen",
    dueDate: new Date("2024-02-28"),
    createdAt: new Date("2024-02-10"),
    frequency: "daily"
  },
  {
    id: 4,
    title: "Content updates",
    description: "Update website content and blog posts",
    status: "in-progress",
    priority: "low",
    projectId: 1,
    projectName: "Website Redesign",
    assigneeId: 4,
    assigneeName: "Emma Davis",
    dueDate: new Date("2024-03-10"),
    createdAt: new Date("2024-02-05"),
    frequency: "daily"
  },

  // Weekly Tasks
  {
    id: 5,
    title: "Weekly progress report",
    description: "Compile and submit weekly project status report",
    status: "todo",
    priority: "high",
    projectId: 1,
    projectName: "Website Redesign",
    assigneeId: 1,
    assigneeName: "Sarah Wilson",
    dueDate: new Date("2024-02-20"),
    createdAt: new Date("2024-02-13"),
    frequency: "weekly"
  },
  {
    id: 6,
    title: "Client presentation",
    description: "Present weekly deliverables to client stakeholders",
    status: "in-progress",
    priority: "high",
    projectId: 2,
    projectName: "Mobile App Development",
    assigneeId: 2,
    assigneeName: "Mike Johnson",
    dueDate: new Date("2024-02-25"),
    createdAt: new Date("2024-02-18"),
    frequency: "weekly"
  },
  {
    id: 7,
    title: "Security audit",
    description: "Perform weekly security checks and vulnerability assessment",
    status: "done",
    priority: "high",
    projectId: 4,
    projectName: "E-commerce Platform",
    assigneeId: 3,
    assigneeName: "Alex Chen",
    dueDate: new Date("2024-02-22"),
    createdAt: new Date("2024-02-15"),
    frequency: "weekly"
  },
  {
    id: 8,
    title: "Team retrospective",
    description: "Weekly team meeting to discuss improvements",
    status: "todo",
    priority: "medium",
    projectId: 1,
    projectName: "Website Redesign",
    assigneeId: 4,
    assigneeName: "Emma Davis",
    dueDate: new Date("2024-02-26"),
    createdAt: new Date("2024-02-19"),
    frequency: "weekly"
  },

  // Monthly Tasks
  {
    id: 9,
    title: "Monthly budget review",
    description: "Review project expenses and budget allocation",
    status: "in-progress",
    priority: "high",
    projectId: 1,
    projectName: "Website Redesign",
    assigneeId: 1,
    assigneeName: "Sarah Wilson",
    dueDate: new Date("2024-02-29"),
    createdAt: new Date("2024-02-01"),
    frequency: "monthly"
  },
  {
    id: 10,
    title: "Performance evaluation",
    description: "Monthly team performance and project milestone review",
    status: "todo",
    priority: "medium",
    projectId: 2,
    projectName: "Mobile App Development",
    assigneeId: 2,
    assigneeName: "Mike Johnson",
    dueDate: new Date("2024-02-28"),
    createdAt: new Date("2024-02-01"),
    frequency: "monthly"
  },
  {
    id: 11,
    title: "Infrastructure maintenance",
    description: "Monthly server maintenance and updates",
    status: "done",
    priority: "high",
    projectId: 4,
    projectName: "E-commerce Platform",
    assigneeId: 3,
    assigneeName: "Alex Chen",
    dueDate: new Date("2024-02-25"),
    createdAt: new Date("2024-02-01"),
    frequency: "monthly"
  },
  {
    id: 12,
    title: "Client satisfaction survey",
    description: "Monthly client feedback collection and analysis",
    status: "todo",
    priority: "medium",
    projectId: 1,
    projectName: "Website Redesign",
    assigneeId: 4,
    assigneeName: "Emma Davis",
    dueDate: new Date("2024-02-29"),
    createdAt: new Date("2024-02-01"),
    frequency: "monthly"
  },

  // One-time Tasks
  {
    id: 13,
    title: "Initial project setup",
    description: "Set up development environment and project structure",
    status: "done",
    priority: "high",
    projectId: 3,
    projectName: "Brand Identity",
    assigneeId: 1,
    assigneeName: "Sarah Wilson",
    dueDate: new Date("2024-01-20"),
    createdAt: new Date("2024-01-10"),
    frequency: "one-time"
  },
  {
    id: 14,
    title: "API documentation",
    description: "Create comprehensive API documentation",
    status: "in-progress",
    priority: "medium",
    projectId: 2,
    projectName: "Mobile App Development",
    assigneeId: 2,
    assigneeName: "Mike Johnson",
    dueDate: new Date("2024-03-15"),
    createdAt: new Date("2024-02-15"),
    frequency: "one-time"
  },
  {
    id: 15,
    title: "Database migration",
    description: "Migrate legacy data to new database structure",
    status: "todo",
    priority: "high",
    projectId: 4,
    projectName: "E-commerce Platform",
    assigneeId: 3,
    assigneeName: "Alex Chen",
    dueDate: new Date("2024-03-05"),
    createdAt: new Date("2024-02-20"),
    frequency: "one-time"
  }
];

export const dummyEmployees: (Employee & { id: number })[] = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    role: "UI/UX Designer",
    department: "Design",
    avatar: "SW",
    phone: "+1 (555) 123-4567",
    hireDate: new Date("2023-03-15"),
    salary: "75000.00",
    isActive: true,
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Senior Developer",
    department: "Engineering",
    avatar: "MJ",
    phone: "+1 (555) 234-5678",
    hireDate: new Date("2022-08-20"),
    salary: "95000.00",
    isActive: true,
  },
  {
    id: 3,
    name: "Alex Chen",
    email: "alex.chen@company.com",
    role: "Database Administrator",
    department: "Engineering",
    avatar: "AC",
    phone: "+1 (555) 345-6789",
    hireDate: new Date("2023-01-10"),
    salary: "85000.00",
    isActive: true,
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.davis@company.com",
    role: "Full Stack Developer",
    department: "Engineering",
    avatar: "ED",
    phone: "+1 (555) 456-7890",
    hireDate: new Date("2023-06-01"),
    salary: "88000.00",
    isActive: true,
  },
];

export const dummyFinances: (Finance & { id: number; status?: 'received' | 'pending' | 'paid' | 'overdue' })[] = [
  {
    id: 1,
    type: "income",
    category: "Project Payment",
    description: "Website Redesign - Phase 1",
    amount: "22500.00",
    date: new Date("2024-02-01"),
    createdAt: new Date("2024-02-01"),
    status: "received"
  },
  {
    id: 2,
    type: "expense",
    category: "Software License",
    description: "Adobe Creative Suite Annual License",
    amount: "2400.00",
    date: new Date("2024-01-15"),
    createdAt: new Date("2024-01-15"),
    status: "paid"
  },
  {
    id: 3,
    type: "income",
    category: "Consulting",
    description: "Brand Identity Consultation",
    amount: "5000.00",
    date: new Date("2024-01-30"),
    createdAt: new Date("2024-01-30"),
    status: "received"
  },
  {
    id: 4,
    type: "expense",
    category: "Office Supplies",
    description: "Monthly office supplies and equipment",
    amount: "1200.00",
    date: new Date("2024-02-05"),
    createdAt: new Date("2024-02-05"),
    status: "paid"
  },
  {
    id: 5,
    type: "income",
    category: "Project Payment",
    description: "Mobile App Development - Milestone 1",
    amount: "35000.00",
    date: new Date("2024-02-15"),
    createdAt: new Date("2024-02-15"),
    status: "pending"
  },
  {
    id: 6,
    type: "income",
    category: "Project Payment",
    description: "E-commerce Platform - Initial Payment",
    amount: "45000.00",
    date: new Date("2024-02-20"),
    createdAt: new Date("2024-02-20"),
    status: "overdue"
  },
  {
    id: 7,
    type: "expense",
    category: "Salary",
    description: "February salary payments",
    amount: "28000.00",
    date: new Date("2024-02-28"),
    createdAt: new Date("2024-02-28"),
    status: "paid"
  },
  {
    id: 8,
    type: "income",
    category: "Project Payment",
    description: "Website Redesign - Phase 2",
    amount: "22500.00",
    date: new Date("2024-03-01"),
    createdAt: new Date("2024-03-01"),
    status: "pending"
  }
];

// Attendance Data
export const dummyAttendance = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Sarah Wilson",
    date: new Date("2024-02-20"),
    checkIn: "09:15 AM",
    checkOut: "06:30 PM",
    totalHours: "9h 15m",
    status: "present",
    overtime: "1h 15m"
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Mike Johnson",
    date: new Date("2024-02-20"),
    checkIn: "08:45 AM",
    checkOut: "05:45 PM",
    totalHours: "9h 00m",
    status: "present",
    overtime: "1h 00m"
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Alex Chen",
    date: new Date("2024-02-20"),
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    totalHours: "9h 00m",
    status: "present",
    overtime: "1h 00m"
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: "Emma Davis",
    date: new Date("2024-02-20"),
    checkIn: "-",
    checkOut: "-",
    totalHours: "-",
    status: "absent",
    overtime: "-"
  },
  {
    id: 5,
    employeeId: 1,
    employeeName: "Sarah Wilson",
    date: new Date("2024-02-19"),
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
    totalHours: "8h 30m",
    status: "present",
    overtime: "0h 30m"
  },
  {
    id: 6,
    employeeId: 2,
    employeeName: "Mike Johnson",
    date: new Date("2024-02-19"),
    checkIn: "09:30 AM",
    checkOut: "06:15 PM",
    totalHours: "8h 45m",
    status: "late",
    overtime: "0h 45m"
  },
  {
    id: 7,
    employeeId: 3,
    employeeName: "Alex Chen",
    date: new Date("2024-02-19"),
    checkIn: "08:45 AM",
    checkOut: "05:45 PM",
    totalHours: "9h 00m",
    status: "present",
    overtime: "1h 00m"
  },
  {
    id: 8,
    employeeId: 4,
    employeeName: "Emma Davis",
    date: new Date("2024-02-19"),
    checkIn: "09:15 AM",
    checkOut: "05:00 PM",
    totalHours: "7h 45m",
    status: "half-day",
    overtime: "-"
  }
];

export const dashboardStats = {
  activeProjects: 24,
  pendingTasks: 142,
  teamMembers: 86,
  monthlyRevenue: "$84.2k",
};

export const revenueData = [
  { month: "Jan", revenue: 65000, expenses: 45000 },
  { month: "Feb", revenue: 72000, expenses: 48000 },
  { month: "Mar", revenue: 68000, expenses: 42000 },
  { month: "Apr", revenue: 84200, expenses: 52000 },
  { month: "May", revenue: 78000, expenses: 47000 },
  { month: "Jun", revenue: 92000, expenses: 55000 },
];

export const projectStatusData = [
  { status: "Completed", count: 12, color: "#10B981" },
  { status: "In Progress", count: 8, color: "#3B82F6" },
  { status: "On Hold", count: 3, color: "#F59E0B" },
  { status: "Delayed", count: 1, color: "#EF4444" },
];
