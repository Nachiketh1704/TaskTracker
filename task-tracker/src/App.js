import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import {
  saveUser,
  getUser,
  clearUser,
  saveTasks,
  initializeSampleData,
} from "./utils/localStorage";

// Performance optimization: Memoize components
const MemoizedTaskList = React.memo(TaskList);
const MemoizedTaskFilter = React.memo(TaskFilter);

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Initialize app on mount
  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
      const savedTasks = initializeSampleData();
      setTasks(savedTasks);
    }
    setLoading(false);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (user && tasks.length >= 0) {
      saveTasks(tasks);
    }
  }, [tasks, user]);

  const handleLogin = (username) => {
    setUser(username);
    saveUser(username);
    const savedTasks = initializeSampleData();
    setTasks(savedTasks);
  };

  const handleLogout = () => {
    setUser(null);
    clearUser();
    setTasks([]);
  };

  const handleAddTask = useCallback((taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const handleToggleComplete = useCallback((taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleDeleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }, []);

  const handleEditTask = useCallback((taskId, updates) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  }, []);

  const getFilteredTasks = () => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const getTaskCounts = () => {
    return {
      all: tasks.length,
      pending: tasks.filter((task) => !task.completed).length,
      completed: tasks.filter((task) => task.completed).length,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center fade-in">
          <div className="loading-spinner rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-8 fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Task Tracker</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-6">
          {/* Task Form */}
          <TaskForm onAddTask={handleAddTask} />

          {/* Task Filter */}
          <MemoizedTaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={getTaskCounts()}
          />

          {/* Task List */}
          <MemoizedTaskList
            tasks={getFilteredTasks()}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500">
          <p>© 2024 Task Tracker - Built with React</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
