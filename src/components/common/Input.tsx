// Developed by M. Ravikumar Naik

import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, hint, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-navy-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300 group-focus-within:text-iris-500 transition-colors">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full rounded-xl border bg-white px-4 py-2.5
              text-navy-900 text-sm placeholder-navy-300
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-iris-500/15 focus:border-iris-400
              ${icon ? 'pl-10' : ''}
              ${error
                ? 'border-coral-400 focus:ring-coral-500/15 focus:border-coral-500'
                : 'border-surface-200 hover:border-navy-200'
              }
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-xs font-medium text-coral-600 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7 5a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0V5zm1 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="mt-1 text-xs text-navy-400">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';