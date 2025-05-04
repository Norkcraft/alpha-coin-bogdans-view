
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

type User = {
  name: string;
  email: string;
  verified: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("alphaUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("alphaUser");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Hardcoded credentials for Bogdan
    if (email === "bogdan@alphacoin.com" && password === "Alphaowner") {
      const userData = {
        name: "Bogdan Wrzesinski",
        email: "bogdan@alphacoin.com",
        verified: true,
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("alphaUser", JSON.stringify(userData));
      
      // Record login activity
      const activities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
      activities.unshift({
        type: "login",
        timestamp: new Date().toISOString(),
        description: "Logged in to Alpha Coin Dashboard"
      });
      localStorage.setItem("recentActivities", JSON.stringify(activities.slice(0, 10)));
      
      return true;
    } else {
      toast({
        title: "Authentication Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("alphaUser");
    
    // Record logout activity
    const activities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
    activities.unshift({
      type: "logout",
      timestamp: new Date().toISOString(),
      description: "Logged out from Alpha Coin Dashboard"
    });
    localStorage.setItem("recentActivities", JSON.stringify(activities.slice(0, 10)));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
