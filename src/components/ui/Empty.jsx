import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No tasks yet", 
  description = "Start organizing your day by adding your first task.", 
  actionText = "Add Your First Task",
  onAction,
  icon = "CheckCircle2"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name={icon} className="w-10 h-10 text-primary-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-6">
            {description}
          </p>
        </div>
        
        {onAction && (
          <button
            onClick={onAction}
            className="btn-primary inline-flex items-center gap-2 text-lg px-6 py-3"
          >
            <ApperIcon name="Plus" className="w-5 h-5" />
            {actionText}
          </button>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm text-gray-500 max-w-lg">
        <div className="flex flex-col items-center gap-2">
          <ApperIcon name="Zap" className="w-5 h-5 text-accent-500" />
          <span>Quick Add</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ApperIcon name="Tag" className="w-5 h-5 text-primary-500" />
          <span>Categorize</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ApperIcon name="Target" className="w-5 h-5 text-success-500" />
          <span>Complete</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;