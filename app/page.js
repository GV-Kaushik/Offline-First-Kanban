"use client";

import { useEffect, useState } from "react";
import Column from "../components/Column";
import { saveTasks, loadTasks } from "../lib/db";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [online, setOnline] = useState(null);

  useEffect(() => {
    setMounted(true);

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
    loadTasks().then(setTasks);
  }, []);


  useEffect(() => {
    if (mounted) saveTasks(tasks);
  }, [tasks, mounted]);

  if (!mounted) return null; 

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

  function moveTask(id, newStatus) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
        Kanban Board
      </h1>

      {online !== null && (
        <p className="text-center mb-4">
          <span
            className={`inline-flex items-center gap-2 font-medium ${
              online ? "text-green-500" : "text-red-500"
            }`}
          >
            ● {online ? "Online" : "Offline"}
          </span>
        </p>
      )}

  
      <div className="flex justify-center gap-2 mb-6">
        <input
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          placeholder="Enter task..."
          className="
            w-72 px-3 py-2 rounded-md border
            bg-white text-black
            dark:bg-gray-800 dark:text-white dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
        <button
          onClick={addTask}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

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
          status="in-progress"
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
