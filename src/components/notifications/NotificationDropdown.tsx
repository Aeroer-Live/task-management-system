'use client';

import { useState, useRef, useEffect } from 'react';
import type { Notification as NotificationType } from '@/types';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: NotificationType['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-success-fg)' }}>
            <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
          </svg>
        );
      case 'error':
      case 'warning':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-danger-fg)' }}>
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
        );
      case 'task':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
            <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            <path d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0z"/>
          </svg>
        );
      case 'project':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
            <path d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75z"/>
          </svg>
        );
      case 'deadline':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-danger-fg)' }}>
            <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0z"/>
          </svg>
        );
      case 'system':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-fg-muted)' }}>
            <path d="M8 0a8.2 8.2 0 01.701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 01-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 01-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 01-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 01-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 01-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 010-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 01.704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 000 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.030.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 001.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 000-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 00-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 00-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 00-1.142 0zM11 8a3 3 0 11-6 0 3 3 0 016 0zM9.5 8a1.5 1.5 0 10-3.001.001A1.5 1.5 0 009.5 8z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-fg-muted)' }}>
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
        return 'var(--color-fg-muted)';
      case 'low':
        return 'var(--color-fg-subtle)';
      default:
        return 'var(--color-fg-muted)';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-md hover:bg-opacity-10 transition-colors"
        style={{ color: 'var(--color-fg-default)' }}
        title="Notifications"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16a2 2 0 002-2H6a2 2 0 002 2zm.995-14.901a1 1 0 10-1.99 0A5.002 5.002 0 003 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
        </svg>
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span 
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full text-xs font-medium flex items-center justify-center text-white"
            style={{ background: 'var(--color-danger-fg)' }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-80 rounded-lg shadow-xl z-50"
          style={{ 
            background: 'var(--color-canvas-default)',
            border: '1px solid var(--color-border-default)',
            maxHeight: '500px',
            overflowY: 'auto'
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4"
            style={{ borderBottom: '1px solid var(--color-border-default)' }}
          >
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs px-2 py-1 rounded"
                style={{ 
                  color: 'var(--color-accent-fg)',
                  background: 'rgba(31, 111, 235, 0.1)'
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center">
                <svg className="w-12 h-12 mx-auto mb-3" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-fg-muted)' }}>
                  <path d="M8 16a2 2 0 002-2H6a2 2 0 002 2zm.995-14.901a1 1 0 10-1.99 0A5.002 5.002 0 003 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                </svg>
                <p className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>
                  No notifications yet
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                  Notifications will appear here when you create tasks, projects, or have upcoming deadlines.
                </p>
              </div>
            ) : (
              notifications.slice(0, 10).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-opacity-50 transition-colors hover:bg-opacity-50 cursor-pointer ${
                    !notification.read ? 'bg-opacity-50' : ''
                  }`}
                  style={{ 
                    borderBottomColor: 'var(--color-border-default)',
                    background: !notification.read ? 'var(--color-canvas-subtle)' : 'transparent'
                  }}
                  onClick={() => {
                    if (!notification.read) {
                      markAsRead(notification.id);
                    }
                    if (notification.action) {
                      notification.action.onClick();
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 
                          className="text-sm font-medium truncate"
                          style={{ 
                            color: notification.read ? 'var(--color-fg-muted)' : 'var(--color-fg-default)'
                          }}
                        >
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div 
                            className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                            style={{ background: getPriorityColor(notification.priority) }}
                          />
                        )}
                      </div>
                      
                      <p 
                        className="text-xs mb-2 line-clamp-2"
                        style={{ color: 'var(--color-fg-muted)' }}
                      >
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <span 
                          className="text-xs"
                          style={{ color: 'var(--color-fg-subtle)' }}
                        >
                          {formatTimeAgo(notification.createdAt)}
                        </span>
                        
                        {notification.action && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              notification.action?.onClick();
                            }}
                            className="text-xs px-2 py-1 rounded transition-colors"
                            style={{ 
                              color: 'var(--color-accent-fg)',
                              background: 'rgba(31, 111, 235, 0.1)'
                            }}
                          >
                            {notification.action.label}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="flex-shrink-0 p-1 rounded hover:bg-opacity-10 transition-colors"
                      style={{ color: 'var(--color-fg-muted)' }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div 
              className="p-3 text-center"
              style={{ borderTop: '1px solid var(--color-border-default)' }}
            >
              <button 
                className="text-xs px-3 py-1 rounded transition-colors"
                style={{ 
                  color: 'var(--color-accent-fg)',
                  background: 'rgba(31, 111, 235, 0.1)'
                }}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
