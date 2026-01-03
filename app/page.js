"use client";
import { useState, useEffect } from "react";
import Column from "../components/Column";
import { saveTasks, loadTasks } from "../lib/db";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  // Load tasks from IndexedDB on first load
  useEffect(() => {
    async function fetchTasks() {
      const storedTasks = await loadTasks();
      setTasks(storedTasks);
    }
    fetchTasks();
  }, []);

  // Save tasks to IndexedDB whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Online / Offline detection + sync
  useEffect(() => {
    setIsOnline(navigator.onLine);

    function handleOnline() {
      setIsOnline(true);
      syncToServer(tasks);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [tasks]);

  // Register Service Worker (PWA)
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker registered"))
        .catch(err => console.error("SW registration failed", err));
    }
  }, []);

  function addTask() {
    if (taskTitle.trim() === "") return;

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

  async function syncToServer(tasks) {
    if (!navigator.onLine) return;

    try {
      await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tasks),
      });

      console.log("Tasks synced to server");
    } catch (error) {
      console.error("Failed to sync tasks", error);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-2">
        Kanban Board
      </h1>

      <p
        className={`text-center mb-4 font-semibold ${
          isOnline ? "text-green-600" : "text-red-600"
        }`}
      >
        {isOnline ? "🟢 Online" : "🔴 Offline"}
      </p>

      <div className="mb-6 flex justify-center gap-2">
        <input
          type="text"
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          placeholder="Enter task..."
          className="border p-2 rounded w-64"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Column title="TODO" status="todo" tasks={tasks} moveTask={moveTask} deleteTask={deleteTask} />
        <Column title="IN PROGRESS" status="in progress" tasks={tasks} moveTask={moveTask} deleteTask={deleteTask} />
        <Column title="DONE" status="done" tasks={tasks} moveTask={moveTask} deleteTask={deleteTask} />
      </div>
    </div>
  );
}
