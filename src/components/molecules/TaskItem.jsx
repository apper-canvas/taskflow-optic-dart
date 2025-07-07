import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Checkbox from '@/components/atoms/Checkbox';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const TaskItem = ({ 
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  categories = []
}) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    try {
      await onToggleComplete(task.Id, !task.completed);
    } catch (error) {
      console.error('Error toggling task completion:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const category = categories.find(c => c.name === task.category);
  const isOverdue = !task.completed && new Date(task.dueDate) < new Date();

  const priorityConfig = {
    high: { color: 'bg-error-500', pulse: 'animate-pulse-soft' },
    medium: { color: 'bg-accent-500', pulse: '' },
    low: { color: 'bg-success-500', pulse: '' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "card p-4 transition-all duration-300",
        task.completed && "opacity-70 bg-gray-50",
        isCompleting && "scale-95"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={isCompleting}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={cn(
              "font-medium text-gray-900",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            <div className={cn(
              "w-3 h-3 rounded-full",
              priorityConfig[task.priority].color,
              priorityConfig[task.priority].pulse
            )}></div>
          </div>

          {task.description && (
            <p className={cn(
              "text-sm text-gray-600 mb-3",
              task.completed && "text-gray-400"
            )}>
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-sm">
            {category && (
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  backgroundColor: category.color + '20',
                  color: category.color,
                  borderColor: category.color + '40'
                }}
              >
                {category.name}
              </Badge>
            )}

            <div className={cn(
              "flex items-center gap-1",
              isOverdue && !task.completed && "text-error-500"
            )}>
              <ApperIcon name="Calendar" className="w-4 h-4" />
              <span>
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </span>
            </div>

            {isOverdue && !task.completed && (
              <Badge variant="error" size="sm">
                Overdue
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <ApperIcon name="Edit2" className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.Id)}
            className="p-1 text-gray-400 hover:text-error-500 rounded"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;