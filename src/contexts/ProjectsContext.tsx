'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'developer' | 'marketing';
  status: 'active' | 'planning' | 'on-hold' | 'completed';
  progress: number;
  startDate?: string;
  endDate?: string;
  createdAt: Date;
  updatedAt: Date;
  // Developer project fields
  repositoryLink?: string;
  techStack?: string;
  versionControl?: 'github' | 'gitlab' | 'bitbucket' | 'other';
  // Marketing project fields
  campaignGoal?: string;
  budget?: string;
  channels?: string;
  targetAudience?: string;
  // Metadata
  tasks: number;
  members: number;
  isStarred: boolean;
  language: string;
}

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'members' | 'isStarred' | 'language'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleStar: (id: string) => void;
  getProjectsByType: (type: Project['type']) => Project[];
  getProjectsByStatus: (status: Project['status']) => Project[];
  getStarredProjects: () => Project[];
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        // Convert date strings back to Date objects
        const projectsWithDates = parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }));
        setProjects(projectsWithDates);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    } else {
      // Initialize with some sample projects
      const sampleProjects: Project[] = [
        {
          id: '1',
          name: 'Task-Lab Development',
          description: 'Building the next-gen productivity platform with modern web technologies',
          type: 'developer',
          status: 'active',
          progress: 65,
          startDate: '2024-01-15',
          endDate: '2024-06-30',
          repositoryLink: 'https://github.com/username/productivity-hub',
          techStack: 'React, Next.js, TypeScript, Tailwind CSS',
          versionControl: 'github',
          tasks: 24,
          members: 5,
          isStarred: true,
          language: 'TypeScript',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        },
        {
          id: '2',
          name: 'Marketing Campaign Q4',
          description: 'Q4 marketing initiatives and content calendar for product launch',
          type: 'marketing',
          status: 'active',
          progress: 40,
          startDate: '2024-10-01',
          endDate: '2024-12-31',
          campaignGoal: 'Increase brand awareness by 50% and generate 1000 qualified leads',
          budget: '25000',
          channels: 'Social media, Email marketing, SEO, Paid ads',
          targetAudience: 'B2B SaaS companies, Developers, Product managers',
          tasks: 18,
          members: 3,
          isStarred: false,
          language: 'Campaign',
          createdAt: new Date('2024-10-01'),
          updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          id: '3',
          name: 'Mobile App Design',
          description: 'iOS and Android app design system and user interface development',
          type: 'developer',
          status: 'on-hold',
          progress: 25,
          startDate: '2024-02-01',
          endDate: '2024-08-31',
          repositoryLink: 'https://github.com/username/mobile-app',
          techStack: 'React Native, TypeScript, Expo',
          versionControl: 'github',
          tasks: 12,
          members: 4,
          isStarred: false,
          language: 'React Native',
          createdAt: new Date('2024-02-01'),
          updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        },
        {
          id: '4',
          name: 'Brand Identity Refresh',
          description: 'Complete brand identity overhaul including logo, colors, and guidelines',
          type: 'marketing',
          status: 'completed',
          progress: 100,
          startDate: '2024-08-01',
          endDate: '2024-09-30',
          campaignGoal: 'Establish new brand identity and guidelines',
          budget: '15000',
          channels: 'Design, Brand guidelines, Marketing materials',
          targetAudience: 'All stakeholders, Marketing team, Design team',
          tasks: 8,
          members: 2,
          isStarred: true,
          language: 'Design',
          createdAt: new Date('2024-08-01'),
          updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        },
        {
          id: '5',
          name: 'API Documentation Portal',
          description: 'Comprehensive API documentation and developer portal',
          type: 'developer',
          status: 'planning',
          progress: 10,
          startDate: '2024-12-01',
          endDate: '2025-02-28',
          repositoryLink: 'https://github.com/username/api-docs',
          techStack: 'Next.js, TypeScript, OpenAPI, Swagger',
          versionControl: 'github',
          tasks: 6,
          members: 3,
          isStarred: false,
          language: 'TypeScript',
          createdAt: new Date('2024-11-15'),
          updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        },
      ];
      setProjects(sampleProjects);
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'members' | 'isStarred' | 'language'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
      tasks: 0,
      members: 1,
      isStarred: false,
      language: projectData.type === 'developer' ? (projectData.techStack || 'Code') : 'Campaign',
    };

    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === id 
          ? { ...project, ...updates, updatedAt: new Date() }
          : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const toggleStar = (id: string) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === id 
          ? { ...project, isStarred: !project.isStarred, updatedAt: new Date() }
          : project
      )
    );
  };

  const getProjectsByType = (type: Project['type']) => {
    return projects.filter(project => project.type === type);
  };

  const getProjectsByStatus = (status: Project['status']) => {
    return projects.filter(project => project.status === status);
  };

  const getStarredProjects = () => {
    return projects.filter(project => project.isStarred);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        toggleStar,
        getProjectsByType,
        getProjectsByStatus,
        getStarredProjects,
      }}
    >
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
