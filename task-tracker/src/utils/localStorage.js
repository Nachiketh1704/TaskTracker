const STORAGE_KEYS = {
  USERNAME: "taskTracker_username",
  TASKS: "taskTracker_tasks",
};

const isLocalStorageAvailable = () => {
  try {
    const testKey = "__localStorage_test__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn("localStorage is not available:", e);
    return false;
  }
};

export const saveUser = (username) => {
  if (isLocalStorageAvailable()) {
    try {
      localStorage.setItem(STORAGE_KEYS.USERNAME, username);
    } catch (error) {
      console.error("Failed to save user to localStorage:", error);
    }
  }
};

export const getUser = () => {
  if (isLocalStorageAvailable()) {
    try {
      return localStorage.getItem(STORAGE_KEYS.USERNAME);
    } catch (error) {
      console.error("Failed to get user from localStorage:", error);
      return null;
    }
  }
  return null;
};

export const clearUser = () => {
  if (isLocalStorageAvailable()) {
    try {
      localStorage.removeItem(STORAGE_KEYS.USERNAME);
    } catch (error) {
      console.error("Failed to clear user from localStorage:", error);
    }
  }
};

export const saveTasks = (tasks) => {
  if (isLocalStorageAvailable()) {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }
};

export const getTasks = () => {
  if (isLocalStorageAvailable()) {
    try {
      const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      return [];
    }
  }
  return [];
};

export const clearTasks = () => {
  if (isLocalStorageAvailable()) {
    try {
      localStorage.removeItem(STORAGE_KEYS.TASKS);
    } catch (error) {
      console.error("Failed to clear tasks from localStorage:", error);
    }
  }
};

export const sampleTasks = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application",
    completed: false,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features",
    completed: true,
    createdAt: "2024-01-14T15:30:00Z",
  },
];

export const initializeSampleData = () => {
  const existingTasks = getTasks();
  if (existingTasks.length === 0) {
    saveTasks(sampleTasks);
    return sampleTasks;
  }
  return existingTasks;
};
