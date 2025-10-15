// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://productivity-system-api.aeroermark.workers.dev';

// Force the correct API URL for production
const PRODUCTION_API_URL = 'https://productivity-system-api.aeroermark.workers.dev';

// Debug: Log the API URL to help with troubleshooting
if (typeof window !== 'undefined') {
  console.log('API Base URL:', API_BASE_URL);
}

// API Response Types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  taskType: 'regular' | 'development' | 'financial' | 'meeting';
  tags: string[];
  projectId?: string;
  projectName?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  type: 'developer' | 'marketing' | 'general';
  status: 'active' | 'on-hold' | 'completed' | 'archived';
  owner: string;
  startDate?: string;
  endDate?: string;
  taskCount: number;
  completedTasks: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar_url?: string;
  createdAt: string;
  updatedAt?: string;
}

// API Client Class
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  private loadToken() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  hasValidToken(): boolean {
    if (!this.token) return false;
    
    try {
      // Decode the token to check expiration
      const tokenData = JSON.parse(atob(this.token));
      if (tokenData.exp && Date.now() > tokenData.exp) {
        this.clearToken();
        return false;
      }
      return true;
    } catch (error) {
      // Invalid token format
      this.clearToken();
      return false;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // If it's an authentication error, clear the token
        if (response.status === 401) {
          this.clearToken();
        }
        return {
          error: data.error || data.message || 'Request failed',
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Health Check
  async healthCheck() {
    return this.request('/health');
  }

  // Authentication
  async register(email: string, password: string, name: string) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async login(email: string, password: string) {
    const response = await this.request<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async getCurrentUser() {
    return this.request<User>('/api/auth/me');
  }

  // Tasks
  async getTasks(filters?: {
    status?: string;
    priority?: string;
    projectId?: string;
  }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.projectId) params.append('projectId', filters.projectId);

    const queryString = params.toString();
    const endpoint = `/api/tasks${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ tasks: Task[] }>(endpoint);
  }

  async getTask(id: string) {
    return this.request<Task>(`/api/tasks/${id}`);
  }

  async createTask(taskData: Partial<Task>) {
    return this.request<{ taskId: string }>('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(id: string, updates: Partial<Task>) {
    return this.request(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteTask(id: string) {
    return this.request(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Projects
  async getProjects() {
    return this.request<{ projects: Project[] }>('/api/projects');
  }

  async getProject(id: string) {
    return this.request<{ project: Project }>(`/api/projects/${id}`);
  }

  async createProject(projectData: Partial<Project>) {
    return this.request<{ projectId: string }>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(id: string, updates: Partial<Project>) {
    return this.request(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Calendar Events
  async getCalendarEvents(startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('start', startDate);
    if (endDate) params.append('end', endDate);

    const queryString = params.toString();
    const endpoint = `/api/calendar/events${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ events: any[] }>(endpoint);
  }

  async createCalendarEvent(eventData: any) {
    return this.request<{ eventId: string }>('/api/calendar/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  // Time Tracking
  async getTimeLogs(taskId?: string, startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (taskId) params.append('taskId', taskId);
    if (startDate) params.append('start', startDate);
    if (endDate) params.append('end', endDate);

    const queryString = params.toString();
    const endpoint = `/api/time-tracking/logs${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ logs: any[] }>(endpoint);
  }

  async startTimeTracking(taskId: string, notes?: string) {
    return this.request<{ logId: string; startTime: string }>('/api/time-tracking/start', {
      method: 'POST',
      body: JSON.stringify({ taskId, notes }),
    });
  }

  async stopTimeTracking(notes?: string) {
    return this.request<{ duration: number; endTime: string }>('/api/time-tracking/stop', {
      method: 'POST',
      body: JSON.stringify({ notes }),
    });
  }

  async getActiveTimer() {
    return this.request<{ active: boolean; timer?: any }>('/api/time-tracking/active');
  }

  // Notifications
  async getNotifications(unreadOnly?: boolean, limit?: number) {
    const params = new URLSearchParams();
    if (unreadOnly) params.append('unread', 'true');
    if (limit) params.append('limit', limit.toString());

    const queryString = params.toString();
    const endpoint = `/api/notifications${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ notifications: any[] }>(endpoint);
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/api/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/api/notifications/read-all', {
      method: 'PUT',
    });
  }

  // User Profile Management
  async getUserProfile() {
    return this.request<{ user: User }>('/api/users/profile');
  }

  async updateUserProfile(profileData: {
    name: string;
    bio?: string;
    location?: string;
    website?: string;
  }) {
    return this.request<{ user: User; message: string }>('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
  }) {
    return this.request<{ message: string }>('/api/users/password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  }
}

// Create and export API client instance
// Use production API URL for deployed version
const finalApiUrl = typeof window !== 'undefined' && window.location.hostname.includes('pages.dev') 
  ? PRODUCTION_API_URL 
  : API_BASE_URL;

export const api = new ApiClient(finalApiUrl);

// Export types
export type { Task, Project, User, ApiResponse };
