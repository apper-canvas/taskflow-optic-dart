import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
        <div className="h-10 w-32 bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg"></div>
      </div>

      {/* Quick add bar skeleton */}
      <div className="card p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 flex-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg"></div>
          <div className="h-10 w-24 bg-gradient-to-r from-accent-100 to-accent-200 rounded-lg"></div>
        </div>
      </div>

      {/* Task list skeleton */}
      <div className="space-y-3">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="card p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded mt-1"></div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full"></div>
                </div>
                <div className="h-4 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded"></div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-6 w-16 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full"></div>
                  <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;