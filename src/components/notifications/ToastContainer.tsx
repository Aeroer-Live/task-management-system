'use client';

import { useState, useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationsContext';
import ToastNotification from './ToastNotification';

export default function ToastContainer() {
  const { notifications, removeNotification } = useNotifications();
  const [toasts, setToasts] = useState<Array<{ id: string; notification: any }>>([]);

  useEffect(() => {
    // Show toast for new notifications
    const latestNotification = notifications[0];
    if (latestNotification && !latestNotification.read) {
      // Check if toast already exists for this notification
      const toastExists = toasts.some(toast => toast.id === latestNotification.id);
      
      if (!toastExists) {
        setToasts(prev => [
          { id: latestNotification.id, notification: latestNotification },
          ...prev.slice(0, 2) // Limit to 3 toasts max
        ]);
      }
    }
  }, [notifications, toasts]);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
    // Also remove from notifications context
    removeNotification(id);
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            transform: `translateY(${index * 8}px)`,
            zIndex: 1000 - index,
          }}
        >
          <ToastNotification
            notification={toast.notification}
            onClose={() => removeToast(toast.id)}
            duration={toast.notification.priority === 'urgent' ? 8000 : 5000}
          />
        </div>
      ))}
    </div>
  );
}
