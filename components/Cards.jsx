"use client";

const Cards = ({ task, moveTask, deleteTask }) => {
  return (
    <div
      className="
        p-3 rounded shadow
        bg-white text-gray-900
        dark:bg-gray-700 dark:text-gray-100
      "
    >
      <p className="mb-2 break-words whitespace-pre-wrap">
        {task.title}
      </p>

      {task.status === "todo" && (
        <button
          onClick={() => moveTask(task.id, "in progress")}
          className="
            bg-yellow-500 hover:bg-yellow-600
            text-white px-2 py-1 rounded text-sm
          "
        >
          Start Task
        </button>
      )}

      {task.status === "in progress" && (
        <button
          onClick={() => moveTask(task.id, "done")}
          className="
            bg-green-500 hover:bg-green-600
            text-white px-2 py-1 rounded text-sm
          "
        >
          Mark Done
        </button>
      )}

      {task.status === "done" && (
        <button
          onClick={() => deleteTask(task.id)}
          className="
            bg-red-500 hover:bg-red-600
            text-white px-2 py-1 rounded text-sm
          "
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Cards;
