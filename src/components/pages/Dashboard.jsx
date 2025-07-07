import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/organisms/Layout';
import QuickAddTask from '@/components/organisms/QuickAddTask';
import TaskList from '@/components/organisms/TaskList';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddTask = () => {
    // Focus on the quick add input
    const input = document.querySelector('input[placeholder="What needs to be done?"]');
    if (input) {
      input.focus();
    }
  };

  const handleTaskAdded = () => {
    // Trigger refresh of task list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Layout onSearch={handleSearch} onAddTask={handleAddTask}>
      {({ selectedCategory, showCompleted, onCategorySelect, onToggleView }) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedCategory ? `${selectedCategory} Tasks` : 'All Tasks'}
              </h1>
              <p className="text-gray-600 mt-1">
                {showCompleted 
                  ? 'Review your completed tasks' 
                  : 'Stay organized and productive'
                }
              </p>
            </div>
          </div>

          {!showCompleted && (
            <QuickAddTask onTaskAdded={handleTaskAdded} />
          )}

          <TaskList
            searchQuery={searchQuery}
            categoryFilter={selectedCategory}
            showCompleted={showCompleted}
            onTaskSelect={handleAddTask}
            refreshTrigger={refreshTrigger}
          />
        </motion.div>
      )}
    </Layout>
  );
};

export default Dashboard;