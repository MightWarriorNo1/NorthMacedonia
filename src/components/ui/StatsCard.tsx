import React from 'react';
import { cn } from '../../utils/cn';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon?: LucideIcon;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  variant = 'default',
  size = 'md',
  className
}: StatsCardProps) {
  const baseClasses = 'bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1';
  
  const variantClasses = {
    default: 'hover:border-gray-300',
    primary: 'hover:border-blue-300',
    success: 'hover:border-green-300',
    warning: 'hover:border-yellow-300',
    danger: 'hover:border-red-300',
    info: 'hover:border-cyan-300'
  };

  const iconClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconBgClasses = {
    default: 'bg-gray-100 text-gray-600',
    primary: 'bg-blue-100 text-blue-600',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    danger: 'bg-red-100 text-red-600',
    info: 'bg-cyan-100 text-cyan-600'
  };

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const valueSizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  return (
    <div className={cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className={cn('font-bold text-gray-900', valueSizeClasses[size])}>
            {value}
          </p>
          
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  'inline-flex items-center text-sm font-medium',
                  change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                )}
              >
                {change.type === 'increase' ? (
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 7z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L12 13z" clipRule="evenodd" />
                  </svg>
                )}
                {Math.abs(change.value)}%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs {change.period}</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={cn(
            'flex items-center justify-center rounded-xl',
            iconBgClasses[variant],
            iconClasses[size]
          )}>
            <Icon className="w-1/2 h-1/2" />
          </div>
        )}
      </div>
    </div>
  );
}

// Mini Stats Card variant
interface MiniStatsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function MiniStatsCard({
  title,
  value,
  icon: Icon,
  variant = 'default',
  className
}: MiniStatsCardProps) {
  const variantClasses = {
    default: 'bg-gray-50 text-gray-700',
    primary: 'bg-blue-50 text-blue-700',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-yellow-50 text-yellow-700',
    danger: 'bg-red-50 text-red-700',
    info: 'bg-cyan-50 text-cyan-700'
  };

  return (
    <div className={cn(
      'flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-gray-100',
      className
    )}>
      {Icon && (
        <div className={cn(
          'p-2 rounded-lg',
          variantClasses[variant]
        )}>
          <Icon className="w-4 h-4" />
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-lg font-semibold text-gray-700">{value}</p>
      </div>
    </div>
  );
}

// Metric Card variant
interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    type: 'positive' | 'negative' | 'neutral';
  };
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  className
}: MetricCardProps) {
  const trendColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const trendIcons = {
    positive: '↗',
    negative: '↘',
    neutral: '→'
  };

  return (
    <div className={cn(
      'bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow',
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {trend && (
          <span className={cn(
            'text-xs font-medium flex items-center',
            trendColors[trend.type]
          )}>
            {trendIcons[trend.type]} {trend.value}%
          </span>
        )}
      </div>
      
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      
      {subtitle && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}
