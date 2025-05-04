
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { formatCurrency } from "../../utils/alphaCoinUtils";

interface PortfolioChartProps {
  data: { date: string; price: number }[];
}

const PortfolioChart = ({ data }: PortfolioChartProps) => {
  // Calculate portfolio value for each data point (1M ALPHA * price)
  const portfolioData = data.map(item => ({
    ...item,
    portfolioValue: 1000000 * item.price,
    formattedDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));
  
  // Filter data to show at most 30 points, to avoid overcrowding
  const displayData = portfolioData.length > 30 
    ? portfolioData.filter((_, index) => index % Math.ceil(portfolioData.length / 30) === 0)
    : portfolioData;
  
  // Initial investment amount for reference line
  const initialInvestment = 300000;
  
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={displayData}
          margin={{ top: 5, right: 5, left: 20, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="formattedDate"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value)}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value: number) => [formatCurrency(value), "Portfolio Value"]}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F9FAFB" }}
          />
          <Legend />
          <ReferenceLine 
            y={initialInvestment} 
            label={{ value: "Initial Investment", position: "insideBottomLeft" }}
            stroke="#F59E0B" 
            strokeDasharray="3 3"
          />
          <Line 
            type="monotone" 
            dataKey="portfolioValue" 
            name="Portfolio Value"
            stroke="#8B5CF6" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#8B5CF6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
