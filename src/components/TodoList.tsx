import { useState } from "react";
import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";
import { ConfirmModal } from "./ConfirmModal";
import { useTodoStore } from "../stores/useTodoStore";

export function TodoList() {
  const {tasks, createTask, toggleTask, updateTask, deleteTask, clearAllTasks} = useTodoStore();
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);

  return (
    <div className="w-full rounded bg-white px-8 py-4 shadow-lg sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-1/2">
      <h2 className="my-2 py-2 text-center text-2xl font-semibold text-gray-700">
        Todo List
      </h2>
      <TodoInput onCreate={createTask} />
      {tasks.length === 0 ? (
        <p className="my-4 text-center text-gray-500">No tasks yet. Add one!</p>
      ) : (
        <ul role="list" className="my-4">
          {tasks.map((task) => (
            <li key={task.id} className="my-1.5">
              <TodoItem
                task={task}
                onToggle={toggleTask}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            </li>
          ))}
        </ul>
      )}
      {tasks.length > 0 && (
        <>
          <ConfirmModal
            isOpen={isClearAllModalOpen}
            onClose={() => setIsClearAllModalOpen(false)}
            onConfirm={clearAllTasks}
            title="Clear All Tasks?"
            description="Are you sure you want to delete all your tasks? This action cannot be undone."
          />
          <button
            className="float-end rounded bg-red-500 px-4 py-2 text-sm text-white shadow-md transition hover:bg-red-600"
            aria-label="Clear all tasks"
            title="Clear all tasks"
            onClick={() => setIsClearAllModalOpen(true)}
          >
            Clear All
          </button>
        </>
      )}
    </div>
  );
}
