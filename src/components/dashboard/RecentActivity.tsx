
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  LogIn, 
  LogOut, 
  LineChart, 
  BookOpen,
  Wallet,
  Users,
  Download,
  Upload
} from "lucide-react";

interface Activity {
  type: string;
  timestamp: string;
  description: string;
}

const RecentActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  
  useEffect(() => {
    // Get activities from localStorage
    const storedActivities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
    setActivities(storedActivities);
    
    // Set up interval to refresh activities
    const interval = setInterval(() => {
      const updatedActivities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
      setActivities(updatedActivities);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Get icon for activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <LogIn className="h-4 w-4 text-green-500" />;
      case 'logout':
        return <LogOut className="h-4 w-4 text-red-500" />;
      case 'price-check':
        return <LineChart className="h-4 w-4 text-blue-500" />;
      case 'view-trades':
        return <LineChart className="h-4 w-4 text-purple-500" />;
      case 'view-orderbook':
        return <BookOpen className="h-4 w-4 text-yellow-500" />;
      case 'view-wallet':
        return <Wallet className="h-4 w-4 text-cyan-500" />;
      case 'view-holders':
        return <Users className="h-4 w-4 text-orange-500" />;
      case 'withdrawal':
        return <Download className="h-4 w-4 text-red-500" />;
      case 'deposit':
        return <Upload className="h-4 w-4 text-green-500" />;
      default:
        return <ArrowRight className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No recent activity to show
        </div>
      ) : (
        activities.map((activity, index) => (
          <div 
            key={index} 
            className="flex items-start space-x-2 border-l-2 border-alphaPurple pl-2"
          >
            <div className="mt-0.5">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentActivity;
