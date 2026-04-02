// Developed by M. Ravikumar Naik

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info' | 'iris';
  size?: 'sm' | 'md';
  dot?: boolean;
  id?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', dot = false, id }: BadgeProps) {
  const variants = {
    default: 'bg-surface-100 text-navy-600',
    success: 'bg-mint-50 text-mint-700',
    danger: 'bg-coral-50 text-coral-700',
    warning: 'bg-amber-50 text-amber-700',
    info: 'bg-sky-50 text-sky-700',
    iris: 'bg-iris-50 text-iris-700',
  };

  const dotColors = {
    default: 'bg-navy-400',
    success: 'bg-mint-500',
    danger: 'bg-coral-500',
    warning: 'bg-amber-500',
    info: 'bg-sky-500',
    iris: 'bg-iris-500',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[11px]',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span
      id={id}
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-full tracking-wide uppercase
        ${variants[variant]} ${sizes[size]}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse-slow`} />
      )}
      {children}
    </span>
  );
}