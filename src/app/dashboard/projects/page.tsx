'use client';

import { useState, useMemo } from 'react';
import NewProjectModal from '@/components/modals/NewProjectModal';
import EditProjectModal from '@/components/modals/EditProjectModal';
import ViewProjectModal from '@/components/modals/ViewProjectModal';
import { useTasks } from '@/contexts/TasksContext';
import type { Project } from '@/types';

type ProjectStatus = 'all' | Project['status'];
type ProjectType = 'all' | Project['type'];

export default function ProjectsPage() {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [isViewProjectModalOpen, setIsViewProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>('all');
  const [typeFilter, setTypeFilter] = useState<ProjectType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'updatedAt' | 'progress' | 'createdAt'>('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { projects, isLoading, error } = useTasks();
  
  // For now, we'll implement basic project management
  // In a full implementation, these would be API calls
  const toggleStar = (id: string) => {
    console.log('Toggle star for project:', id);
    // TODO: Implement API call
  };
  
  const deleteProjectWithTaskSync = (id: string) => {
    console.log('Delete project:', id);
    // TODO: Implement API call
  };
  
  const updateProjectWithTaskSync = (id: string, updates: Partial<Project>) => {
    console.log('Update project:', id, updates);
    // TODO: Implement API call
  };

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.techStack?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.campaignGoal?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort projects
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'updatedAt':
          aValue = new Date(a.updatedAt).getTime();
          bValue = new Date(b.updatedAt).getTime();
          break;
        case 'progress':
          aValue = a.progress;
          bValue = b.progress;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [projects, statusFilter, typeFilter, searchTerm, sortBy, sortOrder]);

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      deleteProjectWithTaskSync(id);
    }
  };

  const handleStatusChange = (id: string, newStatus: Project['status']) => {
    updateProjectWithTaskSync(id, { status: newStatus });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditProjectModalOpen(true);
  };

  const handleViewProject = (project: Project) => {
    setViewingProject(project);
    setIsViewProjectModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleCloseViewModal = () => {
    setIsViewProjectModalOpen(false);
    setViewingProject(null);
  };

  const formatTimeAgo = (date: Date | string | undefined) => {
    if (!date) return 'Unknown';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading projects: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NewProjectModal 
        isOpen={isNewProjectModalOpen} 
        onClose={() => setIsNewProjectModalOpen(false)} 
      />
      <EditProjectModal 
        isOpen={isEditProjectModalOpen} 
        onClose={handleCloseEditModal}
        project={editingProject}
      />
      
      <ViewProjectModal 
        isOpen={isViewProjectModalOpen} 
        onClose={handleCloseViewModal}
        project={viewingProject}
      />
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-fg-default)' }}>
              Projects
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>
              Manage your developer and marketing projects
            </p>
          </div>
          <button 
            onClick={() => setIsNewProjectModalOpen(true)}
            className="btn-primary"
          >
            New project
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-fg-muted)' }}>
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap lg:flex-nowrap">
            <select
              className="filter-dropdown"
              style={{ minWidth: '120px' }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ProjectType)}
            >
              <option value="all">All Types</option>
              <option value="developer">Developer</option>
              <option value="marketing">Marketing</option>
            </select>

            <select
              className="filter-dropdown"
              style={{ minWidth: '160px' }}
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as typeof sortBy);
                setSortOrder(order as typeof sortOrder);
              }}
            >
              <option value="updatedAt-desc">Recently Updated</option>
              <option value="createdAt-desc">Recently Created</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="progress-desc">Progress High-Low</option>
              <option value="progress-asc">Progress Low-High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Tabs - GitHub Style */}
      <div className="mb-4">
        <div className="flex gap-2" style={{ borderBottom: '1px solid var(--color-border-default)' }}>
          {[
            { 
              key: 'all', 
              label: 'All', 
              count: projects.length,
              color: 'var(--color-fg-muted)',
              activeColor: 'var(--color-fg-default)',
              borderColor: 'var(--color-accent-emphasis)',
              badgeColor: 'var(--color-fg-muted)',
              badgeBg: 'var(--color-canvas-subtle)'
            },
            { 
              key: 'active', 
              label: 'Active', 
              count: projects.filter(p => p.status === 'active').length,
              color: 'var(--color-success-fg)',
              activeColor: 'var(--color-success-fg)',
              borderColor: 'var(--color-success-fg)',
              badgeColor: 'var(--color-success-fg)',
              badgeBg: 'rgba(26, 127, 55, 0.1)'
            },
            { 
              key: 'planning', 
              label: 'Planning', 
              count: projects.filter(p => p.status === 'planning').length,
              color: 'var(--color-accent-fg)',
              activeColor: 'var(--color-accent-fg)',
              borderColor: 'var(--color-accent-fg)',
              badgeColor: 'var(--color-accent-fg)',
              badgeBg: 'rgba(31, 111, 235, 0.1)'
            },
            { 
              key: 'on-hold', 
              label: 'On Hold', 
              count: projects.filter(p => p.status === 'on-hold').length,
              color: '#f59e0b',
              activeColor: '#f59e0b',
              borderColor: '#f59e0b',
              badgeColor: '#f59e0b',
              badgeBg: 'rgba(245, 158, 11, 0.1)'
            },
            { 
              key: 'completed', 
              label: 'Completed', 
              count: projects.filter(p => p.status === 'completed').length,
              color: 'var(--color-fg-muted)',
              activeColor: 'var(--color-fg-muted)',
              borderColor: 'var(--color-fg-muted)',
              badgeColor: 'var(--color-fg-muted)',
              badgeBg: 'rgba(208, 215, 222, 0.2)'
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key as ProjectStatus)}
              className="px-4 py-2 text-sm font-medium transition-colors relative"
              style={{
                color: statusFilter === tab.key ? tab.activeColor : tab.color,
                borderBottom: statusFilter === tab.key ? `2px solid ${tab.borderColor}` : '2px solid transparent',
                marginBottom: '-1px'
              }}
            >
              {tab.label}
              <span 
                className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
                style={{ 
                  background: statusFilter === tab.key ? tab.badgeBg : 'var(--color-canvas-subtle)',
                  color: statusFilter === tab.key ? tab.badgeColor : 'var(--color-fg-muted)'
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4 text-sm" style={{ color: 'var(--color-fg-muted)' }}>
        Showing {filteredAndSortedProjects.length} of {projects.length} projects
        {(typeFilter !== 'all' || searchTerm) && (
          <span className="ml-2">
            (filtered)
          </span>
        )}
      </div>


      {/* Project List - GitHub Repository Style */}
      <div className="space-y-4">
        {filteredAndSortedProjects.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-fg-muted)' }}>
              <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75z"/>
            </svg>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-fg-default)' }}>
              No projects found
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-fg-muted)' }}>
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' 
                ? 'Try adjusting your filters or search terms.'
                : 'Get started by creating your first project.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && typeFilter === 'all' && (
              <button 
                onClick={() => setIsNewProjectModalOpen(true)}
                className="btn-primary"
              >
                Create your first project
              </button>
            )}
          </div>
        ) : (
          filteredAndSortedProjects.map((project) => (
            <div 
              key={project.id} 
              className="card p-4 hover:shadow-md transition-all"
            >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                {/* Project Icon */}
                <div 
                  className="w-10 h-10 rounded-md flex items-center justify-center text-lg flex-shrink-0"
                  style={{ 
                    background: project.type === 'developer' 
                      ? 'rgba(31, 111, 235, 0.1)' 
                      : 'rgba(163, 113, 247, 0.1)'
                  }}
                >
                  {project.type === 'developer' ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
                      <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: '#a371f7' }}>
                      <path d="M1.75 1.5a.25.25 0 00-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h6.5a.25.25 0 00.25-.25v-9.5a.25.25 0 00-.25-.25H1.75zM0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0114.25 13H8.06l-2.573 2.573A1.457 1.457 0 013 14.543V13H1.75A1.75 1.75 0 010 11.25v-9.5z"/>
                    </svg>
                  )}
                </div>

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold" style={{ color: 'var(--color-accent-fg)' }}>
                      {project.name}
                    </h3>
                    <span 
                      className="badge text-xs"
                      style={{
                        color: project.status === 'active' ? 'var(--color-success-fg)' : 'var(--color-fg-muted)',
                        background: project.status === 'active' ? 'rgba(26, 127, 55, 0.1)' : 'rgba(208, 215, 222, 0.2)',
                        textTransform: 'capitalize'
                      }}
                    >
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>

                  <p className="text-sm mb-3" style={{ color: 'var(--color-fg-muted)' }}>
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                        Progress
                      </span>
                      <span className="text-xs font-medium" style={{ color: 'var(--color-fg-default)' }}>
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full rounded-full h-1.5" style={{ background: 'var(--color-canvas-subtle)' }}>
                      <div 
                        className="h-1.5 rounded-full transition-all"
                        style={{ 
                          width: `${project.progress}%`,
                          background: 'linear-gradient(90deg, var(--color-accent-fg) 0%, var(--color-success-fg) 100%)'
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                    {/* Language/Type */}
                    <span className="flex items-center gap-1.5">
                      <span 
                        className="w-3 h-3 rounded-full"
                        style={{ 
                          background: project.type === 'developer' ? '#3178c6' : '#f1e05a' 
                        }}
                      ></span>
                      {project.language}
                    </span>

                    {/* Tasks */}
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                        <path d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0z"/>
                      </svg>
                      {project.tasks} tasks
                    </span>

                    {/* Members */}
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"/>
                      </svg>
                      {project.members} members
                    </span>

                    {/* Last updated */}
                    <span className="flex items-center gap-1">
                      Updated {formatTimeAgo(project.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {/* Star Button */}
                <button 
                  onClick={() => toggleStar(project.id)}
                  className="p-1.5 rounded hover:bg-opacity-10 transition-colors"
                  style={{ color: project.isStarred ? '#f59e0b' : 'var(--color-fg-muted)' }}
                  title={project.isStarred ? 'Unstar project' : 'Star project'}
                >
                  <svg className="w-4 h-4" fill={project.isStarred ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 16 16">
                    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                  </svg>
                </button>

                {/* Status Dropdown */}
                <select
                  value={project.status}
                  onChange={(e) => handleStatusChange(project.id, e.target.value as Project['status'])}
                  className="text-xs px-2 py-1 rounded border-0"
                  style={{ 
                    background: 'var(--color-canvas-subtle)',
                    color: 'var(--color-fg-default)',
                    border: '1px solid var(--color-border-default)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                </select>

                {/* View Button */}
                <button 
                  onClick={() => handleViewProject(project)}
                  className="p-1.5 rounded hover:bg-opacity-10 transition-colors"
                  style={{ color: 'var(--color-accent-fg)' }}
                  title="View project details"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 2.5c-3.5 0-6.5 2.5-6.5 5.5s3 5.5 6.5 5.5 6.5-2.5 6.5-5.5-3-5.5-6.5-5.5zM8 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z"/>
                  </svg>
                </button>

                {/* Edit Button */}
                <button 
                  onClick={() => handleEditProject(project)}
                  className="p-1.5 rounded hover:bg-opacity-10 transition-colors"
                  style={{ color: 'var(--color-fg-muted)' }}
                  title="Edit project"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"/>
                  </svg>
                </button>

                {/* Delete Button */}
                <button 
                  onClick={() => handleDeleteProject(project.id)}
                  className="p-1.5 rounded hover:bg-opacity-10 transition-colors"
                  style={{ color: 'var(--color-danger-fg)' }}
                  title="Delete project"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>

      {/* Project Type Info */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="card p-4" style={{ background: 'rgba(31, 111, 235, 0.05)' }}>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
              <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75z"/>
            </svg>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
              Developer Projects
            </h3>
          </div>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--color-fg-muted)' }}>
            <li>✓ Task boards & Kanban views</li>
            <li>✓ GitHub/GitLab integration</li>
            <li>✓ Code references & documentation</li>
            <li>✓ Issue tracking & PR management</li>
          </ul>
        </div>

        <div className="card p-4" style={{ background: 'rgba(163, 113, 247, 0.05)' }}>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: '#a371f7' }}>
              <path d="M1.75 1.5a.25.25 0 00-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h6.5a.25.25 0 00.25-.25v-9.5a.25.25 0 00-.25-.25H1.75z"/>
            </svg>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
              Marketing Projects
            </h3>
          </div>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--color-fg-muted)' }}>
            <li>✓ Campaign tracking & analytics</li>
            <li>✓ Content calendar management</li>
            <li>✓ Resource & budget allocation</li>
            <li>✓ Multi-channel performance</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
