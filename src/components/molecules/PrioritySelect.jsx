import { useState } from 'react';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const PrioritySelect = ({ 
  value,
  onChange,
  className,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const priorities = [
    { value: 'high', label: 'High Priority', color: 'bg-error-500', icon: 'AlertTriangle' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-accent-500', icon: 'Minus' },
    { value: 'low', label: 'Low Priority', color: 'bg-success-500', icon: 'ArrowDown' }
  ];

  const selectedPriority = priorities.find(p => p.value === value) || priorities[1];

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-left border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        {...props}
      >
        <div className="flex items-center gap-2">
          <div className={cn("w-3 h-3 rounded-full", selectedPriority.color)}></div>
          <span className="text-sm">{selectedPriority.label}</span>
        </div>
        <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          {priorities.map((priority) => (
            <button
              key={priority.value}
              type="button"
              onClick={() => {
                onChange(priority.value);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              <div className={cn("w-3 h-3 rounded-full", priority.color)}></div>
              <span className="text-sm">{priority.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrioritySelect;