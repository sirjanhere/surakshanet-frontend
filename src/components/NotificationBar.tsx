import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'alert' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const NotificationBar: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Security Alert',
      message: 'Unauthorized access detected at Gate 2',
      timestamp: '2 mins ago',
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'High Crowd Density',
      message: 'Area B exceeding capacity limits',
      timestamp: '5 mins ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'System Update',
      message: 'Camera maintenance scheduled for 2:00 AM',
      timestamp: '15 mins ago',
      read: true
    }
  ]);

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle size={16} className="text-red-500" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'info': return <Info size={16} className="text-blue-500" />;
      case 'success': return <CheckCircle size={16} className="text-green-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Bell className="text-blue-400" size={20} />
          <h3 className="text-white font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors ${
              !notification.read ? 'bg-gray-750' : ''
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex items-start gap-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium text-sm">
                    {notification.title}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  {notification.message}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {notification.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationBar;