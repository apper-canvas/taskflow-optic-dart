import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(({ 
  type = 'text',
  variant = 'default',
  size = 'md',
  className,
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full rounded-lg border transition-all duration-150 focus:outline-none focus:ring-2";
  
  const variants = {
    default: "border-gray-200 focus:ring-primary-500 focus:border-transparent",
    filled: "bg-gray-50 border-gray-200 focus:bg-white focus:ring-primary-500",
    error: "border-error-300 focus:ring-error-500 focus:border-transparent"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base"
  };

  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        baseStyles,
        variants[error ? 'error' : variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;