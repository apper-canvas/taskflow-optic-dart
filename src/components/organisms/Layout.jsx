import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import CategorySidebar from './CategorySidebar';
import ApperIcon from '@/components/ApperIcon';

const Layout = ({ children, onSearch, onAddTask }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsMobileMenuOpen(false);
  };

  const handleToggleView = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={onSearch}
        onAddTask={onAddTask}
        onToggleView={handleToggleView}
        showCompleted={showCompleted}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            showCompleted={showCompleted}
            onToggleView={handleToggleView}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden fixed bottom-4 right-4 z-50 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <ApperIcon name="Menu" className="w-6 h-6" />
        </button>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="absolute left-0 top-0 h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <CategorySidebar
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                showCompleted={showCompleted}
                onToggleView={handleToggleView}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {children({ 
              selectedCategory, 
              showCompleted,
              onCategorySelect: handleCategorySelect,
              onToggleView: handleToggleView
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;