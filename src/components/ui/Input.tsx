import { ComponentProps, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-3 py-2 border rounded-md text-gray-900 bg-white',
            'focus:ring-2 focus:ring-primary focus:border-primary',
            'placeholder:text-gray-400',
            {
              'border-red-300': error,
              'border-gray-300': !error,
            },
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';