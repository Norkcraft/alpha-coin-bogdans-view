
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Menu, Bell, LogOut, ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  user: { name: string; verified: boolean; };
  logout: () => void;
  toggleSidebar: () => void;
}

const DashboardHeader = ({ user, logout, toggleSidebar }: DashboardHeaderProps) => {
  const [notifications, setNotifications] = useState(3);

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </Button>
        <div className="flex items-center">
          <span className="text-2xl font-bold alpha-gradient-text">Alpha Coin</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={handleNotificationClick}
            >
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="p-2">
              <p className="text-sm font-medium">New security patch available</p>
              <p className="text-xs text-muted-foreground mt-1">May 4, 2025</p>
            </div>
            <div className="p-2 border-t">
              <p className="text-sm font-medium">Price alert: Alpha Coin at all-time high</p>
              <p className="text-xs text-muted-foreground mt-1">May 4, 2025</p>
            </div>
            <div className="p-2 border-t">
              <p className="text-sm font-medium">New login detected</p>
              <p className="text-xs text-muted-foreground mt-1">May 4, 2025</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-1">
              <span className="hidden md:block mr-1">{user.name}</span>
              {user.verified && (
                <Badge className="verified-badge text-white" variant="outline">
                  Verified
                </Badge>
              )}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
