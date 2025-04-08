import { useRef, useState } from "react";
import { Todo } from "../types";
import {
  MdDeleteOutline,
  MdOutlineEdit,
  MdOutlineSaveAs,
  MdClear,
} from "react-icons/md";

type TodoItemProps = {
  task: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem(props: Readonly<TodoItemProps>) {
  const { task, onToggle, onUpdate, onDelete } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [error, setError] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`flex ${isEditing ? "items-start" : "items-center"} gap-1.5`}
    >
      <input
        type="checkbox"
        className={`scale-150 ${isEditing ? "mt-3" : ""}`}
        id=""
        checked={task.completed}
        onClick={() => onToggle(task.id)}
      />
      <div className="flex-1  overflow-hidden">
        {isEditing ? (
          <>
            <div className="relative w-full">
              <input
                className={`h-9 w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${error ? "ring-2 ring-red-500 focus:ring-red-500" : ""}`}
                value={text}
                title={text}
                ref={inputRef}
                placeholder="Add text"
                onChange={(e) => {
                  const value = e.target.value;

                  setText(value);

                  if (value) {
                    setError("");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTask();
                  }
                }}
              ></input>
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:cursor-pointer hover:text-gray-700"
                onClick={() => setText("")}
              >
                <MdClear />
              </button>
            </div>
            {error && (
              <p className="mt-1 text-sm font-medium text-red-500">{error}</p>
            )}
          </>
        ) : (
          <span
            className={`block truncate ${task.completed ? "text-gray-400 line-through" : ""}`}
            title={text}
          >
            {text}
          </span>
        )}
      </div>
      <button
        className="rounded bg-gray-100 p-2 hover:cursor-pointer hover:bg-gray-300"
        onClick={() => {
          if (!isEditing) {
            setIsEditing(true);
          } else {
            updateTask();
          }
        }}
      >
        {isEditing ? <MdOutlineSaveAs /> : <MdOutlineEdit />}
      </button>
      <button
        className="rounded bg-gray-100 p-2 hover:cursor-pointer hover:bg-gray-300"
        onClick={() => onDelete(task.id)}
      >
        <MdDeleteOutline />
      </button>
    </div>
  );

  function updateTask() {
    if (!text) {
      setError("Please fill the task content.");
      inputRef.current?.focus();
      return;
    }

    if (text !== task.text) {
      onUpdate(task.id, text);
    }

    setIsEditing(false);
  }
}
