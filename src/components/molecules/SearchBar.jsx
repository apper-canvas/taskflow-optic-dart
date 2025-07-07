import { useState } from 'react';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const SearchBar = ({ 
  placeholder = "Search tasks...",
  onSearch,
  className,
  ...props 
}) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onSearch) {
      onSearch(newValue);
    }
  };

  const handleClear = () => {
    setValue('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="w-4 h-4 text-gray-400" />
      </div>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-10 pr-10"
        {...props}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;