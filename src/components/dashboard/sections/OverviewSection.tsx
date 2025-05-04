
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  formatCurrency, 
  formatNumber,
  generateHistoricalPrices,
  generateNewsHeadlines
} from "../../../utils/alphaCoinUtils";
import PriceChart from "../PriceChart";
import PortfolioChart from "../PortfolioChart";
import ComparisonWidget from "../ComparisonWidget";
import NewsWidget from "../NewsWidget";
import RecentActivity from "../RecentActivity";

interface OverviewSectionProps {
  alphaPrice: number;
  portfolioValue: number;
}

const OverviewSection = ({ alphaPrice, portfolioValue }: OverviewSectionProps) => {
  const [priceData, setPriceData] = useState(generateHistoricalPrices());
  const [news, setNews] = useState(generateNewsHeadlines());
  
  // Regenerate price data when price changes
  useEffect(() => {
    setPriceData(generateHistoricalPrices());
  }, [alphaPrice]);

  // Regenerate news when price changes
  useEffect(() => {
    setNews(generateNewsHeadlines());
  }, [alphaPrice]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card card-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alpha Price</CardTitle>
            <CardDescription>Current market value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold animate-price-pulse">{formatCurrency(alphaPrice)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card card-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alpha Balance</CardTitle>
            <CardDescription>Your holdings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(1000000)} ALPHA</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card card-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <CardDescription>Total ALPHA in USD</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold animate-price-pulse">{formatCurrency(portfolioValue)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card card-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Initial Investment</CardTitle>
            <CardDescription>Starting capital</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(300000)}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-card card-glow lg:col-span-2">
          <CardHeader>
            <CardTitle>Alpha Price Chart</CardTitle>
            <CardDescription>Price history since launch (May 4, 2025)</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="price">
              <TabsList>
                <TabsTrigger value="price">Price</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>
              <TabsContent value="price" className="pt-4">
                <PriceChart data={priceData} />
              </TabsContent>
              <TabsContent value="portfolio" className="pt-4">
                <PortfolioChart data={priceData} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="bg-card card-glow">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest transactions and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card card-glow">
          <CardHeader>
            <CardTitle>Market Comparison</CardTitle>
            <CardDescription>Alpha vs other cryptocurrencies</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ComparisonWidget alphaPrice={alphaPrice} />
          </CardContent>
        </Card>
        
        <Card className="bg-card card-glow">
          <CardHeader>
            <CardTitle>Alpha News</CardTitle>
            <CardDescription>Latest updates about Alpha Coin</CardDescription>
          </CardHeader>
          <CardContent>
            <NewsWidget news={news} />
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-card card-glow">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Exciting new Alpha Coin features</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-md">
              <div className="w-12 h-12 rounded-full bg-alphaPurple flex items-center justify-center mb-2">
                <span className="text-white font-bold">NFT</span>
              </div>
              <h3 className="font-medium">NFT Staking</h3>
              <p className="text-xs text-muted-foreground">Earn passive income</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-md">
              <div className="w-12 h-12 rounded-full bg-alphaBlue flex items-center justify-center mb-2">
                <span className="text-white font-bold">AC</span>
              </div>
              <h3 className="font-medium">AlphaChain</h3>
              <p className="text-xs text-muted-foreground">High-speed network</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-md">
              <div className="w-12 h-12 rounded-full bg-alphaGold flex items-center justify-center mb-2">
                <span className="text-white font-bold">BP</span>
              </div>
              <h3 className="font-medium">Bill Payments</h3>
              <p className="text-xs text-muted-foreground">Pay with Alpha</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-md">
              <div className="w-12 h-12 rounded-full bg-alphaGold-dark flex items-center justify-center mb-2">
                <span className="text-white font-bold">G2B</span>
              </div>
              <h3 className="font-medium">Go2bank Card</h3>
              <p className="text-xs text-muted-foreground">Alpha debit card</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewSection;
