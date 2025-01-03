import { ComponentProps } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface ButtonProps extends ComponentProps<'button'> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  as?: any; // For polymorphic components
}

export function Button({ 
  children, 
  loading, 
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  as: Component = 'button',
  ...props 
}: ButtonProps) {
  return (
    <Component
      disabled={loading || disabled}
      className={clsx(
        'inline-flex items-center justify-center font-medium rounded-md transition-colors',
        {
          'bg-yellow-400 text-primary-dark hover:bg-yellow-300': variant === 'primary',
          'bg-primary text-white hover:bg-primary-dark': variant === 'secondary',
          'border-2 border-current bg-transparent': variant === 'outline',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
          'opacity-50 cursor-not-allowed': loading || disabled,
        },
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Component>
  );
}