import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = forwardRef(({ 
  className,
  checked,
  onChange,
  disabled,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <div
        className={cn(
          "w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center",
          checked
            ? "bg-primary-500 border-primary-500"
            : "border-gray-300 hover:border-primary-400",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={() => !disabled && onChange && onChange({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon name="Check" className="w-3 h-3 text-white" />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;