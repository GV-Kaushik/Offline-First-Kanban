"use client";
import { useState } from "react";
import Column from "../components/Column";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

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

  return (
    <div className="p-6">
      {/* BIG TITLE */}
      <h1 className="text-4xl font-bold text-center mb-6">
        Kanban Board
      </h1>

      {/* ADD TASK */}
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

      {/* BOARD */}
      <div className="grid grid-cols-3 gap-4">
        <Column title="TODO" status="todo" tasks={tasks} moveTask={moveTask} deleteTask={deleteTask} />
        <Column title="IN PROGRESS" status="in progress" tasks={tasks} moveTask={moveTask} deleteTask={deleteTask} />
        <Column title="DONE" status="done" tasks={tasks} moveTask={moveTask} deleteTask={deleteTask} />
      </div>
    </div>
  );
}
