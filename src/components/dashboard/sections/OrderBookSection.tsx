
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatCurrency, formatNumber, generateOrderBook } from "../../../utils/alphaCoinUtils";

const OrderBookSection = () => {
  const [orderBook, setOrderBook] = useState(generateOrderBook());
  const [timer, setTimer] = useState(60);
  
  useEffect(() => {
    // Record order book view activity
    const activities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
    activities.unshift({
      type: "view-orderbook",
      timestamp: new Date().toISOString(),
      description: "Viewed order book"
    });
    localStorage.setItem("recentActivities", JSON.stringify(activities.slice(0, 10)));
    
    // Update order book every 60 seconds
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          setOrderBook(generateOrderBook());
          return 60;
        }
        return prevTimer - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-6">
      <Card className="bg-card card-glow">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Alpha Coin Order Book</CardTitle>
            <CardDescription>Live buy and sell orders</CardDescription>
          </div>
          <div className="text-muted-foreground text-sm">
            Refreshes in: {timer}s
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium text-green-500">Bids (Buy Orders)</h3>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Price (USD)</TableHead>
                      <TableHead>Amount (ALPHA)</TableHead>
                      <TableHead>Total (USD)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderBook.bids.map((bid, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-green-500 font-medium">{formatCurrency(bid.price)}</TableCell>
                        <TableCell>{formatNumber(bid.amount)}</TableCell>
                        <TableCell>{formatCurrency(bid.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-red-500">Asks (Sell Orders)</h3>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Price (USD)</TableHead>
                      <TableHead>Amount (ALPHA)</TableHead>
                      <TableHead>Total (USD)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderBook.asks.map((ask, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-red-500 font-medium">{formatCurrency(ask.price)}</TableCell>
                        <TableCell>{formatNumber(ask.amount)}</TableCell>
                        <TableCell>{formatCurrency(ask.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 rounded-md bg-muted text-center">
            <p className="text-sm text-muted-foreground">
              Order book data refreshes automatically every 60 seconds. The spread between highest bid and lowest ask represents market conditions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderBookSection;
