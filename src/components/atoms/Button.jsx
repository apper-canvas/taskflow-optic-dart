import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Button = forwardRef(({ 
  variant = 'primary', 
  size = 'md', 
  className,
  disabled,
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md",
    secondary: "bg-white text-primary-600 border border-primary-200 hover:bg-primary-50 shadow-sm hover:shadow-md",
    accent: "bg-accent-500 text-white hover:bg-accent-600 shadow-sm hover:shadow-md",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
    danger: "bg-error-500 text-white hover:bg-error-600 shadow-sm hover:shadow-md",
    success: "bg-success-500 text-white hover:bg-success-600 shadow-sm hover:shadow-md"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;