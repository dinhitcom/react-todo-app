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
    <div className="">
      <h2 className="text-center py-2 my-2 text-2xl font-semibold text-gray-700">Todo List</h2>
      <TodoInput onCreate={createTask} />
      <ul role="list">
        {tasks.map((task) => {
          return (
            <li className="my-1.5">
              <TodoItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
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

  function deleteTask(id: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }
}
