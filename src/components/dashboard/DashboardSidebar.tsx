
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  LineChart, 
  BookOpen, 
  Wallet, 
  Users, 
  Download,
  Upload
} from "lucide-react";

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarLink = ({ icon, label, active, onClick }: SidebarLinkProps) => (
  <Button
    variant={active ? "default" : "ghost"}
    className={`w-full justify-start ${active ? "bg-alphaPurple hover:bg-alphaPurple-dark" : ""}`}
    onClick={onClick}
  >
    <span className="mr-2">{icon}</span>
    <span>{label}</span>
  </Button>
);

interface DashboardSidebarProps {
  isOpen: boolean;
  currentSection: string;
  setCurrentSection: (section: string) => void;
  onWithdraw: () => void;
  onDeposit: () => void;
}

const DashboardSidebar = ({ 
  isOpen, 
  currentSection,
  setCurrentSection,
  onWithdraw,
  onDeposit
}: DashboardSidebarProps) => {
  const navigate = useNavigate();
  
  const handleNavigation = (section: string, path: string) => {
    setCurrentSection(section);
    navigate(path);
  };
  
  if (!isOpen) return null;
  
  return (
    <aside className="h-[calc(100vh-4rem)] w-64 bg-sidebar border-r border-border flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Alpha Coin Platform</p>
        
        <nav className="space-y-1">
          <SidebarLink
            icon={<LayoutDashboard size={18} />}
            label="Overview"
            active={currentSection === "overview"}
            onClick={() => handleNavigation("overview", "/dashboard")}
          />
          <SidebarLink
            icon={<LineChart size={18} />}
            label="Trade History"
            active={currentSection === "trades"}
            onClick={() => handleNavigation("trades", "/dashboard/trades")}
          />
          <SidebarLink
            icon={<BookOpen size={18} />}
            label="Order Book"
            active={currentSection === "orderbook"}
            onClick={() => handleNavigation("orderbook", "/dashboard/orderbook")}
          />
          <SidebarLink
            icon={<Wallet size={18} />}
            label="Wallet"
            active={currentSection === "wallet"}
            onClick={() => handleNavigation("wallet", "/dashboard/wallet")}
          />
          <SidebarLink
            icon={<Users size={18} />}
            label="Top Holders"
            active={currentSection === "holders"}
            onClick={() => handleNavigation("holders", "/dashboard/holders")}
          />
        </nav>
      </div>
      
      <div className="mt-auto p-4">
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={onDeposit} className="w-full bg-alphaGold hover:bg-alphaGold-dark">
            <Upload size={16} className="mr-2" />
            Deposit
          </Button>
          <Button onClick={onWithdraw} variant="outline" className="w-full">
            <Download size={16} className="mr-2" />
            Withdraw
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
