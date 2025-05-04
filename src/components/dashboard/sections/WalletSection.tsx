
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency, calculateAlphaPrice } from "../../../utils/alphaCoinUtils";
import AlphaQRCode from "../AlphaQRCode";

const WalletSection = () => {
  const { toast } = useToast();
  const [walletAddress] = useState("0xBogdanAlpha9283F6C71D4E3B5D11A8E52AF");
  const [alphaPrice, setAlphaPrice] = useState(calculateAlphaPrice());
  
  useEffect(() => {
    // Record wallet view activity
    const activities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
    activities.unshift({
      type: "view-wallet",
      timestamp: new Date().toISOString(),
      description: "Accessed wallet details"
    });
    localStorage.setItem("recentActivities", JSON.stringify(activities.slice(0, 10)));
    
    // Update price every minute
    const interval = setInterval(() => {
      setAlphaPrice(calculateAlphaPrice());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Copied to clipboard",
      description: "Wallet address copied successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-card card-glow">
        <CardHeader>
          <CardTitle>Alpha Coin Wallet</CardTitle>
          <CardDescription>Manage your Alpha Coin holdings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Wallet Address</h3>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted p-3 rounded-md flex-1 font-mono text-sm overflow-auto">
                    {walletAddress}
                  </div>
                  <Button variant="outline" size="icon" onClick={handleCopy}>
                    <Copy size={16} />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is your Alpha Coin wallet address. Use it to receive ALPHA coins.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-md">
                  <h3 className="font-medium mb-1">Balance</h3>
                  <div className="text-2xl font-bold">1,000,000 ALPHA</div>
                  <div className="text-sm text-muted-foreground">≈ {formatCurrency(1000000 * alphaPrice)}</div>
                </div>
                <div className="p-4 bg-muted rounded-md">
                  <h3 className="font-medium mb-1">Initial Investment</h3>
                  <div className="text-2xl font-bold">{formatCurrency(300000)}</div>
                  <div className="text-sm text-muted-foreground">On May 4, 2025</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-md">
              <AlphaQRCode value={walletAddress} />
              <p className="text-xs text-center mt-2 text-muted-foreground">
                Scan to send funds to this wallet
              </p>
            </div>
          </div>
          
          <div className="rounded-md border-2 border-dashed border-border p-4">
            <h3 className="font-medium mb-2">Transaction Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Network:</strong> AlphaChain</p>
                <p><strong>Transaction Fee:</strong> 0.01 ALPHA</p>
                <p><strong>Minimum Deposit:</strong> 0.5 ALPHA</p>
              </div>
              <div>
                <p><strong>Confirmation Time:</strong> ~2 minutes</p>
                <p><strong>Current Price:</strong> {formatCurrency(alphaPrice)}</p>
                <p><strong>Export Transactions:</strong> <Button size="sm" variant="ghost" className="h-6 p-0 ml-1"><Download size={12} /></Button></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card card-glow">
        <CardHeader>
          <CardTitle>Portfolio Breakdown</CardTitle>
          <CardDescription>Your cryptocurrency holdings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="pt-4 flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 rounded-full border-8 border-alphaPurple flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Alpha Coin</p>
                <p className="text-2xl font-bold">100%</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-alphaPurple mr-2"></div>
                  <span className="font-medium">Alpha Coin (ALPHA)</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">1,000,000 ALPHA</p>
                  <p className="text-sm text-muted-foreground">{formatCurrency(1000000 * alphaPrice)}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
                  <span>Other Cryptocurrencies</span>
                </div>
                <div className="text-right">
                  <p>0 Coins</p>
                  <p className="text-sm">{formatCurrency(0)}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Your portfolio consists entirely of Alpha Coin. Diversification options will be available in future updates.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletSection;
