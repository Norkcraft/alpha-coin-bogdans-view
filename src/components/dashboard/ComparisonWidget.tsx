
import { formatCurrency } from "../../utils/alphaCoinUtils";

interface ComparisonWidgetProps {
  alphaPrice: number;
}

const ComparisonWidget = ({ alphaPrice }: ComparisonWidgetProps) => {
  // Fixed prices for other cryptocurrencies
  const btcPrice = 65000;
  const ethPrice = 3200;
  
  // Calculate performance multiples
  const btcMultiple = (alphaPrice / btcPrice).toFixed(1);
  const ethMultiple = (alphaPrice / ethPrice).toFixed(1);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-muted p-4 rounded-md text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-alphaPurple flex items-center justify-center mb-2">
              <span className="text-white font-bold text-xs">AC</span>
            </div>
            <h3 className="font-medium">Alpha</h3>
            <p className="text-sm text-muted-foreground">ALPHA</p>
            <p className="font-bold mt-2">{formatCurrency(alphaPrice)}</p>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-md text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mb-2">
              <span className="text-white font-bold text-xs">BTC</span>
            </div>
            <h3 className="font-medium">Bitcoin</h3>
            <p className="text-sm text-muted-foreground">BTC</p>
            <p className="font-bold mt-2">{formatCurrency(btcPrice)}</p>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-md text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-2">
              <span className="text-white font-bold text-xs">ETH</span>
            </div>
            <h3 className="font-medium">Ethereum</h3>
            <p className="text-sm text-muted-foreground">ETH</p>
            <p className="font-bold mt-2">{formatCurrency(ethPrice)}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-alphaPurple bg-opacity-10 rounded-md border border-alphaPurple">
        <h3 className="font-semibold mb-2 text-center">Alpha Coin Outperformance</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">vs Bitcoin</p>
            <p className="text-xl font-bold">{btcMultiple}x</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">vs Ethereum</p>
            <p className="text-xl font-bold">{ethMultiple}x</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonWidget;
