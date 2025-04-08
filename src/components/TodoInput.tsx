import { useEffect, useRef, useState } from "react";
import { MdAddTask, MdClear } from "react-icons/md";

type TodoInputProps = {
  onCreate: (text: string) => void;
};

export function TodoInput(props: Readonly<TodoInputProps>) {
  const { onCreate } = props;
  const [text, setText] = useState("");
  const [error, setError] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    inputRef.current?.focus();
  }, [])

  return (
    <div className="flex w-full items-start space-x-1">
      <div className="flex-1">
        <div className="relative w-full">
          <input
            className={`h-9 w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${error ? "ring-2 ring-red-500 focus:ring-red-500" : ""}`}
            value={text}
            title={text}
            ref={inputRef}
            placeholder="Add your new task here."
            aria-label="New task input"
            aria-invalid={!!error}
            aria-describedby={error ? "input-error" : undefined}
            onChange={(e) => {
              const value = e.target.value;
              setText(value);
              if (value) {
                setError("");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createTask();
              }
              if (e.key === "Escape") {
                clearInput();
              }
            }}
          />
          {text && (
            <button
              type="button"
              aria-label="Clear input"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:cursor-pointer hover:text-gray-700"
              onClick={clearInput}
            >
              <MdClear />
            </button>
          )}
        </div>
        {error && (
          <p id="input-error" role="alert" className="mt-1 text-sm font-medium text-red-500">
            {error}
          </p>
        )}
      </div>
      <button
        type="button"
        aria-label="Add task"
        className="h-9 rounded-md bg-blue-600 px-4 py-1 text-gray-200 hover:cursor-pointer hover:bg-blue-700"
        onClick={createTask}
      >
        <MdAddTask />
      </button>
    </div>
  );

  function createTask() {
    if (!text.trim()) {
      setError("Please fill the task content.");
      setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }
    onCreate(text.trim());
    setText("");
    setError("");
  }

  function clearInput() {
    setText("");
    setError("");
    inputRef.current?.focus();
  }
}
