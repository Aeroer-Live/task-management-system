'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Notification as NotificationType } from '@/types';
import { api } from '@/lib/api';
import { useAuth } from './AuthContext';

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
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  // Fetch notifications from API when user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setNotifications([]);
      return;
    }
    api.getNotifications().then(response => {
      if (response.data) {
        const mapped: NotificationType[] = response.data.notifications.map((n: any) => ({
          id: n.id,
          userId: n.user_id,
          title: n.title,
          message: n.message,
          type: n.type,
          priority: n.priority,
          category: n.category,
          read: Boolean(n.read),
          createdAt: new Date(n.created_at),
          expiresAt: n.expires_at ? new Date(n.expires_at) : undefined,
        }));
        setNotifications(mapped);
      }
    });
  }, [isAuthenticated]);

  // Auto-remove expired notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev =>
        prev.filter(n => !n.expiresAt || n.expiresAt > new Date())
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Local-only transient notification (UI toasts — not persisted to the API)
  const addNotification = (notificationData: Omit<NotificationType, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: NotificationType = {
      ...notificationData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);

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
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    api.markNotificationAsRead(id);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    api.markAllNotificationsAsRead();
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    api.deleteNotification(id);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationsByCategory = (category: NotificationType['category']) => {
    return notifications.filter(n => n.category === category);
  };

  const getUnreadNotifications = () => {
    return notifications.filter(n => !n.read);
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
