import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const notificationStyles = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    iconColor: 'text-green-400',
    titleColor: 'text-green-900'
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    iconColor: 'text-red-400',
    titleColor: 'text-red-900'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-800',
    iconColor: 'text-yellow-400',
    titleColor: 'text-yellow-900'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-900'
  }
};

export function Notification({ id, type, title, message, duration = 5000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const styles = notificationStyles[type];
  const Icon = styles.icon;

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-close after duration
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
      onClose(id);
    }, 300);
  };

  return (
    <div
      className={`
        ${styles.bgColor} ${styles.borderColor} ${styles.textColor}
        border rounded-xl p-4 shadow-lg backdrop-blur-sm
        transform transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isExiting ? 'translate-x-full opacity-0 scale-95' : ''}
        max-w-sm w-full
      `}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
        
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium ${styles.titleColor}`}>
            {title}
          </h4>
          <p className="text-sm mt-1">
            {message}
          </p>
        </div>

        <button
          onClick={handleClose}
          className={`
            ${styles.iconColor} hover:${styles.textColor}
            transition-colors duration-200 flex-shrink-0
            p-1 rounded-lg hover:bg-white/50
          `}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Notification Container for managing multiple notifications
export function NotificationContainer() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const addNotification = (notification: Omit<NotificationProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = {
      ...notification,
      id,
      onClose: (id: string) => removeNotification(id)
    };
    
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Expose addNotification method globally
  React.useEffect(() => {
    (window as any).addNotification = addNotification;
    return () => {
      delete (window as any).addNotification;
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {notifications.map(notification => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>
  );
}

// Utility functions for easy notification creation
export const notify = {
  success: (title: string, message: string) => {
    if ((window as any).addNotification) {
      (window as any).addNotification({ type: 'success', title, message });
    }
  },
  error: (title: string, message: string) => {
    if ((window as any).addNotification) {
      (window as any).addNotification({ type: 'error', title, message });
    }
  },
  warning: (title: string, message: string) => {
    if ((window as any).addNotification) {
      (window as any).addNotification({ type: 'warning', title, message });
    }
  },
  info: (title: string, message: string) => {
    if ((window as any).addNotification) {
      (window as any).addNotification({ type: 'info', title, message });
    }
  }
};
