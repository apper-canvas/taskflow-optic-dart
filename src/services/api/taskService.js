import tasksData from '../mockData/tasks.json';
import categoriesData from '../mockData/categories.json';

let tasks = [...tasksData];
let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error('Task not found');
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(400);
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    
    // Update category task count
    const category = categories.find(c => c.name === taskData.category);
    if (category) {
      category.taskCount++;
    }
    
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(300);
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const oldTask = tasks[taskIndex];
    const updatedTask = { ...oldTask, ...updates };
    
    // Handle completion
    if (updates.completed !== undefined) {
      updatedTask.completedAt = updates.completed ? new Date().toISOString() : null;
    }
    
    // Handle category change
    if (updates.category && updates.category !== oldTask.category) {
      const oldCategory = categories.find(c => c.name === oldTask.category);
      const newCategory = categories.find(c => c.name === updates.category);
      if (oldCategory) oldCategory.taskCount--;
      if (newCategory) newCategory.taskCount++;
    }
    
    tasks[taskIndex] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(250);
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    
    // Update category task count
    const category = categories.find(c => c.name === deletedTask.category);
    if (category) {
      category.taskCount--;
    }
    
    return { ...deletedTask };
  },

  async getByCategory(categoryName) {
    await delay(300);
    return tasks.filter(t => t.category === categoryName).map(t => ({ ...t }));
  },

  async getByPriority(priority) {
    await delay(300);
    return tasks.filter(t => t.priority === priority).map(t => ({ ...t }));
  },

  async search(query) {
    await delay(300);
    const searchTerm = query.toLowerCase();
    return tasks.filter(t => 
      t.title.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm)
    ).map(t => ({ ...t }));
  },

  async getCompleted() {
    await delay(300);
    return tasks.filter(t => t.completed).map(t => ({ ...t }));
  },

  async getPending() {
    await delay(300);
    return tasks.filter(t => !t.completed).map(t => ({ ...t }));
  }
};

export const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(200);
    const category = categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(300);
    const newCategory = {
      ...categoryData,
      Id: Math.max(...categories.map(c => c.Id)) + 1,
      taskCount: 0
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updates) {
    await delay(300);
    const categoryIndex = categories.findIndex(c => c.Id === parseInt(id));
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
    
    const updatedCategory = { ...categories[categoryIndex], ...updates };
    categories[categoryIndex] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay(250);
    const categoryIndex = categories.findIndex(c => c.Id === parseInt(id));
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
    
    const deletedCategory = categories[categoryIndex];
    categories.splice(categoryIndex, 1);
    return { ...deletedCategory };
  }
};