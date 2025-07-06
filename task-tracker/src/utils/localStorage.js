const STORAGE_KEYS = {
  USERNAME: "taskTracker_username",
  TASKS: "taskTracker_tasks",
};

export const saveUser = (username) => {
  localStorage.setItem(STORAGE_KEYS.USERNAME, username);
};

export const getUser = () => {
  return localStorage.getItem(STORAGE_KEYS.USERNAME);
};

export const clearUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USERNAME);
};

export const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
};

export const getTasks = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error parsing tasks from localStorage:", error);
    return [];
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
