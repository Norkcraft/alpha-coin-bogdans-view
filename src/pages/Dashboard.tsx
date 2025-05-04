
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import OverviewSection from "../components/dashboard/sections/OverviewSection";
import TradesSection from "../components/dashboard/sections/TradesSection";
import OrderBookSection from "../components/dashboard/sections/OrderBookSection";
import WalletSection from "../components/dashboard/sections/WalletSection";
import HoldersSection from "../components/dashboard/sections/HoldersSection";
import { 
  calculateAlphaPrice,
  calculatePortfolioValue
} from "../utils/alphaCoinUtils";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [alphaPrice, setAlphaPrice] = useState(calculateAlphaPrice());
  const [portfolioValue, setPortfolioValue] = useState(calculatePortfolioValue(1000000));
  const [currentSection, setCurrentSection] = useState("overview");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  // Update price every minute
  useEffect(() => {
    const updatePrice = () => {
      const newPrice = calculateAlphaPrice();
      setAlphaPrice(newPrice);
      setPortfolioValue(calculatePortfolioValue(1000000));
      
      // Record price check activity
      const activities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
      activities.unshift({
        type: "price-check",
        timestamp: new Date().toISOString(),
        description: "Checked Alpha Coin price"
      });
      localStorage.setItem("recentActivities", JSON.stringify(activities.slice(0, 10)));
    };
    
    updatePrice(); // Initial update
    const interval = setInterval(updatePrice, 60000); // Update every minute
    
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile !== isMobile) {
        setSidebarOpen(!mobile);
      }
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);
  
  const handleWithdraw = () => {
    // Record withdrawal attempt activity
    const activities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
    activities.unshift({
      type: "withdrawal",
      timestamp: new Date().toISOString(),
      description: "Attempted Alpha Coin withdrawal"
    });
    localStorage.setItem("recentActivities", JSON.stringify(activities.slice(0, 10)));
    
    // Show withdrawal message
    toast({
      title: "Withdrawal Fee Required",
      description: "$1,000 escrow fee required to process your withdrawal.",
      variant: "destructive",
    });
  };
  
  const handleDeposit = () => {
    // Record deposit attempt activity
    const activities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
    activities.unshift({
      type: "deposit",
      timestamp: new Date().toISOString(),
      description: "Attempted Alpha Coin deposit"
    });
    localStorage.setItem("recentActivities", JSON.stringify(activities.slice(0, 10)));
    
    // Show deposit message
    toast({
      title: "Deposit Instructions",
      description: "Contact Ella Jerry to fund your wallet",
    });
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader 
        user={user} 
        logout={logout} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar 
          isOpen={sidebarOpen}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          onWithdraw={handleWithdraw}
          onDeposit={handleDeposit}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={
              <OverviewSection 
                alphaPrice={alphaPrice}
                portfolioValue={portfolioValue}
              />
            } />
            <Route path="/trades" element={<TradesSection />} />
            <Route path="/orderbook" element={<OrderBookSection />} />
            <Route path="/wallet" element={<WalletSection />} />
            <Route path="/holders" element={<HoldersSection alphaPrice={alphaPrice} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
