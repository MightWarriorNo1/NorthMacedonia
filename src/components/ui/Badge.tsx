import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  className 
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-800'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  };

  return (
    <span className={cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      {children}
    </span>
  );
}

// Status Badge variant
interface StatusBadgeProps {
  status: 'online' | 'offline' | 'away' | 'busy';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const statusConfig = {
    online: {
      color: 'bg-green-400',
      text: 'Online'
    },
    offline: {
      color: 'bg-gray-400',
      text: 'Offline'
    },
    away: {
      color: 'bg-yellow-400',
      text: 'Away'
    },
    busy: {
      color: 'bg-red-400',
      text: 'Busy'
    }
  };

  const config = statusConfig[status];
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  };

  return (
    <span className={cn(
      'inline-flex items-center font-medium rounded-full text-white',
      config.color,
      sizeClasses[size],
      className
    )}>
      <span className={cn(
        'w-2 h-2 rounded-full mr-1.5',
        size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-2 h-2'
      )} />
      {config.text}
    </span>
  );
}

// Count Badge variant
interface CountBadgeProps {
  count: number;
  max?: number;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CountBadge({ 
  count, 
  max, 
  variant = 'default',
  size = 'md',
  className 
}: CountBadgeProps) {
  const displayCount = max && count > max ? `${max}+` : count.toString();
  
  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-full text-white';
  
  const variantClasses = {
    default: 'bg-gray-600',
    primary: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600'
  };

  const sizeClasses = {
    sm: 'w-5 h-5 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-8 h-8 text-base'
  };

  return (
    <span className={cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      {displayCount}
    </span>
  );
}
