import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import FormField from "@/components/molecules/FormField";
import PrioritySelect from "@/components/molecules/PrioritySelect";
import CategorySelect from "@/components/molecules/CategorySelect";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";

const QuickAddTask = ({ onTaskAdded }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'personal',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    try {
      setLoading(true);
      await taskService.create(formData);
      
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: 'personal',
        dueDate: new Date().toISOString().split('T')[0]
      });
      
      setIsExpanded(false);
      toast.success('Task added successfully! 🎉');
      
      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      toast.error('Failed to add task');
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdd = async (e) => {
    if (e.key === 'Enter' && !isExpanded) {
      e.preventDefault();
      if (formData.title.trim()) {
        await handleSubmit(e);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-4 mb-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <Input
            placeholder="What needs to be done?"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onKeyDown={handleQuickAdd}
            onFocus={() => setIsExpanded(true)}
            className="flex-1"
          />
          
          {isExpanded ? (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => setIsExpanded(false)}
              >
                <ApperIcon name="X" className="w-4 h-4" />
              </Button>
              <Button
                type="submit"
                disabled={loading || !formData.title.trim()}
                className="shrink-0"
              >
                {loading ? (
                  <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                ) : (
                  <ApperIcon name="Plus" className="w-4 h-4" />
                )}
                Add Task
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="accent"
              size="md"
              onClick={() => setIsExpanded(true)}
              className="shrink-0"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              Add
            </Button>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <FormField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add more details..."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Priority">
                  <PrioritySelect
                    value={formData.priority}
                    onChange={(priority) => setFormData({ ...formData, priority })}
                  />
                </FormField>

                <FormField label="Category">
                  <CategorySelect
                    value={formData.category}
                    onChange={(category) => setFormData({ ...formData, category })}
                  />
                </FormField>

                <FormField
                  label="Due Date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default QuickAddTask;