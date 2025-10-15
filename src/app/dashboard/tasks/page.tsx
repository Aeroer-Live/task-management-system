'use client';

import { useState, useMemo } from 'react';
import NewTaskModal from '@/components/modals/NewTaskModal';
import EditTaskModal from '@/components/modals/EditTaskModal';
import ViewTaskModal from '@/components/modals/ViewTaskModal';
import { useTasks } from '@/contexts/TasksContext';
import { useTaskProject } from '@/contexts/TaskProjectContext';
import { useProjects } from '@/contexts/ProjectsContext';
import type { Task } from '@/types';

type TaskStatus = 'all' | Task['status'];
type TaskPriority = 'all' | Task['priority'];
type TaskType = 'all' | Task['taskType'];

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<TaskStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority>('all');
  const [typeFilter, setTypeFilter] = useState<TaskType>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'dueDate' | 'priority' | 'createdAt' | 'updatedAt'>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);

  const { tasks, getOverdueTasks, getTasksDueToday, getTasksDueThisWeek } = useTasks();
  const { updateTaskWithProjectSync, deleteTaskWithProjectSync, toggleTaskStatusWithProjectSync } = useTaskProject();
  const { projects } = useProjects();

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(t => t.priority === priorityFilter);
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(t => t.taskType === typeFilter);
    }

    // Filter by project
    if (projectFilter !== 'all') {
      filtered = filtered.filter(t => t.projectId === projectFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.tags && t.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        (t.projectName && t.projectName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue: string | number, bValue: string | number;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'dueDate':
          aValue = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
          bValue = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
          break;
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'updatedAt':
          aValue = new Date(a.updatedAt).getTime();
          bValue = new Date(b.updatedAt).getTime();
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
  }, [tasks, statusFilter, priorityFilter, typeFilter, projectFilter, searchTerm, sortBy, sortOrder]);

  const handleDeleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      deleteTaskWithProjectSync(id);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditTaskModalOpen(true);
  };

  const handleViewTask = (task: Task) => {
    setViewingTask(task);
    setIsViewTaskModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleCloseViewModal = () => {
    setIsViewTaskModalOpen(false);
    setViewingTask(null);
  };

  const handleStatusChange = (id: string, newStatus: Task['status']) => {
    updateTaskWithProjectSync(id, { status: newStatus });
  };

  const handlePriorityChange = (id: string, newPriority: Task['priority']) => {
    updateTaskWithProjectSync(id, { priority: newPriority });
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

  const isOverdue = (dueDate: string | undefined) => {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return new Date(dueDate) < today;
  };

  const isDueToday = (dueDate: string | undefined) => {
    if (!dueDate) return false;
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    const due = new Date(dueDate);
    return due >= startOfDay && due <= endOfDay;
  };

  return (
    <>
      <NewTaskModal 
        isOpen={isNewTaskModalOpen} 
        onClose={() => setIsNewTaskModalOpen(false)} 
      />
      <EditTaskModal 
        isOpen={isEditTaskModalOpen} 
        onClose={handleCloseEditModal}
        task={editingTask}
      />
      
      <ViewTaskModal 
        isOpen={isViewTaskModalOpen} 
        onClose={handleCloseViewModal}
        task={viewingTask}
      />
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-fg-default)' }}>
            Tasks
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>
          Manage and organize your tasks
        </p>
      </div>
      <button 
        onClick={() => setIsNewTaskModalOpen(true)}
        className="btn-primary"
      >
        New task
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
                placeholder="Search tasks..."
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
              style={{ minWidth: '130px' }}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as TaskPriority)}
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              className="filter-dropdown"
              style={{ minWidth: '120px' }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TaskType)}
            >
              <option value="all">All Types</option>
              <option value="regular">Regular</option>
              <option value="development">Development</option>
              <option value="financial">Financial</option>
              <option value="meeting">Meeting</option>
            </select>

            <select
              className="filter-dropdown"
              style={{ minWidth: '140px' }}
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
            >
              <option value="all">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
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
              <option value="dueDate-asc">Due Date (Earliest)</option>
              <option value="dueDate-desc">Due Date (Latest)</option>
              <option value="priority-desc">Priority (High-Low)</option>
              <option value="priority-asc">Priority (Low-High)</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="updatedAt-desc">Recently Updated</option>
              <option value="createdAt-desc">Recently Created</option>
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
              count: tasks.length,
              color: 'var(--color-fg-muted)',
              activeColor: 'var(--color-fg-default)',
              borderColor: 'var(--color-accent-emphasis)',
              badgeColor: 'var(--color-fg-muted)',
              badgeBg: 'var(--color-canvas-subtle)'
            },
            { 
              key: 'todo', 
              label: 'Open', 
              count: tasks.filter(t => t.status === 'todo').length,
              color: 'var(--color-accent-fg)',
              activeColor: 'var(--color-accent-fg)',
              borderColor: 'var(--color-accent-fg)',
              badgeColor: 'var(--color-accent-fg)',
              badgeBg: 'rgba(31, 111, 235, 0.1)'
            },
            { 
              key: 'in-progress', 
              label: 'In Progress', 
              count: tasks.filter(t => t.status === 'in-progress').length,
              color: '#f59e0b',
              activeColor: '#f59e0b',
              borderColor: '#f59e0b',
              badgeColor: '#f59e0b',
              badgeBg: 'rgba(245, 158, 11, 0.1)'
            },
            { 
              key: 'completed', 
              label: 'Completed', 
              count: tasks.filter(t => t.status === 'completed').length,
              color: 'var(--color-success-fg)',
              activeColor: 'var(--color-success-fg)',
              borderColor: 'var(--color-success-fg)',
              badgeColor: 'var(--color-success-fg)',
              badgeBg: 'rgba(26, 127, 55, 0.1)'
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key as TaskStatus)}
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
        Showing {filteredAndSortedTasks.length} of {tasks.length} tasks
        {(priorityFilter !== 'all' || typeFilter !== 'all' || projectFilter !== 'all' || searchTerm) && (
          <span className="ml-2">
            (filtered)
          </span>
        )}
      </div>

      {/* Task List */}
      <div className="space-y-0" style={{ border: '1px solid var(--color-border-default)', borderRadius: '6px' }}>
        {filteredAndSortedTasks.length === 0 ? (
          <div className="p-8 text-center" style={{ background: 'var(--color-canvas-default)' }}>
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-fg-muted)' }}>
              <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              <path d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0z"/>
            </svg>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-fg-default)' }}>
              No tasks found
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-fg-muted)' }}>
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || typeFilter !== 'all' || projectFilter !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'Get started by creating your first task.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && priorityFilter === 'all' && typeFilter === 'all' && projectFilter === 'all' && (
              <button 
                onClick={() => setIsNewTaskModalOpen(true)}
                className="btn-primary"
              >
                Create your first task
              </button>
            )}
          </div>
        ) : (
          filteredAndSortedTasks.map((task, index) => (
            <div 
              key={task.id} 
              className="flex items-start gap-3 p-4 hover:bg-opacity-50 transition-colors"
              style={{ 
                background: 'var(--color-canvas-default)',
                borderTop: index === 0 ? 'none' : '1px solid var(--color-border-default)'
              }}
            >
              {/* Checkbox */}
              <input 
                type="checkbox" 
                checked={task.status === 'completed'}
                className="mt-1 w-4 h-4 rounded cursor-pointer"
                style={{ 
                  accentColor: 'var(--color-success-fg)',
                  borderColor: 'var(--color-border-default)'
                }}
                onChange={() => toggleTaskStatusWithProjectSync(task.id)}
              />

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 
                      className="text-sm font-medium mb-1"
                      style={{ 
                        color: task.status === 'completed' ? 'var(--color-fg-muted)' : 'var(--color-fg-default)',
                        textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                      }}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-xs mb-2" style={{ color: 'var(--color-fg-muted)' }}>
                        {task.description}
                      </p>
                    )}
                    
                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      {/* Status Badge */}
                      <span 
                        className="badge"
                        style={{
                          color: task.status === 'completed' 
                            ? 'var(--color-success-fg)' 
                            : task.status === 'in-progress'
                            ? 'var(--color-accent-fg)'
                            : 'var(--color-fg-muted)',
                          background: task.status === 'completed' 
                            ? 'rgba(26, 127, 55, 0.1)' 
                            : task.status === 'in-progress'
                            ? 'rgba(31, 111, 235, 0.1)'
                            : 'rgba(208, 215, 222, 0.2)'
                        }}
                      >
                        {task.status.replace('-', ' ')}
                      </span>

                      {/* Priority Badge */}
                      <span 
                        className="badge"
                        style={{
                          color: task.priority === 'urgent' || task.priority === 'high' 
                            ? 'var(--color-danger-fg)' 
                            : 'var(--color-fg-muted)',
                          background: task.priority === 'urgent' || task.priority === 'high' 
                            ? 'rgba(207, 34, 46, 0.1)' 
                            : 'rgba(208, 215, 222, 0.2)'
                        }}
                      >
                        {task.priority}
                      </span>

                      {/* Task Type */}
                      <span 
                        className="badge"
                        style={{
                          color: 'var(--color-fg-muted)',
                          background: 'rgba(208, 215, 222, 0.2)'
                        }}
                      >
                        {task.taskType}
                      </span>

                      {/* Project */}
                      {task.projectName && (
                        <span className="flex items-center gap-1" style={{ color: 'var(--color-accent-fg)' }}>
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75z"/>
                          </svg>
                          {task.projectName}
                        </span>
                      )}

                      {/* Meeting Info */}
                      {task.taskType === 'meeting' && (
                        <>
                          {task.meetingType && (
                            <span className="flex items-center gap-1" style={{ color: 'var(--color-accent-fg)' }}>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0z"/>
                              </svg>
                              {task.meetingType}
                            </span>
                          )}
                          {task.duration && (
                            <span className="flex items-center gap-1" style={{ color: 'var(--color-fg-muted)' }}>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
                              </svg>
                              {task.duration === 'custom' ? 'Custom' : `${task.duration}min`}
                            </span>
                          )}
                          {task.attendees && (
                            <span className="flex items-center gap-1" style={{ color: 'var(--color-fg-muted)' }}>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"/>
                              </svg>
                              {task.attendees.split(',').length} attendees
                            </span>
                          )}
                          {task.meetingDate && (
                            <span className="flex items-center gap-1" style={{ color: 'var(--color-accent-fg)' }}>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0z"/>
                              </svg>
                              {new Date(task.meetingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                          {task.meetingTime && (
                            <span className="flex items-center gap-1" style={{ color: 'var(--color-fg-muted)' }}>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
                              </svg>
                              {new Date(`2000-01-01T${task.meetingTime}`).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </span>
                          )}
                        </>
                      )}

                      {/* Financial Info */}
                      {task.taskType === 'financial' && (
                        <>
                          {task.amount && (
                            <span className="flex items-center gap-1" style={{ color: 'var(--color-success-fg)' }}>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
                              </svg>
                              {task.currency === 'MYR' ? 'RM' : '$'}{task.amount}
                            </span>
                          )}
                          {task.renewalFrequency && (
                            <span className="flex items-center gap-1" style={{ color: 'var(--color-fg-muted)' }}>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
                              </svg>
                              {task.renewalFrequency}
                            </span>
                          )}
                          {task.duration && task.renewalFrequency === 'renewal' && (
                            <span className="flex items-center gap-1" style={{ color: 'var(--color-fg-muted)' }}>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
                              </svg>
                              {task.duration}
                            </span>
                          )}
                        </>
                      )}

                      {/* Due Date */}
                      {task.dueDate && (
                        <span 
                          className="flex items-center gap-1" 
                          style={{ 
                            color: isOverdue(task.dueDate) && task.status !== 'completed'
                              ? 'var(--color-danger-fg)'
                              : isDueToday(task.dueDate) && task.status !== 'completed'
                              ? '#f59e0b'
                              : 'var(--color-fg-muted)'
                          }}
                        >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0z"/>
                        </svg>
                        {task.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          {isOverdue(task.dueDate) && task.status !== 'completed' && ' (overdue)'}
                          {isDueToday(task.dueDate) && task.status !== 'completed' && ' (today)'}
                        </span>
                      )}

                      {/* Tags */}
                      {task.tags && task.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          {task.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="badge"
                              style={{
                                color: 'var(--color-fg-muted)',
                                background: 'rgba(208, 215, 222, 0.2)',
                                fontSize: '10px'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                          {task.tags.length > 2 && (
                            <span style={{ color: 'var(--color-fg-muted)' }}>
                              +{task.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Last updated */}
                      <span style={{ color: 'var(--color-fg-muted)' }}>
                        Updated {formatTimeAgo(task.updatedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {/* Status Dropdown */}
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
                      className="text-xs px-2 py-1 rounded border-0 min-w-[100px]"
                      style={{ 
                        background: 'var(--color-canvas-subtle)',
                        color: 'var(--color-fg-default)',
                        border: '1px solid var(--color-border-default)'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="todo">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>

                    {/* Priority Dropdown */}
                    <select
                      value={task.priority}
                      onChange={(e) => handlePriorityChange(task.id, e.target.value as Task['priority'])}
                      className="text-xs px-2 py-1 rounded border-0 min-w-[80px]"
                      style={{ 
                        background: 'var(--color-canvas-subtle)',
                        color: 'var(--color-fg-default)',
                        border: '1px solid var(--color-border-default)'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>

                    {/* View Button */}
                    <button 
                      onClick={() => handleViewTask(task)}
                      className="p-1.5 rounded hover:bg-opacity-10 transition-colors"
                      style={{ color: 'var(--color-accent-fg)' }}
                      title="View task details"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 2.5c-3.5 0-6.5 2.5-6.5 5.5s3 5.5 6.5 5.5 6.5-2.5 6.5-5.5-3-5.5-6.5-5.5zM8 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z"/>
                      </svg>
                    </button>

                    {/* Edit Button */}
                    <button 
                      onClick={() => handleEditTask(task)}
                      className="p-1.5 rounded hover:bg-opacity-10 transition-colors"
                      style={{ color: 'var(--color-fg-muted)' }}
                      title="Edit task"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"/>
                      </svg>
                    </button>

                    {/* Delete Button */}
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1.5 rounded hover:bg-opacity-10 transition-colors"
                      style={{ color: 'var(--color-danger-fg)' }}
                      title="Delete task"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
    </>
  );
}
