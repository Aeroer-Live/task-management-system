'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Notification as NotificationType } from '@/types';

interface NotificationsContextType {
  notifications: NotificationType[];
  unreadCount: number;
  addNotification: (notification: Omit<NotificationType, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  getNotificationsByCategory: (category: NotificationType['category']) => NotificationType[];
  getUnreadNotifications: () => NotificationType[];
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        // Convert date strings back to Date objects
        const notificationsWithDates = parsed.map((n: any) => ({
          ...n,
          createdAt: new Date(n.createdAt),
          expiresAt: n.expiresAt ? new Date(n.expiresAt) : undefined,
        }));
        setNotifications(notificationsWithDates);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    } else {
      // Initialize with some sample notifications
      const sampleNotifications: NotificationType[] = [
        {
          id: '1',
          userId: 'user1',
          title: 'Task Deadline Approaching',
          message: 'Fix authentication bug is due in 2 hours',
          type: 'deadline',
          read: false,
          priority: 'high',
          category: 'task',
          createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          action: {
            label: 'View Task',
            onClick: () => console.log('Navigate to task')
          }
        },
        {
          id: '2',
          userId: 'user1',
          title: 'New Project Created',
          message: 'Task-Lab Development project has been created',
          type: 'project',
          read: false,
          priority: 'medium',
          category: 'project',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          action: {
            label: 'View Project',
            onClick: () => console.log('Navigate to project')
          }
        },
        {
          id: '3',
          userId: 'user1',
          title: 'Team Meeting Reminder',
          message: 'Daily standup meeting starts in 15 minutes',
          type: 'info',
          read: true,
          priority: 'medium',
          category: 'calendar',
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        },
        {
          id: '4',
          userId: 'user1',
          title: 'System Update Available',
          message: 'New features and improvements are ready to install',
          type: 'system',
          read: false,
          priority: 'low',
          category: 'system',
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          action: {
            label: 'Update Now',
            onClick: () => console.log('Start system update')
          }
        },
        {
          id: '5',
          userId: 'user1',
          title: 'Task Completed',
          message: 'Update landing page design has been completed',
          type: 'success',
          read: true,
          priority: 'low',
          category: 'task',
          createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        }
      ];
      setNotifications(sampleNotifications);
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Auto-remove expired notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => 
        prev.filter(notification => 
          !notification.expiresAt || notification.expiresAt > new Date()
        )
      );
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notificationData: Omit<NotificationType, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: NotificationType = {
      ...notificationData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show browser notification if permission is granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(newNotification.title, {
        body: newNotification.message,
        icon: '/favicon.ico',
        tag: newNotification.id,
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationsByCategory = (category: NotificationType['category']) => {
    return notifications.filter(notification => notification.category === category);
  };

  const getUnreadNotifications = () => {
    return notifications.filter(notification => !notification.read);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
        getNotificationsByCategory,
        getUnreadNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}
