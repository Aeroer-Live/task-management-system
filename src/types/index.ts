// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

// Task Types
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  // Project association
  projectId?: string;
  projectName?: string;
  // Task type and specific fields
  taskType: 'regular' | 'development' | 'financial' | 'meeting';
  tags: string[];
  // Type-specific fields
  productLink?: string;
  amount?: string;
  currency?: 'USD' | 'MYR';
  paymentLink?: string;
  renewalFrequency?: string;
  repositoryLink?: string;
  branchName?: string;
  issueLink?: string;
  techStack?: string;
  // Meeting-specific fields
  meetingLink?: string;
  meetingType?: 'online' | 'in-person' | 'hybrid';
  attendees?: string;
  duration?: string;
  meetingDate?: string;
  meetingTime?: string;
  // Assignment
  assignedTo?: string;
  assignedToName?: string;
  // Time tracking
  estimatedHours?: number;
  actualHours?: number;
  // Legacy fields for backward compatibility
  recurring?: boolean;
  recurringPattern?: string;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description?: string;
  type: 'developer' | 'marketing' | 'general';
  status: 'active' | 'on-hold' | 'completed' | 'archived';
  owner: string;
  members: string[];
  tasks: Task[];
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Calendar Event Types
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: string[];
  isAllDay: boolean;
  color?: string;
  createdAt: string;
}

// Time Log Types
export interface TimeLog {
  id: string;
  taskId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in minutes
  notes?: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error' | 'task' | 'project' | 'deadline' | 'system';
  read: boolean;
  link?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: string;
  expiresAt?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'task' | 'project' | 'calendar' | 'system' | 'team' | 'reminder';
}

