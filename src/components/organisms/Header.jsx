import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Header = ({ 
  onSearch,
  onAddTask,
  onToggleView,
  showCompleted = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 sticky top-0 z-40"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="Zap" className="w-4 h-4 text-accent-500" />
              <span>Stay organized, stay productive</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <SearchBar
                placeholder="Search tasks..."
                onSearch={handleSearch}
                className="w-64"
              />
            </div>

            <Button
              variant="ghost"
              size="md"
              onClick={onToggleView}
              className="hidden md:flex"
            >
              <ApperIcon 
                name={showCompleted ? "Clock" : "CheckCircle2"} 
                className="w-4 h-4" 
              />
              {showCompleted ? 'Show Pending' : 'Show Completed'}
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={onAddTask}
              className="shrink-0"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span className="hidden sm:inline">Add Task</span>
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4">
          <SearchBar
            placeholder="Search tasks..."
            onSearch={handleSearch}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;