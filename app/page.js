"use client";

import { useEffect, useState } from "react";
import Column from "../components/Column";
import { saveTasks, loadTasks } from "../lib/db";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [online, setOnline] = useState(true);

  useEffect(() => {
    loadTasks().then(setTasks);

    const updateStatus = () => setOnline(navigator.onLine);
    updateStatus();

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask() {
    if (!taskTitle.trim()) return;

    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        title: taskTitle,
        status: "todo",
      },
    ]);
    setTaskTitle("");
  }

  function moveTask(id, status) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, status } : t))
    );
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-2">
        Kanban Board
      </h1>

      <p className="text-center mb-4">
        <span
          className={`inline-flex items-center gap-2 font-medium ${
            online ? "text-green-500" : "text-red-500"
          }`}
        >
          ● {online ? "Online" : "Offline"}
        </span>
      </p>

      {/* Input */}
      <div className="flex justify-center gap-2 mb-6">
        <input
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          placeholder="Enter task..."
          className="w-72 px-3 py-2 rounded-md border
                     bg-white text-black
                     dark:bg-gray-800 dark:text-white
                     dark:border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500 "
        />
        <button
          onClick={addTask}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Column
          title="TODO"
          status="todo"
          tasks={tasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
        <Column
          title="IN PROGRESS"
          status="progress"
          tasks={tasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
        <Column
          title="DONE"
          status="done"
          tasks={tasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
