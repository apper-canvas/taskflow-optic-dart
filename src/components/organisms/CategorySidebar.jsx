import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { categoryService } from '@/services/api/taskService';
import { cn } from '@/utils/cn';

const CategorySidebar = ({ 
  selectedCategory,
  onCategorySelect,
  showCompleted = false,
  onToggleView
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: 'List',
      count: categories.reduce((sum, cat) => sum + cat.taskCount, 0)
    },
    {
      id: 'today',
      label: 'Due Today',
      icon: 'Calendar',
      count: 0
    },
    {
      id: 'high-priority',
      label: 'High Priority',
      icon: 'AlertTriangle',
      count: 0
    }
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Quick Actions
          </h3>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onCategorySelect(item.id === 'all' ? '' : item.id)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-150",
                selectedCategory === (item.id === 'all' ? '' : item.id)
                  ? "bg-primary-50 text-primary-700 border border-primary-200"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-3">
                <ApperIcon name={item.icon} className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count > 0 && (
                <Badge variant="secondary" size="sm">
                  {item.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Categories
          </h3>
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <button
                key={category.Id}
                onClick={() => onCategorySelect(category.name)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-150",
                  selectedCategory === category.name
                    ? "bg-primary-50 text-primary-700 border border-primary-200"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="font-medium capitalize">{category.name}</span>
                </div>
                {category.taskCount > 0 && (
                  <Badge variant="secondary" size="sm">
                    {category.taskCount}
                  </Badge>
                )}
              </button>
            ))
          )}
        </div>

        {/* View Toggle */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={onToggleView}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-150 text-gray-700 hover:bg-gray-50"
          >
            <ApperIcon 
              name={showCompleted ? "Clock" : "CheckCircle2"} 
              className="w-4 h-4" 
            />
            <span className="font-medium">
              {showCompleted ? 'Show Pending' : 'Show Completed'}
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4">
          <h4 className="font-semibold text-primary-800 mb-2">Today's Progress</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-primary-600">Completed</span>
              <span className="font-medium text-primary-800">3 tasks</span>
            </div>
            <div className="w-full bg-primary-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full w-3/4"></div>
            </div>
            <p className="text-xs text-primary-600 mt-2">
              Great job! You're 75% done for today.
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default CategorySidebar;