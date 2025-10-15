'use client';

import { useState, useEffect } from 'react';
import { useTaskProject } from '@/contexts/TaskProjectContext';
import { useProjects } from '@/contexts/ProjectsContext';
import type { Task } from '@/types';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function EditTaskModal({ isOpen, onClose, task }: EditTaskModalProps) {
  const { updateTaskWithProjectSync } = useTaskProject();
  const { projects } = useProjects();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
    project: '',
    tags: '',
    taskType: 'regular',
    productLink: '',
    amount: '',
    paymentLink: '',
    renewalFrequency: '',
    repositoryLink: '',
    branchName: '',
    issueLink: '',
    techStack: '',
  });

  // Update form data when task changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate || '',
        project: task.projectId || '',
        tags: task.tags ? task.tags.join(', ') : '',
        taskType: task.taskType,
        productLink: task.productLink || '',
        amount: task.amount || '',
        paymentLink: task.paymentLink || '',
        renewalFrequency: task.renewalFrequency || '',
        repositoryLink: task.repositoryLink || '',
        branchName: task.branchName || '',
        issueLink: task.issueLink || '',
        techStack: task.techStack || '',
      });
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse tags from comma-separated string
    const tags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    
    // Find selected project
    const selectedProject = projects.find(p => p.id === formData.project);
    
    // Create updated task data
    const updatedTaskData = {
      title: formData.title,
      description: formData.description,
      status: formData.status as 'todo' | 'in-progress' | 'completed',
      priority: formData.priority as 'low' | 'medium' | 'high' | 'urgent',
      dueDate: formData.dueDate || undefined,
      taskType: formData.taskType as 'regular' | 'development' | 'purchase' | 'payment' | 'renewal',
      tags,
      // Project association
      projectId: formData.project || undefined,
      projectName: selectedProject?.name,
      // Type-specific fields
      productLink: formData.productLink || undefined,
      amount: formData.amount || undefined,
      paymentLink: formData.paymentLink || undefined,
      renewalFrequency: formData.renewalFrequency || undefined,
      repositoryLink: formData.repositoryLink || undefined,
      branchName: formData.branchName || undefined,
      issueLink: formData.issueLink || undefined,
      techStack: formData.techStack || undefined,
    };

    updateTaskWithProjectSync(task.id, updatedTaskData);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-2xl rounded-lg shadow-xl"
        style={{
          background: 'var(--color-canvas-default)',
          border: '1px solid var(--color-border-default)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between p-4"
          style={{ borderBottom: '1px solid var(--color-border-default)' }}
        >
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-fg-default)' }}>
            Edit task
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-opacity-10 transition-colors"
            style={{ color: 'var(--color-fg-muted)' }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Task Type Selector */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Task type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, taskType: 'regular' })}
                  className="flex items-center gap-3 p-4 rounded-md transition-all"
                  style={{
                    background: formData.taskType === 'regular' ? 'rgba(31, 111, 235, 0.1)' : 'var(--color-canvas-subtle)',
                    border: `2px solid ${formData.taskType === 'regular' ? 'var(--color-accent-emphasis)' : 'var(--color-border-default)'}`,
                  }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
                    <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                    <path d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                      Regular Task
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                      General to-do, reminder
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, taskType: 'development' })}
                  className="flex items-center gap-3 p-4 rounded-md transition-all"
                  style={{
                    background: formData.taskType === 'development' ? 'rgba(31, 111, 235, 0.1)' : 'var(--color-canvas-subtle)',
                    border: `2px solid ${formData.taskType === 'development' ? 'var(--color-accent-emphasis)' : 'var(--color-border-default)'}`,
                  }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
                    <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                      Development
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                      Code, bug fix, feature
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, taskType: 'purchase' })}
                  className="flex items-center gap-3 p-4 rounded-md transition-all"
                  style={{
                    background: formData.taskType === 'purchase' ? 'rgba(255, 193, 7, 0.1)' : 'var(--color-canvas-subtle)',
                    border: `2px solid ${formData.taskType === 'purchase' ? '#ffc107' : 'var(--color-border-default)'}`,
                  }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 16 16" style={{ color: '#ffc107' }}>
                    <path d="M4 1.75C4 .784 4.784 0 5.75 0h4.5C11.216 0 12 .784 12 1.75v.5h-1.5V1.75a.25.25 0 00-.25-.25h-4.5a.25.25 0 00-.25.25v.5H4v-.5zm-1.5 3.5a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zM3.75 9a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zM3 12.25a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 01-.75-.75zM2.75 4.5h10.5a.75.75 0 01.75.75v8.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.75v-8.5a.75.75 0 01.75-.75z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                      Purchase
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                      Buy software, hardware
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, taskType: 'payment' })}
                  className="flex items-center gap-3 p-4 rounded-md transition-all"
                  style={{
                    background: formData.taskType === 'payment' ? 'rgba(255, 87, 34, 0.1)' : 'var(--color-canvas-subtle)',
                    border: `2px solid ${formData.taskType === 'payment' ? '#ff5722' : 'var(--color-border-default)'}`,
                  }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 16 16" style={{ color: '#ff5722' }}>
                    <path d="M1.75 2.5a.75.75 0 00-.75.75v10.5c0 .414.336.75.75.75h12.5a.75.75 0 00.75-.75V3.25a.75.75 0 00-.75-.75H1.75zM14 4H2v-.75a.25.25 0 01.25-.25h11.5a.25.25 0 01.25.25V4zM2 5.5h12V13h-12V5.5zm3.25 2a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                      Payment
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                      Pay bills, invoices
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, taskType: 'renewal' })}
                  className="flex items-center gap-3 p-4 rounded-md transition-all"
                  style={{
                    background: formData.taskType === 'renewal' ? 'rgba(76, 175, 80, 0.1)' : 'var(--color-canvas-subtle)',
                    border: `2px solid ${formData.taskType === 'renewal' ? '#4CAF50' : 'var(--color-border-default)'}`,
                  }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 16 16" style={{ color: '#4CAF50' }}>
                    <path d="M1.75 1.75a.75.75 0 000 1.5h.75V4h-.75a.75.75 0 000 1.5h.75v.75H1.75a.75.75 0 000 1.5h.75V9h-.75a.75.75 0 000 1.5h.75v.75H1.75a.75.75 0 000 1.5h.75v.75H1.75a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5h-.75v-.75h.75a.75.75 0 000-1.5h-.75V10h.75a.75.75 0 000-1.5h-.75V7.75h.75a.75.75 0 000-1.5h-.75V5.5h.75a.75.75 0 000-1.5h-.75V4h.75a.75.75 0 000-1.5h-.75V1.75a.75.75 0 00-1.5 0v.75h-.75V1.75a.75.75 0 00-1.5 0v.75h-.75V1.75a.75.75 0 00-1.5 0v.75h-.75V1.75a.75.75 0 00-1.5 0v.75h-.75V1.75a.75.75 0 00-1.5 0v.75H3.25V1.75zM14 4h-1.5v.75a.75.75 0 001.5 0V4zM14 5.5h-1.5v.75a.75.75 0 001.5 0V5.5zM14 7h-1.5v.75a.75.75 0 001.5 0V7zM14 8.5h-1.5v.75a.75.75 0 001.5 0V8.5zM14 10h-1.5v.75a.75.75 0 001.5 0V10zM14 11.5h-1.5v.75a.75.75 0 001.5 0V11.5zM11 1.75a.75.75 0 00-1.5 0v.75h-1.5V1.75a.75.75 0 00-1.5 0v.75h-1.5V1.75a.75.75 0 00-1.5 0v.75h-1.5V1.75a.75.75 0 00-1.5 0v.75H3.25V1.75a.75.75 0 00-1.5 0v.75H1.75V4h1.5v.75a.75.75 0 00-1.5 0V4H1.75V5.5h1.5v.75a.75.75 0 00-1.5 0V5.5H1.75V7h1.5v.75a.75.75 0 00-1.5 0V7H1.75V8.5h1.5v.75a.75.75 0 00-1.5 0V8.5H1.75V10h1.5v.75a.75.75 0 00-1.5 0V10H1.75V11.5h1.5v.75a.75.75 0 00-1.5 0V11.5H1.75V13h1.5v.75a.75.75 0 00-1.5 0V13H1.75V14.25h1.5v.75a.75.75 0 00-1.5 0V14.25H1.75V15h12.5v-.75h-1.5v-.75h1.5v-.75h-1.5v-.75h1.5v-.75h-1.5v-.75h1.5v-.75h-1.5v-.75h1.5V7h-1.5V5.5h1.5V4h-1.5V2.5h1.5V1.75H14v.75h-1.5V1.75h-1.5v.75h-1.5V1.75h-1.5v.75h-1.5V1.75h-1.5v.75h-1.5V1.75z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                      Renewal
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                      Subscriptions, licenses
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Task Title */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Task title <span style={{ color: 'var(--color-danger-fg)' }}>*</span>
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="Enter task title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                autoFocus
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Description
              </label>
              <textarea
                rows={3}
                className="input-field resize-none"
                placeholder="Add more details about the task..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Priority
                </label>
                <select
                  className="input-field"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Status
                </label>
                <select
                  className="input-field"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Due Date and Project */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Due date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Project
                </label>
                <select
                  className="input-field"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                >
                  <option value="">No project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Tags
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., urgent, frontend, marketing (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                Add keywords to categorize your task
              </p>
            </div>

            {/* Type-specific fields */}
            {formData.taskType === 'development' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Repository link
                  </label>
                  <input
                    type="url"
                    className="input-field"
                    placeholder="https://github.com/username/repository..."
                    value={formData.repositoryLink}
                    onChange={(e) => setFormData({ ...formData, repositoryLink: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Branch name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g., feature/auth, bugfix/login..."
                      value={formData.branchName}
                      onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Issue link
                    </label>
                    <input
                      type="url"
                      className="input-field"
                      placeholder="https://github.com/issues/123..."
                      value={formData.issueLink}
                      onChange={(e) => setFormData({ ...formData, issueLink: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Tech stack
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="React, Node.js, PostgreSQL..."
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  />
                </div>
              </>
            )}

            {(formData.taskType === 'purchase' || formData.taskType === 'payment' || formData.taskType === 'renewal') && (
              <div className="grid grid-cols-2 gap-4">
                {formData.taskType === 'purchase' && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Product link
                    </label>
                    <input
                      type="url"
                      className="input-field"
                      placeholder="https://example.com/product..."
                      value={formData.productLink}
                      onChange={(e) => setFormData({ ...formData, productLink: e.target.value })}
                    />
                  </div>
                )}
                {formData.taskType === 'payment' && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Payment link
                    </label>
                    <input
                      type="url"
                      className="input-field"
                      placeholder="https://paypal.com/invoice..."
                      value={formData.paymentLink}
                      onChange={(e) => setFormData({ ...formData, paymentLink: e.target.value })}
                    />
                  </div>
                )}
                {formData.taskType === 'renewal' && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Renewal frequency
                    </label>
                    <select
                      className="input-field"
                      value={formData.renewalFrequency}
                      onChange={(e) => setFormData({ ...formData, renewalFrequency: e.target.value })}
                    >
                      <option value="">Select frequency</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm" style={{ color: 'var(--color-fg-muted)' }}>
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      className="input-field pl-7"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div
            className="flex justify-end gap-3 p-4 mt-6"
            style={{ borderTop: '1px solid var(--color-border-default)' }}
          >
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
