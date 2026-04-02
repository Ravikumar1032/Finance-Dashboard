// Developed by M. Ravikumar Naik

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'bordered' | 'gradient';
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  id?: string;
}

export function Card({
  children,
  className = '',
  variant = 'default',
  hover = false,
  padding = 'md',
  id,
}: CardProps) {
  const variants = {
    default: 'bg-white shadow-card border border-surface-200/40',
    glass: 'glass-card',
    bordered: 'bg-white border border-surface-200',
    gradient: 'bg-gradient-to-br from-white to-surface-50 shadow-card border border-surface-200/40',
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const hoverStyles = hover
    ? 'hover-lift cursor-pointer hover:border-iris-200/40'
    : '';

  return (
    <div
      id={id}
      className={`rounded-2xl ${paddings[padding]} ${variants[variant]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}