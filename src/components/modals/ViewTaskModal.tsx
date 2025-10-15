'use client';

import { Task } from '@/types';

interface ViewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function ViewTaskModal({ isOpen, onClose, task }: ViewTaskModalProps) {
  if (!isOpen || !task) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success-fg)';
      case 'in-progress':
        return 'var(--color-accent-fg)';
      case 'todo':
        return 'var(--color-fg-muted)';
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

  const getTaskTypeIcon = (taskType: string) => {
    switch (taskType) {
      case 'development':
        return '💻';
      case 'financial':
        return '💰';
      case 'meeting':
        return '📅';
      default:
        return '✅';
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          background: 'var(--color-canvas-default)',
          border: '1px solid var(--color-border-default)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--color-border-default)' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getTaskTypeIcon(task.taskType)}</span>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-fg-default)' }}>
              {task.title}
            </h2>
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
                  color: getStatusColor(task.status),
                  border: `1px solid ${getStatusColor(task.status)}`
                }}
              >
                {task.status.replace('-', ' ').toUpperCase()}
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
                  color: getPriorityColor(task.priority),
                  border: `1px solid ${getPriorityColor(task.priority)}`
                }}
              >
                {task.priority.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Description
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-fg-default)' }}>
                {task.description}
              </p>
            </div>
          )}

          {/* Task Type Specific Information */}
          {task.taskType === 'development' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                Development Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {task.repositoryLink && (
                  <div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Repository:
                    </span>
                    <a
                      href={task.repositoryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-600 hover:underline truncate"
                    >
                      {task.repositoryLink}
                    </a>
                  </div>
                )}
                {task.branchName && (
                  <div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Branch:
                    </span>
                    <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                      {task.branchName}
                    </span>
                  </div>
                )}
                {task.issueLink && (
                  <div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Issue:
                    </span>
                    <a
                      href={task.issueLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-600 hover:underline truncate"
                    >
                      {task.issueLink}
                    </a>
                  </div>
                )}
                {task.techStack && (
                  <div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Tech Stack:
                    </span>
                    <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                      {task.techStack}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {task.taskType === 'financial' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                Financial Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {task.amount && (
                  <div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Amount:
                    </span>
                    <span className="block text-sm font-medium" style={{ color: 'var(--color-success-fg)' }}>
                      {task.currency === 'MYR' ? 'RM' : '$'}{task.amount}
                    </span>
                  </div>
                )}
                {task.currency && (
                  <div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Currency:
                    </span>
                    <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                      {task.currency}
                    </span>
                  </div>
                )}
                {(task.productLink || task.paymentLink) && (
                  <div className="md:col-span-2">
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Link:
                    </span>
                    <a
                      href={task.productLink || task.paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-600 hover:underline truncate"
                    >
                      {task.productLink || task.paymentLink}
                    </a>
                  </div>
                )}
                {task.renewalFrequency && (
                  <div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Renewal:
                    </span>
                    <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                      {task.renewalFrequency}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {task.taskType === 'meeting' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                Meeting Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {task.meetingType && (
                  <div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Type:
                    </span>
                    <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                      {task.meetingType}
                    </span>
                  </div>
                )}
                {task.duration && (
                  <div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Duration:
                    </span>
                    <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                      {task.duration}
                    </span>
                  </div>
                )}
                {task.meetingDate && (
                  <div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Date:
                    </span>
                    <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                      {new Date(task.meetingDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                {task.meetingTime && (
                  <div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Time:
                    </span>
                    <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                      {new Date(`2000-01-01T${task.meetingTime}`).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </span>
                  </div>
                )}
                {task.attendees && (
                  <div className="md:col-span-2">
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Attendees:
                    </span>
                    <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                      {task.attendees}
                    </span>
                  </div>
                )}
                {task.meetingLink && (
                  <div className="md:col-span-2">
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                      Meeting Link:
                    </span>
                    <a
                      href={task.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-600 hover:underline truncate"
                    >
                      {task.meetingLink}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Project Information */}
          {task.projectName && (
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Project
              </h3>
              <span
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
                style={{
                  background: 'var(--color-accent-subtle)',
                  color: 'var(--color-accent-fg)',
                  border: '1px solid var(--color-accent-emphasis)'
                }}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75z"/>
                </svg>
                {task.projectName}
              </span>
            </div>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded-md text-xs"
                    style={{
                      background: 'rgba(208, 215, 222, 0.2)',
                      color: 'var(--color-fg-muted)',
                      border: '1px solid var(--color-border-default)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Due Date */}
          {task.dueDate && (
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Due Date
              </h3>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0z"/>
                </svg>
                <span className="text-sm" style={{ color: 'var(--color-fg-default)' }}>
                  {formatDate(task.dueDate)}
                </span>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: 'var(--color-border-default)' }}>
            <div>
              <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                Created:
              </span>
              <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                {formatDate(task.createdAt)}
              </span>
            </div>
            <div>
              <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                Last Updated:
              </span>
              <span className="block text-sm" style={{ color: 'var(--color-fg-default)' }}>
                {formatDate(task.updatedAt)}
              </span>
            </div>
            {task.completedAt && (
              <div>
                <span className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                  Completed:
                </span>
                <span className="block text-sm" style={{ color: 'var(--color-success-fg)' }}>
                  {formatDate(task.completedAt)}
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
