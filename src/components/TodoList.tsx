import { useState } from "react";
import { TodoInput } from "./TodoInput";
import { Todo } from "../types";
import { TodoItem } from "./TodoItem";

const initialTasks: Todo[] = [
  {
    id: crypto.randomUUID(),
    text: "Buy some milk",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    text: "Walk the dog",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    text: "Craft a space shuttle",
    completed: true,
  },
];

export function TodoList() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-1/2  rounded bg-white px-8 py-4 shadow-lg">
      <h2 className="my-2 py-2 text-center text-2xl font-semibold text-gray-700">
        Todo List
      </h2>
      <TodoInput onCreate={createTask} />
      <ul role="list" className="my-4">
        {tasks.map((task) => {
          return (
            <li className="my-1.5">
              <TodoItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );

  function createTask(text: string) {
    const newTask: Todo = {
      id: crypto.randomUUID(),
      text: text,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }

  function toggleTask(id: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function updateTask(id: string, newText: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }
}
