import React from "react";

const TaskFilter = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: "all", label: "All Tasks", count: taskCounts.all },
    { key: "pending", label: "Pending", count: taskCounts.pending },
    { key: "completed", label: "Completed", count: taskCounts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            currentFilter === key
              ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-purple-50 border border-purple-200"
          }`}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
