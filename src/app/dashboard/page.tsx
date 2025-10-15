'use client';

import { useState, useMemo } from 'react';
import NewTaskModal from '@/components/modals/NewTaskModal';
import NewProjectModal from '@/components/modals/NewProjectModal';
import { useTasks } from '@/contexts/TasksContext';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const { tasks, projects, isLoading, error } = useTasks();
  const { user, isAuthenticated } = useAuth();

  // Calculate dashboard statistics
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    
    // Calculate overdue and due tasks
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const overdueTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate) < today).length;
    const tasksDueToday = tasks.filter(t => {
      if (!t.dueDate) return false;
      const dueDate = new Date(t.dueDate);
      return dueDate >= today && dueDate < tomorrow;
    }).length;
    const tasksDueThisWeek = tasks.filter(t => {
      if (!t.dueDate) return false;
      const dueDate = new Date(t.dueDate);
      return dueDate >= today && dueDate < nextWeek;
    }).length;
    
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      totalTasks,
      completedTasks,
      activeProjects,
      overdueTasks,
      tasksDueToday,
      tasksDueThisWeek,
      completionRate,
      totalProjects: projects.length
    };
  }, [tasks, projects]);

  // Get recent tasks (last 5)
  const recentTasks = useMemo(() => {
    return tasks
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        return dateB - dateA; // Sort by newest first
      })
      .slice(0, 5);
  }, [tasks]);

  const formatTimeAgo = (date: Date | string | undefined) => {
    if (!date) return 'Unknown';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  };

  const isOverdue = (dueDate: string) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return new Date(dueDate) < today;
  };

  const isDueToday = (dueDate: string) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    const due = new Date(dueDate);
    return due >= startOfDay && due <= endOfDay;
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
          <p className="text-red-600">Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NewTaskModal 
        isOpen={isNewTaskModalOpen} 
        onClose={() => setIsNewTaskModalOpen(false)} 
      />
      <NewProjectModal 
        isOpen={isNewProjectModalOpen} 
        onClose={() => setIsNewProjectModalOpen(false)} 
      />
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-fg-default)' }}>
          Dashboard
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>
          Welcome back! Here&apos;s your productivity overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-fg-muted)' }}>
                Total Tasks
              </p>
              <p className="text-2xl font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                {stats.totalTasks}
              </p>
            </div>
            <svg className="w-5 h-5 mt-1" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
              <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              <path d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0z"/>
            </svg>
          </div>
          <p className="text-xs" style={{ color: stats.completedTasks > 0 ? 'var(--color-success-fg)' : 'var(--color-fg-muted)' }}>
            {stats.completedTasks} completed
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-fg-muted)' }}>
                Active Projects
              </p>
              <p className="text-2xl font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                {stats.activeProjects}
              </p>
            </div>
            <svg className="w-5 h-5 mt-1" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
              <path d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75z"/>
            </svg>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
            {stats.totalProjects} total projects
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-fg-muted)' }}>
                Due Today
              </p>
              <p className="text-2xl font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                {stats.tasksDueToday}
              </p>
            </div>
            <svg className="w-5 h-5 mt-1" fill="currentColor" viewBox="0 0 16 16" style={{ color: stats.tasksDueToday > 0 ? '#f59e0b' : 'var(--color-fg-muted)' }}>
              <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0z"/>
            </svg>
          </div>
          <p className="text-xs" style={{ color: stats.overdueTasks > 0 ? 'var(--color-danger-fg)' : 'var(--color-fg-muted)' }}>
            {stats.overdueTasks} overdue
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-fg-muted)' }}>
                Completion Rate
              </p>
              <p className="text-2xl font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                {stats.completionRate}%
              </p>
            </div>
            <svg className="w-5 h-5 mt-1" fill="currentColor" viewBox="0 0 16 16" style={{ color: stats.completionRate >= 80 ? 'var(--color-success-fg)' : stats.completionRate >= 60 ? '#f59e0b' : 'var(--color-danger-fg)' }}>
              <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"/>
            </svg>
          </div>
          <p className="text-xs" style={{ color: stats.completionRate >= 80 ? 'var(--color-success-fg)' : 'var(--color-fg-muted)' }}>
            {stats.completedTasks} of {stats.totalTasks} tasks
          </p>
        </div>
      </div>

      {/* Recent Activity & Upcoming Tasks */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        {/* Recent Tasks */}
        <div className="card p-4">
          <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
            Recent activity
          </h2>
          <div className="space-y-2">
            {recentTasks.length === 0 ? (
              <div className="text-center py-4">
                <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-fg-muted)' }}>
                  <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                  <path d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0z"/>
                </svg>
                <p className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>
                  No tasks yet
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                  Create your first task to get started
                </p>
              </div>
            ) : (
              recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 rounded-md hover:bg-opacity-50 transition-colors" style={{ background: 'var(--color-canvas-subtle)' }}>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <svg 
                      className="w-4 h-4 flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 16 16"
                      style={{ 
                        color: task.status === 'completed' 
                          ? 'var(--color-success-fg)' 
                          : task.status === 'in-progress' 
                          ? 'var(--color-accent-fg)' 
                          : 'var(--color-fg-muted)' 
                      }}
                    >
                      {task.status === 'completed' ? (
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                      ) : (
                        <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0z"/>
                      )}
                    </svg>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm truncate block" style={{ color: 'var(--color-fg-default)' }}>
                        {task.title}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                        {formatTimeAgo(task.updatedAt)}
                      </span>
                    </div>
                  </div>
                  <span className="badge text-xs ml-2" style={{
                    color: task.priority === 'urgent' || task.priority === 'high' ? 'var(--color-danger-fg)' : 'var(--color-fg-muted)',
                    background: task.priority === 'urgent' || task.priority === 'high' ? 'rgba(207, 34, 46, 0.1)' : 'rgba(208, 215, 222, 0.2)'
                  }}>
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="card p-4">
          <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
            Recent Projects
          </h2>
          <div className="space-y-2">
            {projects.length === 0 ? (
              <div className="text-center py-4">
                <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-fg-muted)' }}>
                  <path d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75z"/>
                </svg>
                <p className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>
                  No projects yet
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                  Create your first project to get started
                </p>
              </div>
            ) : (
              projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-2 rounded-md hover:bg-opacity-50 transition-colors" style={{ background: 'var(--color-canvas-subtle)' }}>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ 
                        background: project.type === 'developer' ? '#3B82F6' : 
                                   project.type === 'marketing' ? '#10B981' : '#8B5CF6'
                      }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--color-fg-default)' }}>
                        {project.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-fg-muted)' }}>
                        {project.taskCount} tasks • {project.completedTasks} completed
                      </p>
                    </div>
                  </div>
                  <span className="badge text-xs ml-2" style={{ 
                    color: project.status === 'active' ? 'var(--color-success-fg)' : 'var(--color-fg-muted)',
                    background: project.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(208, 215, 222, 0.2)'
                  }}>
                    {project.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>


      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
          Quick actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button 
            onClick={() => setIsNewTaskModalOpen(true)}
            className="card p-4 text-center hover:shadow-md transition-all cursor-pointer"
          >
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
              <path d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 010 1.5H8.5v4.25a.75.75 0 01-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"/>
            </svg>
            <p className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>New Task</p>
          </button>
          <button 
            onClick={() => setIsNewProjectModalOpen(true)}
            className="card p-4 text-center hover:shadow-md transition-all cursor-pointer"
          >
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
              <path d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75z"/>
            </svg>
            <p className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>New Project</p>
          </button>
          <button 
            onClick={() => window.location.href = '/dashboard/calendar'}
            className="card p-4 text-center hover:shadow-md transition-all cursor-pointer"
          >
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
              <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0z"/>
            </svg>
            <p className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>View Calendar</p>
          </button>
          <button 
            onClick={() => window.location.href = '/dashboard/time-tracking'}
            className="card p-4 text-center hover:shadow-md transition-all cursor-pointer"
          >
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
              <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
            </svg>
            <p className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>Time Tracking</p>
          </button>
        </div>
      </div>


    </div>
    </>
  );
}

