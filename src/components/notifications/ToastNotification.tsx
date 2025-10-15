'use client';

import { useState, useEffect } from 'react';
import type { Notification as NotificationType } from '@/types';

interface ToastNotificationProps {
  notification: NotificationType;
  onClose: () => void;
  duration?: number;
}

export default function ToastNotification({ 
  notification, 
  onClose, 
  duration = 5000 
}: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto close after duration
    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoCloseTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match CSS transition duration
  };

  const getNotificationStyles = () => {
    const baseStyles = {
      background: 'var(--color-canvas-default)',
      border: '1px solid var(--color-border-default)',
      boxShadow: '0 4px 12px var(--color-shadow)',
    };

    switch (notification.type) {
      case 'success':
        return {
          ...baseStyles,
          borderLeft: '4px solid var(--color-success-fg)',
        };
      case 'error':
        return {
          ...baseStyles,
          borderLeft: '4px solid var(--color-danger-fg)',
        };
      case 'warning':
        return {
          ...baseStyles,
          borderLeft: '4px solid #f59e0b',
        };
      case 'deadline':
        return {
          ...baseStyles,
          borderLeft: '4px solid var(--color-danger-fg)',
        };
      case 'task':
      case 'project':
        return {
          ...baseStyles,
          borderLeft: '4px solid var(--color-accent-fg)',
        };
      default:
        return {
          ...baseStyles,
          borderLeft: '4px solid var(--color-fg-muted)',
        };
    }
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
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

  return (
    <div
      className={`fixed top-4 right-4 w-80 p-4 rounded-lg z-50 transition-all duration-300 ${
        isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={getNotificationStyles()}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {getNotificationIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--color-fg-default)' }}>
            {notification.title}
          </h4>
          <p className="text-sm mb-3" style={{ color: 'var(--color-fg-muted)' }}>
            {notification.message}
          </p>
          
          {notification.action && (
            <button
              onClick={() => {
                notification.action?.onClick();
                handleClose();
              }}
              className="text-xs px-3 py-1 rounded transition-colors"
              style={{ 
                color: 'var(--color-accent-fg)',
                background: 'rgba(31, 111, 235, 0.1)'
              }}
            >
              {notification.action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded hover:bg-opacity-10 transition-colors"
          style={{ color: 'var(--color-fg-muted)' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-opacity-20 rounded-b-lg" style={{ background: 'var(--color-fg-muted)' }}>
        <div 
          className="h-full transition-all ease-linear"
          style={{ 
            background: 'var(--color-accent-fg)',
            width: isExiting ? '0%' : '100%',
            transitionDuration: `${duration}ms`
          }}
        />
      </div>
    </div>
  );
}
