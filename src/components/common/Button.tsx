// Developed by M. Ravikumar Naik

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center font-semibold rounded-xl
    transition-all duration-200 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
    active:scale-[0.97]
  `;

  const variants = {
    primary: `
      bg-gradient-to-b from-iris-500 to-iris-600 text-white
      hover:from-iris-600 hover:to-iris-700
      focus-visible:ring-iris-500
      shadow-sm hover:shadow-md hover:shadow-iris-500/20
    `,
    secondary: `
      bg-surface-100 text-navy-700
      hover:bg-surface-200
      focus-visible:ring-navy-400
    `,
    outline: `
      border-2 border-surface-200 text-navy-700
      hover:bg-surface-50 hover:border-navy-200
      focus-visible:ring-navy-400
    `,
    ghost: `
      text-navy-600
      hover:bg-surface-100 hover:text-navy-800
      focus-visible:ring-navy-400
    `,
    danger: `
      bg-gradient-to-b from-coral-500 to-coral-600 text-white
      hover:from-coral-600 hover:to-coral-700
      focus-visible:ring-coral-500
      shadow-sm hover:shadow-md hover:shadow-coral-500/20
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-sm gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        icon
      )}
      {children}
      {iconRight && !loading && iconRight}
    </button>
  );
}