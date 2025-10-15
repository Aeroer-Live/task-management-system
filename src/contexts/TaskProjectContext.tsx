'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useTasks } from './TasksContext';
import type { Task } from '@/types';
import { useProjects, type Project } from './ProjectsContext';
import { useCalendar } from './CalendarContext';

interface TaskProjectContextType {
  // Task operations that also update project progress
  addTaskWithProjectSync: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>) => Promise<void>;
  updateTaskWithProjectSync: (id: string, updates: Partial<Task>) => Promise<void>;
  toggleTaskStatusWithProjectSync: (id: string) => Promise<void>;
  deleteTaskWithProjectSync: (id: string) => Promise<void>;
  
  // Project operations that also update task counts
  addProjectWithTaskSync: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'members' | 'isStarred' | 'language'>) => Promise<void>;
  updateProjectWithTaskSync: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProjectWithTaskSync: (id: string) => Promise<void>;
  
  // Utility functions
  calculateProjectProgress: (projectId: string) => number;
  getProjectTaskCounts: (projectId: string) => { total: number; completed: number; inProgress: number; todo: number };
  syncAllProjectProgress: () => void;
}

const TaskProjectContext = createContext<TaskProjectContextType | undefined>(undefined);

export function TaskProjectProvider({ children }: { children: ReactNode }) {
  const { tasks, projects, createTask, updateTask, deleteTask, createProject, updateProject, deleteProject } = useTasks();
  const { syncAllToCalendar } = useCalendar();

  // Calculate project progress based on completed tasks
  const calculateProjectProgress = (projectId: string): number => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    if (projectTasks.length === 0) return 0;
    
    const completedTasks = projectTasks.filter(task => task.status === 'completed');
    return Math.round((completedTasks.length / projectTasks.length) * 100);
  };

  // Get task counts for a project
  const getProjectTaskCounts = (projectId: string) => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    return {
      total: projectTasks.length,
      completed: projectTasks.filter(task => task.status === 'completed').length,
      inProgress: projectTasks.filter(task => task.status === 'in-progress').length,
      todo: projectTasks.filter(task => task.status === 'todo').length,
    };
  };

  // Sync all project progress
  const syncAllProjectProgress = () => {
    projects.forEach(project => {
      const newProgress = calculateProjectProgress(project.id);
      const taskCounts = getProjectTaskCounts(project.id);
      
      if (project.progress !== newProgress || project.tasks !== taskCounts.total) {
        updateProject(project.id, {
          progress: newProgress,
          tasks: taskCounts.total,
        });
      }
    });
  };

  // Add task and update project progress
  const addTaskWithProjectSync = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedAt' | 'tags'>) => {
    // Parse tags from comma-separated string if provided
    const tags = typeof taskData.tags === 'string' 
      ? taskData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      : taskData.tags || [];

    const taskWithTags = { ...taskData, tags };
    
    // Create the task
    await createTask(taskWithTags);
    
    // Update project progress if task is associated with a project
    if (taskData.projectId) {
      setTimeout(() => {
        const newProgress = calculateProjectProgress(taskData.projectId!);
        const taskCounts = getProjectTaskCounts(taskData.projectId!);
        
        updateProject(taskData.projectId!, {
          progress: newProgress,
          tasks: taskCounts.total,
        });
        
        // Sync with calendar
        syncAllToCalendar();
      }, 100); // Small delay to ensure task is added first
    } else {
      // Sync with calendar even if no project
      setTimeout(() => {
        syncAllToCalendar();
      }, 100);
    }
  };

  // Update task and sync project progress
  const updateTaskWithProjectSync = async (id: string, updates: Partial<Task>) => {
    const currentTask = tasks.find(task => task.id === id);
    if (!currentTask) return;

    // Update the task
    await updateTask(id, updates);

    // Update project progress for both old and new project
    const projectsToUpdate = new Set<string>();
    
    if (currentTask.projectId) {
      projectsToUpdate.add(currentTask.projectId);
    }
    
    if (updates.projectId) {
      projectsToUpdate.add(updates.projectId);
    }

    // Update progress for all affected projects
    setTimeout(() => {
      projectsToUpdate.forEach(projectId => {
        const newProgress = calculateProjectProgress(projectId);
        const taskCounts = getProjectTaskCounts(projectId);
        
        updateProject(projectId, {
          progress: newProgress,
          tasks: taskCounts.total,
        });
      });
      
      // Sync with calendar
      syncAllToCalendar();
    }, 100);
  };

  // Toggle task status and update project progress
  const toggleTaskStatusWithProjectSync = async (id: string) => {
    const currentTask = tasks.find(task => task.id === id);
    if (!currentTask) return;

    // Determine new status based on current status
    let newStatus: 'todo' | 'in-progress' | 'completed';
    switch (currentTask.status) {
      case 'todo':
        newStatus = 'in-progress';
        break;
      case 'in-progress':
        newStatus = 'completed';
        break;
      case 'completed':
        newStatus = 'todo';
        break;
      default:
        newStatus = 'todo';
    }

    // Update the task status
    await updateTask(id, { 
      status: newStatus,
      completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
    });

    // Update project progress if task is associated with a project
    if (currentTask.projectId) {
      setTimeout(() => {
        const newProgress = calculateProjectProgress(currentTask.projectId!);
        const taskCounts = getProjectTaskCounts(currentTask.projectId!);
        
        updateProject(currentTask.projectId!, {
          progress: newProgress,
          tasks: taskCounts.total,
        });
        
        // Sync with calendar
        syncAllToCalendar();
      }, 100);
    } else {
      // Sync with calendar even if no project
      setTimeout(() => {
        syncAllToCalendar();
      }, 100);
    }
  };

  // Delete task and update project progress
  const deleteTaskWithProjectSync = async (id: string) => {
    const currentTask = tasks.find(task => task.id === id);
    if (!currentTask) return;

    // Delete the task
    await deleteTask(id);

    // Update project progress if task was associated with a project
    if (currentTask.projectId) {
      setTimeout(() => {
        const newProgress = calculateProjectProgress(currentTask.projectId!);
        const taskCounts = getProjectTaskCounts(currentTask.projectId!);
        
        updateProject(currentTask.projectId!, {
          progress: newProgress,
          tasks: taskCounts.total,
        });
        
        // Sync with calendar
        syncAllToCalendar();
      }, 100);
    } else {
      // Sync with calendar even if no project
      setTimeout(() => {
        syncAllToCalendar();
      }, 100);
    }
  };

  // Add project with task sync
  const addProjectWithTaskSync = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'members' | 'isStarred' | 'language'>) => {
    await createProject(projectData);
    
    // Sync with calendar
    setTimeout(() => {
      syncAllToCalendar();
    }, 100);
  };

  // Update project with task sync
  const updateProjectWithTaskSync = async (id: string, updates: Partial<Project>) => {
    await updateProject(id, updates);
    
    // Sync with calendar
    setTimeout(() => {
      syncAllToCalendar();
    }, 100);
  };

  // Delete project with task sync
  const deleteProjectWithTaskSync = async (id: string) => {
    // First, unlink all tasks from this project
    const projectTasks = tasks.filter(task => task.projectId === id);
    for (const task of projectTasks) {
      await updateTask(task.id, { projectId: undefined, projectName: undefined });
    }
    
    // Then delete the project
    await deleteProject(id);
    
    // Sync with calendar
    setTimeout(() => {
      syncAllToCalendar();
    }, 100);
  };

  const value: TaskProjectContextType = {
    addTaskWithProjectSync,
    updateTaskWithProjectSync,
    toggleTaskStatusWithProjectSync,
    deleteTaskWithProjectSync,
    addProjectWithTaskSync,
    updateProjectWithTaskSync,
    deleteProjectWithTaskSync,
    calculateProjectProgress,
    getProjectTaskCounts,
    syncAllProjectProgress,
  };

  return (
    <TaskProjectContext.Provider value={value}>
      {children}
    </TaskProjectContext.Provider>
  );
}

export function useTaskProject() {
  const context = useContext(TaskProjectContext);
  if (context === undefined) {
    throw new Error('useTaskProject must be used within a TaskProjectProvider');
  }
  return context;
}
