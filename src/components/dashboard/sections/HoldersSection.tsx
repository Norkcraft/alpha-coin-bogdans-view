
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatCurrency, formatNumber } from "../../../utils/alphaCoinUtils";

interface HolderSectionProps {
  alphaPrice: number;
}

const HoldersSection = ({ alphaPrice }: HolderSectionProps) => {
  
  useEffect(() => {
    // Record holders view activity
    const activities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
    activities.unshift({
      type: "view-holders",
      timestamp: new Date().toISOString(),
      description: "Viewed top holders list"
    });
    localStorage.setItem("recentActivities", JSON.stringify(activities.slice(0, 10)));
  }, []);
  
  // Top holders data
  const holders = [
    {
      rank: 1,
      name: "Bogdan Wrzesinski",
      holdings: 1000000,
      value: 1000000 * alphaPrice,
      isVerified: true,
      isOwner: true,
    },
    {
      rank: 2,
      name: "Warren Buffett",
      holdings: 400000,
      value: 400000 * alphaPrice,
      isVerified: true,
      isOwner: false,
    },
    {
      rank: 3,
      name: "Alpha Foundation",
      holdings: 250000,
      value: 250000 * alphaPrice,
      isVerified: true,
      isOwner: false,
    },
    {
      rank: 4,
      name: "Elon Musk",
      holdings: 150000,
      value: 150000 * alphaPrice,
      isVerified: true,
      isOwner: false,
    },
    {
      rank: 5,
      name: "AlphaCorp Investments",
      holdings: 100000,
      value: 100000 * alphaPrice,
      isVerified: false,
      isOwner: false,
    },
    {
      rank: 6,
      name: "BlackRock",
      holdings: 80000,
      value: 80000 * alphaPrice,
      isVerified: false,
      isOwner: false,
    },
    {
      rank: 7,
      name: "J.P. Morgan",
      holdings: 50000,
      value: 50000 * alphaPrice,
      isVerified: false,
      isOwner: false,
    },
    {
      rank: 8,
      name: "Vitalik Buterin",
      holdings: 25000,
      value: 25000 * alphaPrice,
      isVerified: true,
      isOwner: false,
    },
    {
      rank: 9,
      name: "Grayscale",
      holdings: 15000,
      value: 15000 * alphaPrice,
      isVerified: false,
      isOwner: false,
    },
    {
      rank: 10,
      name: "Satoshi Nakamoto",
      holdings: 10000,
      value: 10000 * alphaPrice,
      isVerified: true,
      isOwner: false,
    },
  ];
  
  // Calculate total supply and distribution percentages
  const totalSupply = holders.reduce((sum, holder) => sum + holder.holdings, 0);
  
  return (
    <div className="space-y-6">
      <Card className="bg-card card-glow">
        <CardHeader>
          <CardTitle>Top Alpha Coin Holders</CardTitle>
          <CardDescription>
            Leading investors of Alpha Coin by holdings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Holdings</TableHead>
                  <TableHead>Value (USD)</TableHead>
                  <TableHead>% of Supply</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holders.map((holder) => (
                  <TableRow 
                    key={holder.rank} 
                    className={holder.isOwner ? "bg-alphaPurple bg-opacity-10" : ""}
                  >
                    <TableCell className="font-medium">{holder.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{holder.name}</span>
                        {holder.isVerified && (
                          <Badge className="verified-badge text-white" variant="outline">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatNumber(holder.holdings)} ALPHA</TableCell>
                    <TableCell>{formatCurrency(holder.value)}</TableCell>
                    <TableCell>
                      {((holder.holdings / totalSupply) * 100).toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 p-4 bg-muted rounded-md">
            <h3 className="font-medium mb-2">Alpha Coin Supply Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Supply</p>
                <p className="font-bold">{formatNumber(totalSupply)} ALPHA</p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Price</p>
                <p className="font-bold">{formatCurrency(alphaPrice)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Market Cap</p>
                <p className="font-bold">{formatCurrency(totalSupply * alphaPrice)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HoldersSection;
