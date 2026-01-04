import Cards from "./Cards";

const Column = ({ title, status, tasks, moveTask, deleteTask }) => {
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div
      className="
        rounded-md p-3 h-[85vh] flex flex-col
        bg-gray-200 text-gray-900
        dark:bg-gray-800 dark:text-gray-100
      "
    >
      <h2 className="text-lg font-semibold mb-3 text-center">
        {title}
      </h2>

      <div className="space-y-2 overflow-y-auto flex-1 pr-1">
        {filteredTasks.map(task => (
          <Cards
            key={task.id}
            task={task}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
