
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatCurrency, formatNumber, generateTradeHistory } from "../../../utils/alphaCoinUtils";
import { Badge } from "@/components/ui/badge";

const TradesSection = () => {
  const [tradeHistory, setTradeHistory] = useState(generateTradeHistory());
  
  useEffect(() => {
    // Record trade history view activity
    const activities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
    activities.unshift({
      type: "view-trades",
      timestamp: new Date().toISOString(),
      description: "Viewed trade history"
    });
    localStorage.setItem("recentActivities", JSON.stringify(activities.slice(0, 10)));
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-card card-glow">
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
          <CardDescription>Your Alpha Coin transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="buys">Buys</TabsTrigger>
              <TabsTrigger value="sells">Sells</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="pt-4">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tradeHistory.map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell>
                          <Badge 
                            className={trade.type === "buy" ? "bg-green-600" : "bg-red-600"}
                          >
                            {trade.type.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{formatNumber(trade.amount)} ALPHA</TableCell>
                        <TableCell>{formatCurrency(trade.price)}</TableCell>
                        <TableCell>{formatCurrency(trade.total)}</TableCell>
                        <TableCell>{formatDate(trade.date)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={trade.status === "completed" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}
                          >
                            {trade.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="buys" className="pt-4">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tradeHistory.filter(trade => trade.type === "buy").map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell>
                          <Badge className="bg-green-600">BUY</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{formatNumber(trade.amount)} ALPHA</TableCell>
                        <TableCell>{formatCurrency(trade.price)}</TableCell>
                        <TableCell>{formatCurrency(trade.total)}</TableCell>
                        <TableCell>{formatDate(trade.date)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={trade.status === "completed" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}
                          >
                            {trade.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="sells" className="pt-4">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tradeHistory.filter(trade => trade.type === "sell").map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell>
                          <Badge className="bg-red-600">SELL</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{formatNumber(trade.amount)} ALPHA</TableCell>
                        <TableCell>{formatCurrency(trade.price)}</TableCell>
                        <TableCell>{formatCurrency(trade.total)}</TableCell>
                        <TableCell>{formatDate(trade.date)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={trade.status === "completed" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}
                          >
                            {trade.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="bg-card card-glow">
        <CardHeader>
          <CardTitle>Transaction Receipt Generator</CardTitle>
          <CardDescription>Create a transaction receipt for your records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-6 rounded-lg border-2 border-dashed border-border">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Alpha Coin Transaction Receipt</h3>
              <div className="grid grid-cols-2 gap-2 text-sm mb-6">
                <div className="text-left">
                  <p><strong>Transaction ID:</strong> 0x3F7A29BD</p>
                  <p><strong>Date:</strong> May 5, 2025</p>
                  <p><strong>Type:</strong> Withdrawal Attempt</p>
                </div>
                <div className="text-right">
                  <p><strong>Amount:</strong> 50,000 ALPHA</p>
                  <p><strong>Alpha Price:</strong> $150,000</p>
                  <p><strong>Total:</strong> $7,500,000</p>
                </div>
              </div>
              <div className="bg-red-200 dark:bg-red-900 p-3 rounded-md">
                <p className="text-red-800 dark:text-red-200">
                  <strong>Status:</strong> Failed (Escrow Fee Required)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradesSection;
