import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskItem from '@/components/molecules/TaskItem';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { taskService, categoryService } from '@/services/api/taskService';

const TaskList = ({ 
  searchQuery = '',
  categoryFilter = '',
  showCompleted = false,
  onTaskSelect,
  refreshTrigger = 0
}) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await taskService.update(taskId, { completed });
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.Id === taskId ? { ...task, completed } : task
        )
      );
      
      if (completed) {
        toast.success('Task completed! 🎉');
      } else {
        toast.info('Task reopened');
      }
    } catch (error) {
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskService.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.Id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !categoryFilter || task.category === categoryFilter;
    
    const matchesCompletion = showCompleted ? task.completed : !task.completed;
    
    return matchesSearch && matchesCategory && matchesCompletion;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Sort by priority (high -> medium -> low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by due date
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  if (sortedTasks.length === 0) {
    if (searchQuery) {
      return (
        <Empty
          title="No tasks found"
          description={`No tasks match your search for "${searchQuery}"`}
          actionText="Clear Search"
          onAction={() => window.location.reload()}
          icon="Search"
        />
      );
    }
    
    if (categoryFilter) {
      return (
        <Empty
          title="No tasks in this category"
          description={`No tasks found in the "${categoryFilter}" category`}
          actionText="Add Task"
          onAction={() => onTaskSelect && onTaskSelect()}
          icon="FolderOpen"
        />
      );
    }
    
    if (showCompleted) {
      return (
        <Empty
          title="No completed tasks"
          description="Complete some tasks to see them here"
          actionText="View Pending Tasks"
          onAction={() => window.location.reload()}
          icon="CheckCircle"
        />
      );
    }
    
    return (
      <Empty
        title="No tasks yet"
        description="Start organizing your day by adding your first task"
        actionText="Add Your First Task"
        onAction={() => onTaskSelect && onTaskSelect()}
        icon="ListTodo"
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {showCompleted ? 'Completed Tasks' : 'Pending Tasks'} ({sortedTasks.length})
        </h2>
      </div>

      <AnimatePresence mode="popLayout">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.Id}
            task={task}
            categories={categories}
            onToggleComplete={handleToggleComplete}
            onEdit={onTaskSelect}
            onDelete={handleDeleteTask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;