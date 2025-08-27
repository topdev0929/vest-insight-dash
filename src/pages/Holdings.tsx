import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  holdingsData,
  getSectorAllocations,
  getPortfolioSummary,
} from "@/data/mockData";
import { formatCurrency, formatPercent, getSectorColor } from "@/utils";
import MetricCard from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PieChart as PieChartIcon,
  DollarSign,
  TrendingUp,
  Search,
  ArrowUpDown,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SortField =
  | "symbol"
  | "currentValue"
  | "totalReturnPercent"
  | "dayChangePercent"
  | "weight";
type SortDirection = "asc" | "desc";

const Holdings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("currentValue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const portfolioSummary = getPortfolioSummary();
  const sectorAllocations = getSectorAllocations();

  // Color palette for sector chart

  // Filter and sort holdings
  const filteredAndSortedHoldings = useMemo(() => {
    const filtered = holdingsData.filter(
      (holding) =>
        holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        holding.sector.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Portfolio Holdings
        </h1>
        <p className="mt-2 text-muted-foreground">
          Detailed breakdown of your current positions and sector allocations
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Portfolio Value"
          value={formatCurrency(portfolioSummary.currentValue)}
          change={portfolioSummary.dayChange}
          changePercent={portfolioSummary.dayChangePercent}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Return"
          value={formatCurrency(portfolioSummary.totalReturn)}
          changePercent={portfolioSummary.totalReturnPercent}
          icon={<TrendingUp className="h-4 w-4" />}
          valueClassName={
            portfolioSummary.totalReturn >= 0 ? "text-success" : "text-danger"
          }
        />
        <MetricCard
          title="Total Positions"
          value={holdingsData.length}
          subtitle="Active holdings"
          icon={<PieChartIcon className="h-4 w-4" />}
        />
        <MetricCard
          title="Largest Position"
          value={holdingsData[0]?.symbol || "N/A"}
          subtitle={`${holdingsData[0]?.weight.toFixed(1)}% of portfolio`}
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sector Allocation Chart */}
        <Card className="card-elevated lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-display">
              Sector Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorAllocations}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sectorAllocations.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getSectorColor(index)}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [
                      formatCurrency(value),
                      "Value",
                    ]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "calc(var(--radius) - 2px)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {sectorAllocations.map((sector, index) => (
                <div
                  key={sector.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="h-3 w-3 rounded-sm"
                      style={{
                        backgroundColor: getSectorColor(index),
                      }}
                    />
                    <span className="truncate">{sector.name}</span>
                  </div>
                  <span className="font-mono text-muted-foreground">
                    {sector.percentage.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Holdings Table */}
        <Card className="card-elevated lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-display">
                Individual Holdings
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search holdings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer hover:text-foreground"
                      onClick={() => handleSort("symbol")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Symbol</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead
                      className="cursor-pointer hover:text-foreground text-right"
                      onClick={() => handleSort("currentValue")}
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Value</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:text-foreground text-right"
                      onClick={() => handleSort("totalReturnPercent")}
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Total Return</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:text-foreground text-right"
                      onClick={() => handleSort("dayChangePercent")}
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Day Change</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:text-foreground text-right"
                      onClick={() => handleSort("weight")}
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Weight</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedHoldings.map((holding) => (
                    <TableRow
                      key={holding.symbol}
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="font-mono font-semibold">
                        {holding.symbol}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium truncate max-w-[200px]">
                            {holding.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {holding.shares.toLocaleString()} shares @{" "}
                            {formatCurrency(holding.currentPrice)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {holding.sector}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(holding.currentValue)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className={cn(
                            "font-mono",
                            holding.totalReturnPercent >= 0
                              ? "text-success"
                              : "text-danger"
                          )}
                        >
                          {formatPercent(holding.totalReturnPercent)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(holding.totalReturn)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className={cn(
                            "font-mono",
                            holding.dayChangePercent >= 0
                              ? "text-success"
                              : "text-danger"
                          )}
                        >
                          {formatPercent(holding.dayChangePercent)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(holding.dayChange * holding.shares)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {holding.weight.toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Holdings;
