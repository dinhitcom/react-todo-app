import { Todo } from "../types";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

type TodoItemProps = {
  task: Todo;
  onToggle: (id: string) => void;
  onUpdate?: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem(props: Readonly<TodoItemProps>) {
  const { task, onToggle, onUpdate, onDelete } = props;

  return (
    <div className="flex items-center gap-1.5">
      <input
        type="checkbox"
        className="scale-150"
        id=""
        checked={task.completed}
        onClick={() => onToggle(task.id)}
      />
      <span
        className={`flex-1 ${task.completed ? "text-gray-400 line-through" : ""}`}
      >
        {task.text}
      </span>
      <button
        className="rounded bg-gray-100 p-2 hover:bg-gray-300 hover:cursor-pointer"
        onClick={() => onUpdate?.(task.id, "not implemented")}
      >
        <MdOutlineEdit />
      </button>
      <button
        className="rounded bg-gray-100 p-2 hover:bg-gray-300 hover:cursor-pointer"
        onClick={() => onDelete(task.id)}
      >
        <MdDeleteOutline />
      </button>
    </div>
  );
}
