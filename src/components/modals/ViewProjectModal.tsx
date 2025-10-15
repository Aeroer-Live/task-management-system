'use client';

import { Project } from '@/types';
import { useTasks } from '@/contexts/TasksContext';

interface ViewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ViewProjectModal({ isOpen, onClose, project }: ViewProjectModalProps) {
  const { tasks } = useTasks();

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (date: string | Date) => {
    if (!date) return 'Not set';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success-fg)';
      case 'in-progress':
        return 'var(--color-accent-fg)';
      case 'planning':
        return 'var(--color-fg-muted)';
      case 'on-hold':
        return '#f59e0b';
      default:
        return 'var(--color-fg-default)';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'var(--color-danger-fg)';
      case 'high':
        return '#f59e0b';
      case 'medium':
        return 'var(--color-accent-fg)';
      case 'low':
        return 'var(--color-fg-muted)';
      default:
        return 'var(--color-fg-default)';
    }
  };

  // Get tasks associated with this project
  const projectTasks = tasks.filter(task => task.projectId === project?.id);
  const completedTasks = projectTasks.filter(task => task.status === 'completed');
  const inProgressTasks = projectTasks.filter(task => task.status === 'in-progress');
  const todoTasks = projectTasks.filter(task => task.status === 'todo');

  // Calculate progress percentage
  const progressPercentage = projectTasks.length > 0 
    ? Math.round((completedTasks.length / projectTasks.length) * 100) 
    : 0;

  // Get overdue tasks
  const overdueTasks = projectTasks.filter(task => {
    if (!task.dueDate || task.status === 'completed') return false;
    return new Date(task.dueDate) < new Date();
  });

  // Get tasks due today
  const todayTasks = projectTasks.filter(task => {
    if (!task.dueDate || task.status === 'completed') return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate.toDateString() === today.toDateString();
  });

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          background: 'var(--color-canvas-default)',
          border: '1px solid var(--color-border-default)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--color-border-default)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent-subtle)' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
                <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                {project.name || 'Untitled Project'}
              </h2>
              {project.isStarred && (
                <div className="flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: '#fbbf24' }}>
                    <path d="M7.188 10.595a.75.75 0 00-1.376 0l-1.5 3.5a.75.75 0 01-1.312-.5l.5-2.5-2-1.5a.75.75 0 01.5-1.312l2.5-.5 1.5-2a.75.75 0 011.312 0l1.5 2 2.5.5a.75.75 0 01.5 1.312l-2 1.5.5 2.5a.75.75 0 01-1.312.5l-1.5-3.5z"/>
                  </svg>
                  <span className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>Starred</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-opacity-50 rounded-md transition-colors"
            style={{ color: 'var(--color-fg-muted)' }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                Status:
              </span>
              <span
                className="px-2 py-1 rounded-md text-xs font-medium"
                style={{
                  background: 'var(--color-canvas-subtle)',
                  color: getStatusColor(project.status || 'planning'),
                  border: `1px solid ${getStatusColor(project.status || 'planning')}`
                }}
              >
                {(project.status || 'planning').replace('-', ' ').toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                Priority:
              </span>
              <span
                className="px-2 py-1 rounded-md text-xs font-medium"
                style={{
                  background: 'var(--color-canvas-subtle)',
                  color: getPriorityColor(project.priority || 'medium'),
                  border: `1px solid ${getPriorityColor(project.priority || 'medium')}`
                }}
              >
                {(project.priority || 'medium').toUpperCase()}
              </span>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Description
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-fg-default)' }}>
                {project.description}
              </p>
            </div>
          )}

          {/* Progress Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
              Progress Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg" style={{ background: 'var(--color-canvas-subtle)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--color-success-fg)' }}>
                  {completedTasks.length}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                  Completed Tasks
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ background: 'var(--color-canvas-subtle)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--color-accent-fg)' }}>
                  {inProgressTasks.length}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                  In Progress
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ background: 'var(--color-canvas-subtle)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--color-fg-muted)' }}>
                  {todoTasks.length}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                  To Do
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--color-fg-muted)' }}>Overall Progress</span>
                <span style={{ color: 'var(--color-fg-default)' }}>{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2" style={{ background: 'var(--color-border-default)' }}>
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    background: progressPercentage === 100 ? 'var(--color-success-fg)' : 'var(--color-accent-fg)',
                    width: `${progressPercentage}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Task Statistics */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
              Task Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg" style={{ background: 'var(--color-canvas-subtle)' }}>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-danger-fg)' }}>
                    <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
                  </svg>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                    Overdue Tasks: {overdueTasks.length}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-lg" style={{ background: 'var(--color-canvas-subtle)' }}>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: '#f59e0b' }}>
                    <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0z"/>
                  </svg>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                    Due Today: {todayTasks.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Tasks List */}
          {projectTasks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                Project Tasks ({projectTasks.length})
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {projectTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: 'var(--color-canvas-subtle)' }}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        readOnly
                        className="w-4 h-4 rounded border-2"
                        style={{
                          accentColor: 'var(--color-accent-emphasis)',
                          borderColor: 'var(--color-border-default)'
                        }}
                      />
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                          {task.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span
                            className="px-1.5 py-0.5 rounded text-xs"
                            style={{
                              background: task.status === 'completed' ? 'var(--color-success-subtle)' : 
                                         task.status === 'in-progress' ? 'var(--color-accent-subtle)' : 
                                         'var(--color-canvas-default)',
                              color: task.status === 'completed' ? 'var(--color-success-fg)' : 
                                     task.status === 'in-progress' ? 'var(--color-accent-fg)' : 
                                     'var(--color-fg-muted)',
                              border: `1px solid ${task.status === 'completed' ? 'var(--color-success-emphasis)' : 
                                               task.status === 'in-progress' ? 'var(--color-accent-emphasis)' : 
                                               'var(--color-border-default)'}`
                            }}
                          >
                            {task.status.replace('-', ' ')}
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded text-xs"
                            style={{
                              background: task.priority === 'urgent' ? 'var(--color-danger-subtle)' :
                                         task.priority === 'high' ? 'rgba(245, 158, 11, 0.1)' :
                                         task.priority === 'medium' ? 'var(--color-accent-subtle)' :
                                         'var(--color-canvas-default)',
                              color: task.priority === 'urgent' ? 'var(--color-danger-fg)' :
                                     task.priority === 'high' ? '#f59e0b' :
                                     task.priority === 'medium' ? 'var(--color-accent-fg)' :
                                     'var(--color-fg-muted)',
                              border: `1px solid ${task.priority === 'urgent' ? 'var(--color-danger-emphasis)' :
                                               task.priority === 'high' ? '#f59e0b' :
                                               task.priority === 'medium' ? 'var(--color-accent-emphasis)' :
                                               'var(--color-border-default)'}`
                            }}
                          >
                            {task.priority}
                          </span>
                          {task.dueDate && (
                            <span className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: 'var(--color-border-default)' }}>
            <div>
              <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                Created:
              </span>
              <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                {formatDate(project.createdAt)}
              </span>
            </div>
            <div>
              <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                Last Updated:
              </span>
              <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                {formatDate(project.updatedAt)}
              </span>
            </div>
            {project.startDate && (
              <div>
                <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                  Start Date:
                </span>
                <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                  {formatDate(project.startDate)}
                </span>
              </div>
            )}
            {project.endDate && (
              <div>
                <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                  End Date:
                </span>
                <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                  {formatDate(project.endDate)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t" style={{ borderColor: 'var(--color-border-default)' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md transition-colors"
            style={{
              background: 'var(--color-canvas-subtle)',
              color: 'var(--color-fg-default)',
              border: '1px solid var(--color-border-default)'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
