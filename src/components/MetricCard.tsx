import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changePercent?: number;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  valueClassName?: string;
}

const MetricCard = ({
  title,
  value,
  change,
  changePercent,
  subtitle,
  icon,
  className,
  valueClassName
}: MetricCardProps) => {
  const formatChange = (changeValue: number, isPercent = false) => {
    const prefix = changeValue >= 0 ? '+' : '';
    const suffix = isPercent ? '%' : '';
    return `${prefix}${changeValue.toFixed(2)}${suffix}`;
  };

  const getChangeColor = (changeValue?: number) => {
    if (changeValue === undefined) return '';
    return changeValue >= 0 ? 'text-success' : 'text-danger';
  };

  return (
    <Card className={cn('card-elevated transition-all duration-200 hover:shadow-lg', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className={cn('text-2xl font-bold font-mono', valueClassName)}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {(change !== undefined || changePercent !== undefined || subtitle) && (
          <div className="mt-1 flex items-center space-x-2 text-xs">
            {change !== undefined && (
              <span className={cn('font-mono', getChangeColor(change))}>
                {formatChange(change)}
              </span>
            )}
            {changePercent !== undefined && (
              <span className={cn('font-mono', getChangeColor(changePercent))}>
                ({formatChange(changePercent, true)})
              </span>
            )}
            {subtitle && (
              <span className="text-muted-foreground">{subtitle}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;