
import { Card } from "@/components/ui/card";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  date: string;
  snippet: string;
}

interface NewsWidgetProps {
  news: NewsItem[];
}

const NewsWidget = ({ news }: NewsWidgetProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="space-y-4">
      {news.map((item) => (
        <Card key={item.id} className="p-4 hover:bg-muted/50 transition-colors">
          <h3 className="font-semibold mb-1">{item.title}</h3>
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>{item.source}</span>
            <span>{formatDate(item.date)}</span>
          </div>
          <p className="text-sm">{item.snippet}</p>
        </Card>
      ))}
    </div>
  );
};

export default NewsWidget;
