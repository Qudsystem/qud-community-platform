import { useState } from "react";
import { Bell, UserPlus, Heart, MessageSquare, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  type: "connection" | "like" | "message" | "job";
  content: string;
  time: string;
  read: boolean;
}

export const NotificationsDropdown = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "connection",
      content: "Ahmed Hassan wants to connect with you",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "like",
      content: "Sara Ahmed liked your post about photography",
      time: "5 hours ago",
      read: false
    },
    {
      id: 3,
      type: "message",
      content: "New message from Mohamed Kamal",
      time: "1 day ago",
      read: true
    },
    {
      id: 4,
      type: "job",
      content: "New job matching your profile: Senior Photographer at Cairo Studio",
      time: "2 days ago",
      read: true
    }
  ]);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "connection":
        return <UserPlus className="h-5 w-5 text-blue-500" />;
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "job":
        return <Briefcase className="h-5 w-5 text-purple-500" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[400px]">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
              className="text-sm"
            >
              Mark all as read
            </Button>
          </div>
          
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg transition-colors",
                  notification.read ? "bg-white" : "bg-blue-50"
                )}
              >
                <div className="shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    {notification.content}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className="text-xs"
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;