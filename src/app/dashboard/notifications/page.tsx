'use client';

import { useState, useMemo } from 'react';
import type { Notification as NotificationType } from '@/types';

type FilterType = 'all' | 'unread' | 'read';
type CategoryFilter = 'all' | 'task' | 'project' | 'calendar' | 'system' | 'team' | 'reminder';
type TypeFilter = 'all' | 'info' | 'warning' | 'success' | 'error' | 'task' | 'project' | 'deadline' | 'system';

export default function NotificationsPage() {
  // For new users, show empty state
  const notifications: NotificationType[] = [];
  const unreadCount = 0;
  
  // Placeholder functions for future implementation
  const markAsRead = (id: string) => {
    console.log('Mark as read:', id);
    // TODO: Implement API call
  };
  
  const markAllAsRead = () => {
    console.log('Mark all as read');
    // TODO: Implement API call
  };
  
  const removeNotification = (id: string) => {
    console.log('Remove notification:', id);
    // TODO: Implement API call
  };
  
  const clearAllNotifications = () => {
    console.log('Clear all notifications');
    // TODO: Implement API call
  };

  const [filter, setFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());

  // Filter notifications based on current filters
  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      // Filter by read status
      if (filter === 'unread' && notification.read) return false;
      if (filter === 'read' && !notification.read) return false;

      // Filter by category
      if (categoryFilter !== 'all' && notification.category !== categoryFilter) return false;

      // Filter by type
      if (typeFilter !== 'all' && notification.type !== typeFilter) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          notification.title.toLowerCase().includes(query) ||
          notification.message.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [notifications, filter, categoryFilter, typeFilter, searchQuery]);

  const getNotificationIcon = (type: NotificationType['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-success-fg)' }}>
            <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-danger-fg)' }}>
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: '#f59e0b' }}>
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
        );
      case 'task':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
            <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            <path d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0z"/>
          </svg>
        );
      case 'project':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
            <path d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75z"/>
          </svg>
        );
      case 'deadline':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-danger-fg)' }}>
            <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-fg-muted)' }}>
            <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z"/>
          </svg>
        );
    }
  };

  const getPriorityColor = (priority: NotificationType['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'var(--color-danger-fg)';
      case 'high':
        return 'var(--color-accent-fg)';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return 'var(--color-fg-muted)';
      default:
        return 'var(--color-fg-muted)';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const handleSelectNotification = (id: string) => {
    const newSelected = new Set(selectedNotifications);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedNotifications(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedNotifications.size === filteredNotifications.length) {
      setSelectedNotifications(new Set());
    } else {
      setSelectedNotifications(new Set(filteredNotifications.map(n => n.id)));
    }
  };

  const handleBulkMarkAsRead = () => {
    selectedNotifications.forEach(id => markAsRead(id));
    setSelectedNotifications(new Set());
  };

  const handleBulkDelete = () => {
    selectedNotifications.forEach(id => removeNotification(id));
    setSelectedNotifications(new Set());
  };

  const clearFilters = () => {
    setFilter('all');
    setCategoryFilter('all');
    setTypeFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-fg-default)' }}>
              Notifications
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>
              {unreadCount} unread • {notifications.length} total
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="btn-secondary text-sm"
              disabled={unreadCount === 0}
            >
              Mark all read
            </button>
            <button
              onClick={clearAllNotifications}
              className="btn-outline text-sm"
              style={{ borderColor: 'var(--color-danger-fg)', color: 'var(--color-danger-fg)' }}
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
              Search
            </label>
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
              Status
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="input-field"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
              className="input-field"
            >
              <option value="all">All Categories</option>
              <option value="task">Tasks</option>
              <option value="project">Projects</option>
              <option value="calendar">Calendar</option>
              <option value="system">System</option>
              <option value="team">Team</option>
              <option value="reminder">Reminders</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
              className="input-field"
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
              <option value="task">Task</option>
              <option value="project">Project</option>
              <option value="deadline">Deadline</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {(filter !== 'all' || categoryFilter !== 'all' || typeFilter !== 'all' || searchQuery) && (
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border-default)' }}>
            <button
              onClick={clearFilters}
              className="text-sm"
              style={{ color: 'var(--color-accent-fg)' }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedNotifications.size > 0 && (
        <div className="card p-4 mb-6" style={{ background: 'var(--color-canvas-subtle)' }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
              {selectedNotifications.size} notification{selectedNotifications.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkMarkAsRead}
                className="btn-secondary text-sm"
              >
                Mark as read
              </button>
              <button
                onClick={handleBulkDelete}
                className="btn-outline text-sm"
                style={{ borderColor: 'var(--color-danger-fg)', color: 'var(--color-danger-fg)' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="card p-8 text-center">
            <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-fg-muted)' }}>
              <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-fg-default)' }}>
              No notifications yet
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>
              {searchQuery || filter !== 'all' || categoryFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'You\'re all caught up! Notifications will appear here when you create tasks, projects, or have upcoming deadlines.'}
            </p>
          </div>
        ) : (
          <>
            {/* Select All */}
            <div className="flex items-center gap-3 p-3 rounded-md" style={{ background: 'var(--color-canvas-subtle)' }}>
              <input
                type="checkbox"
                checked={selectedNotifications.size === filteredNotifications.length && filteredNotifications.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded"
                style={{ accentColor: 'var(--color-accent-fg)' }}
              />
              <span className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                Select all ({filteredNotifications.length})
              </span>
            </div>

            {/* Notifications */}
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`card p-4 transition-all ${
                  selectedNotifications.has(notification.id) ? 'ring-2' : ''
                }`}
                style={{
                  border: selectedNotifications.has(notification.id) 
                    ? '2px solid var(--color-accent-fg)' 
                    : '1px solid var(--color-border-default)',
                  background: notification.read 
                    ? 'var(--color-canvas-default)' 
                    : 'var(--color-canvas-subtle)',
                  opacity: notification.read ? 0.7 : 1
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedNotifications.has(notification.id)}
                    onChange={() => handleSelectNotification(notification.id)}
                    className="mt-1 w-4 h-4 rounded"
                    style={{ accentColor: 'var(--color-accent-fg)' }}
                  />

                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`text-sm font-semibold mb-1 ${!notification.read ? 'font-bold' : ''}`} style={{ color: 'var(--color-fg-default)' }}>
                          {notification.title}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-fg-muted)' }}>
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                          <span className="badge" style={{ 
                            background: 'var(--color-canvas-subtle)',
                            color: 'var(--color-fg-muted)'
                          }}>
                            {notification.category}
                          </span>
                          <span className="badge" style={{ 
                            background: 'var(--color-canvas-subtle)',
                            color: getPriorityColor(notification.priority)
                          }}>
                            {notification.priority}
                          </span>
                          <span>{formatDate(notification.createdAt)}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-4">
                        {notification.action && (
                          <button
                            onClick={() => {
                              notification.action?.onClick();
                              markAsRead(notification.id);
                            }}
                            className="btn-primary text-xs"
                          >
                            {notification.action.label}
                          </button>
                        )}
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="btn-secondary text-xs"
                          >
                            Mark read
                          </button>
                        )}
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="p-1 rounded hover:bg-opacity-10 transition-colors"
                          style={{ color: 'var(--color-fg-muted)' }}
                          title="Delete notification"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
