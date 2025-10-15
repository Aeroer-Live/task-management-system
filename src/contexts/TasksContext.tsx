'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, Task, Project, ApiResponse } from '@/lib/api';

interface TasksContextType {
  tasks: Task[];
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: (filters?: { status?: string; priority?: string; projectId?: string }) => Promise<void>;
  fetchProjects: () => Promise<void>;
  createTask: (taskData: Partial<Task>) => Promise<ApiResponse>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<ApiResponse>;
  deleteTask: (id: string) => Promise<ApiResponse>;
  createProject: (projectData: Partial<Project>) => Promise<ApiResponse>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<ApiResponse>;
  deleteProject: (id: string) => Promise<ApiResponse>;
  refreshTasks: () => Promise<void>;
  refreshProjects: () => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async (filters?: { status?: string; priority?: string; projectId?: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getTasks(filters);
      if (response.data) {
        setTasks(response.data.tasks);
      } else {
        setError(response.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getProjects();
      if (response.data) {
        setProjects(response.data.projects);
      } else {
        setError(response.error || 'Failed to fetch projects');
      }
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (taskData: Partial<Task>): Promise<ApiResponse> => {
    try {
      const response = await api.createTask(taskData);
      if (response.data) {
        // Refresh tasks list
        await fetchTasks();
      }
      return response;
    } catch (err) {
      return { error: 'Failed to create task' };
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>): Promise<ApiResponse> => {
    try {
      const response = await api.updateTask(id, updates);
      if (response.data) {
        // Update local state
        setTasks(prev => prev.map(task => 
          task.id === id ? { ...task, ...updates } : task
        ));
      }
      return response;
    } catch (err) {
      return { error: 'Failed to update task' };
    }
  };

  const deleteTask = async (id: string): Promise<ApiResponse> => {
    try {
      const response = await api.deleteTask(id);
      if (response.data) {
        // Remove from local state
        setTasks(prev => prev.filter(task => task.id !== id));
      }
      return response;
    } catch (err) {
      return { error: 'Failed to delete task' };
    }
  };

  const createProject = async (projectData: Partial<Project>): Promise<ApiResponse> => {
    try {
      const response = await api.createProject(projectData);
      if (response.data) {
        // Refresh projects list
        await fetchProjects();
      }
      return response;
    } catch (err) {
      return { error: 'Failed to create project' };
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>): Promise<ApiResponse> => {
    try {
      const response = await api.updateProject(id, updates);
      if (response.data) {
        // Update local state
        setProjects(prev => prev.map(project => 
          project.id === id ? { ...project, ...updates } : project
        ));
      }
      return response;
    } catch (err) {
      return { error: 'Failed to update project' };
    }
  };

  const deleteProject = async (id: string): Promise<ApiResponse> => {
    try {
      const response = await api.deleteProject(id);
      if (response.data) {
        // Remove from local state
        setProjects(prev => prev.filter(project => project.id !== id));
        // Also remove tasks associated with this project
        setTasks(prev => prev.filter(task => task.projectId !== id));
      }
      return response;
    } catch (err) {
      return { error: 'Failed to delete project' };
    }
  };

  const refreshTasks = () => fetchTasks();
  const refreshProjects = () => fetchProjects();

  // Load initial data
  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const value: TasksContextType = {
    tasks,
    projects,
    isLoading,
    error,
    fetchTasks,
    fetchProjects,
    createTask,
    updateTask,
    deleteTask,
    createProject,
    updateProject,
    deleteProject,
    refreshTasks,
    refreshProjects,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}