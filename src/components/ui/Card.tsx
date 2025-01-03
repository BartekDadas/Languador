import { ComponentProps } from 'react';
import clsx from 'clsx';

interface CardProps extends ComponentProps<'div'> {
  title?: string;
}

export function Card({ title, children, className, ...props }: CardProps) {
  return (
    <div 
      className={clsx(
        'bg-white rounded-lg shadow-md overflow-hidden',
        className
      )}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}