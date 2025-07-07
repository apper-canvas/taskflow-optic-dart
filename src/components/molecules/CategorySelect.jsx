import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';
import { categoryService } from '@/services/api/taskService';

const CategorySelect = ({ 
  value,
  onChange,
  className,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const selectedCategory = categories.find(c => c.name === value);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-left border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        {...props}
      >
        <div className="flex items-center gap-2">
          {selectedCategory && (
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedCategory.color }}
            ></div>
          )}
          <span className="text-sm capitalize">
            {selectedCategory ? selectedCategory.name : 'Select category'}
          </span>
        </div>
        <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          {categories.map((category) => (
            <button
              key={category.Id}
              type="button"
              onClick={() => {
                onChange(category.name);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="text-sm capitalize">{category.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelect;