import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-error-100 to-error-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="AlertCircle" className="w-8 h-8 text-error-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-6">
            {message || "We're having trouble loading your tasks. Please try again."}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn-primary inline-flex items-center gap-2"
            >
              <ApperIcon name="RotateCcw" className="w-4 h-4" />
              Try Again
            </button>
          )}
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            Refresh Page
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>If the problem persists, please check your internet connection.</p>
      </div>
    </motion.div>
  );
};

export default Error;