
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { formatCurrency } from "../../utils/alphaCoinUtils";

interface PriceChartProps {
  data: { date: string; price: number }[];
}

const PriceChart = ({ data }: PriceChartProps) => {
  // Format date for display
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));
  
  // Filter data to show at most 30 points, to avoid overcrowding
  const displayData = formattedData.length > 30 
    ? formattedData.filter((_, index) => index % Math.ceil(formattedData.length / 30) === 0)
    : formattedData;
  
  // Find min and max prices for y-axis domain
  const minPrice = Math.min(...formattedData.map(item => item.price));
  const maxPrice = Math.max(...formattedData.map(item => item.price));
  const buffer = (maxPrice - minPrice) * 0.1; // 10% buffer
  
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
            domain={[minPrice - buffer, maxPrice + buffer]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value: number) => [formatCurrency(value), "Price"]}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F9FAFB" }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            name="Alpha Price"
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

export default PriceChart;
