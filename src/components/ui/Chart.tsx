import React from 'react';
import { cn } from '../../utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  title: string;
  data: ChartData[];
  type?: 'bar' | 'line' | 'pie' | 'doughnut';
  height?: number;
  className?: string;
  showLegend?: boolean;
  showTrend?: boolean;
}

export function Chart({
  title,
  data,
  type = 'bar',
  height = 300,
  className,
  showLegend = true,
  showTrend = true
}: ChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const maxValue = Math.max(...data.map(item => item.value));
  
  // Calculate trend (simple linear trend)
  const trend = (() => {
    if (data.length < 2) return { value: 0, type: 'neutral' as const };
    
    const values = data.map(item => item.value);
    const trendValue = ((values[values.length - 1] - values[0]) / values[0]) * 100;
    
    if (trendValue > 5) return { value: Math.abs(trendValue), type: 'positive' as const };
    if (trendValue < -5) return { value: Math.abs(trendValue), type: 'negative' as const };
    return { value: Math.abs(trendValue), type: 'neutral' as const };
  })();

  const getTrendIcon = () => {
    switch (trend.type) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    switch (trend.type) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={cn('bg-white rounded-2xl border border-gray-200 p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {showTrend && (
            <div className="flex items-center mt-1">
              {getTrendIcon()}
              <span className={cn('text-sm font-medium ml-1', getTrendColor())}>
                {trend.value.toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{total.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div 
        className="relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
        style={{ height }}
      >
        {/* Placeholder Chart Visualization */}
        <div className="absolute inset-0 flex items-end justify-center space-x-1 p-4">
          {data.map((item, index) => {
            const height = (item.value / maxValue) * 100;
            const color = item.color || `hsl(${(index * 137.5) % 360}, 70%, 60%)`;
            
            return (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t"
                style={{
                  height: `${Math.max(height, 10)}%`,
                  backgroundColor: color,
                  minHeight: '20px'
                }}
                title={`${item.label}: ${item.value.toLocaleString()}`}
              />
            );
          })}
        </div>
        
        {/* Chart Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-1 p-2 bg-white/80 backdrop-blur-sm">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-gray-600 font-medium">
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {data.map((item, index) => {
            const color = item.color || `hsl(${(index * 137.5) % 360}, 70%, 60%)`;
            const percentage = ((item.value / total) * 100).toFixed(1);
            
            return (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500">
                    {percentage}% • {item.value.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Simple Bar Chart
interface SimpleBarChartProps {
  data: { label: string; value: number }[];
  title?: string;
  height?: number;
  className?: string;
}

export function SimpleBarChart({ data, title, height = 200, className }: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-4', className)}>
      {title && (
        <h4 className="text-sm font-medium text-gray-700 mb-4">{title}</h4>
      )}
      
      <div className="space-y-3" style={{ height }}>
        {data.map((item, index) => {
          const width = (item.value / maxValue) * 100;
          const color = `hsl(${(index * 137.5) % 360}, 70%, 60%)`;
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-20 text-xs text-gray-600 truncate">
                {item.label}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${width}%`,
                    backgroundColor: color
                  }}
                />
              </div>
              <div className="w-16 text-xs text-gray-900 font-medium text-right">
                {item.value.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Progress Chart
interface ProgressChartProps {
  value: number;
  max: number;
  title: string;
  subtitle?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressChart({
  value,
  max,
  title,
  subtitle,
  color = '#3B82F6',
  size = 'md',
  className
}: ProgressChartProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-4', className)}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <span className="text-sm font-semibold text-gray-700">
          {value.toLocaleString()} / {max.toLocaleString()}
        </span>
      </div>
      
      <div className={cn('bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn('rounded-full transition-all duration-500', sizeClasses[size])}
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
      
      {subtitle && (
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
