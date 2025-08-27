import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { performanceData, getPortfolioSummary } from "@/data/mockData";
import MetricCard from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Target, Activity } from "lucide-react";
import { formatCurrency, formatPercent } from "@/utils";
import { useMemo } from "react";

const Performance = () => {
  const [timeRange, setTimeRange] = useState<"3M" | "6M" | "1Y" | "ALL">("ALL");
  const portfolioSummary = getPortfolioSummary();

  // Filter data based on time range
  const filteredData = useMemo(() => {
    if (timeRange === "ALL") {
      return performanceData;
    }

    let monthsBack = 0;
    switch (timeRange) {
      case "3M":
        monthsBack = 3;
        break;
      case "6M":
        monthsBack = 6;
        break;
      case "1Y":
        monthsBack = 12;
        break;
      default:
        return performanceData;
    }

    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - monthsBack);
    cutoffDate.setHours(0, 0, 0, 0);

    return performanceData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  }, [timeRange, performanceData]);

  // Calculate performance metrics
  const latestData = performanceData[performanceData.length - 1];
  const initialData = performanceData[0];
  const portfolioReturn =
    ((latestData.portfolioValue - initialData.portfolioValue) /
      initialData.portfolioValue) *
    100;
  const sp500Return =
    ((latestData.benchmarkSP500 - initialData.benchmarkSP500) /
      initialData.benchmarkSP500) *
    100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Portfolio Performance
        </h1>
        <p className="mt-2 text-muted-foreground">
          Track your portfolio's performance against major market benchmarks
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Portfolio Value"
          value={formatCurrency(latestData.portfolioValue)}
          change={portfolioSummary.dayChange}
          changePercent={portfolioSummary.dayChangePercent}
          icon={<DollarSign className="h-4 w-4" />}
          className="col-span-2 md:col-span-1"
        />
        <MetricCard
          title="Total Return"
          value={formatPercent(portfolioReturn)}
          subtitle="Since inception"
          icon={<TrendingUp className="h-4 w-4" />}
          valueClassName={portfolioReturn >= 0 ? "text-success" : "text-danger"}
        />
        <MetricCard
          title="vs S&P 500"
          value={formatPercent(portfolioReturn - sp500Return)}
          subtitle="Outperformance"
          icon={<Target className="h-4 w-4" />}
          valueClassName={
            portfolioReturn - sp500Return >= 0 ? "text-success" : "text-danger"
          }
        />
        <MetricCard
          title="Volatility"
          value="14.2%"
          subtitle="Annualized"
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      {/* Performance Chart */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display">
              Performance Comparison
            </CardTitle>
            <div className="flex space-x-2">
              {(["3M", "6M", "1Y", "ALL"] as const).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className="h-8 px-3 text-xs"
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      year: "2-digit",
                    })
                  }
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "calc(var(--radius) - 2px)",
                  }}
                  formatter={(value: number, name: string) => [
                    formatCurrency(value),
                    name
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase()),
                  ]}
                  labelFormatter={(label) =>
                    new Date(label).toLocaleDateString()
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="portfolioValue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  name="Portfolio"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="benchmarkSP500"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="S&P 500"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="benchmarkRussell2000"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  name="Russell 2000"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="benchmarkMSCIWorld"
                  stroke="hsl(var(--secondary-foreground))"
                  strokeWidth={2}
                  strokeDasharray="1 1"
                  name="MSCI World"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Market Events Timeline */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg font-display">
            Key Market Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData
              .filter(
                (item) => item.marketEvents && item.marketEvents.length > 0
              )
              .map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.marketEvents
                        ?.map((event) =>
                          event
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())
                        )
                        .join(", ")}
                    </div>
                  </div>
                  <div className="text-sm font-mono text-muted-foreground">
                    {formatCurrency(item.portfolioValue)}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Performance;
