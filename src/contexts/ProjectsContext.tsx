'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';
import { useAuth } from './AuthContext';

export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'developer' | 'marketing' | 'general';
  status: 'active' | 'planning' | 'on-hold' | 'completed' | 'archived';
  progress: number;
  startDate?: string;
  endDate?: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: number;
  members: number;
  isStarred: boolean;
  language: string;
}

interface ProjectsContextType {
  projects: Project[];
  isLoading: boolean;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'members' | 'isStarred' | 'language' | 'progress'>) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleStar: (id: string) => void;
  getProjectsByType: (type: Project['type']) => Project[];
  getProjectsByStatus: (status: Project['status']) => Project[];
  getStarredProjects: () => Project[];
  refreshProjects: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

function mapApiProject(p: any, starredIds: Set<string>): Project {
  const taskCount = p.task_count ?? p.taskCount ?? 0;
  const completedTasks = p.completed_tasks ?? p.completedTasks ?? 0;
  const progress = taskCount > 0 ? Math.round((completedTasks / taskCount) * 100) : 0;

  return {
    id: p.id,
    name: p.name,
    description: p.description || '',
    type: p.type,
    status: p.status,
    progress,
    startDate: p.start_date ?? p.startDate,
    endDate: p.end_date ?? p.endDate,
    createdAt: new Date(p.created_at ?? p.createdAt),
    updatedAt: new Date(p.updated_at ?? p.updatedAt),
    tasks: taskCount,
    members: 1,
    isStarred: starredIds.has(p.id),
    language: p.type === 'developer' ? 'TypeScript' : p.type === 'marketing' ? 'Campaign' : 'General',
  };
}

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // isStarred is a lightweight UI preference stored per-user in localStorage
  const starKey = user ? `starred_projects_${user.id}` : null;

  const getStarredIds = (): Set<string> => {
    if (!starKey) return new Set();
    try {
      return new Set(JSON.parse(localStorage.getItem(starKey) || '[]'));
    } catch {
      return new Set();
    }
  };

  const saveStarredIds = (ids: Set<string>) => {
    if (!starKey) return;
    localStorage.setItem(starKey, JSON.stringify([...ids]));
  };

  const loadProjects = async () => {
    if (!isAuthenticated) {
      setProjects([]);
      return;
    }
    setIsLoading(true);
    const response = await api.getProjects();
    if (response.data) {
      const starredIds = getStarredIds();
      setProjects(response.data.projects.map((p: any) => mapApiProject(p, starredIds)));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, [isAuthenticated]);

  // Clean up the old unscoped localStorage keys on first run
  useEffect(() => {
    localStorage.removeItem('projects');
  }, []);

  const addProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'members' | 'isStarred' | 'language' | 'progress'>) => {
    await api.createProject(projectData);
    await loadProjects();
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p)
    );
    // Persist non-UI fields to API (progress and tasks are computed, skip them)
    const { progress, tasks, members, isStarred, language, createdAt, updatedAt, ...apiUpdates } = updates as any;
    if (Object.keys(apiUpdates).length > 0) {
      api.updateProject(id, apiUpdates);
    }
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    api.deleteProject(id);
  };

  const toggleStar = (id: string) => {
    const starredIds = getStarredIds();
    if (starredIds.has(id)) {
      starredIds.delete(id);
    } else {
      starredIds.add(id);
    }
    saveStarredIds(starredIds);
    setProjects(prev =>
      prev.map(p => p.id === id ? { ...p, isStarred: starredIds.has(id) } : p)
    );
  };

  const getProjectsByType = (type: Project['type']) => projects.filter(p => p.type === type);
  const getProjectsByStatus = (status: Project['status']) => projects.filter(p => p.status === status);
  const getStarredProjects = () => projects.filter(p => p.isStarred);

  return (
    <ProjectsContext.Provider value={{
      projects,
      isLoading,
      addProject,
      updateProject,
      deleteProject,
      toggleStar,
      getProjectsByType,
      getProjectsByStatus,
      getStarredProjects,
      refreshProjects: loadProjects,
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}
