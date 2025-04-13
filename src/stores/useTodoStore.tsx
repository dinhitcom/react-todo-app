import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo } from "../types";

type TodoState = {
  tasks: Todo[];
};

type TodoAction = {
  createTask: (text: string) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, newText: string) => void;
  deleteTask: (id: string) => void;
  clearAllTasks: () => void;
};

export const useTodoStore = create<TodoState & TodoAction>()(
  persist(
    (set) => ({
      tasks: [],
      createTask: (text: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: crypto.randomUUID(), text, completed: false },
          ],
        })),
      toggleTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.map((task: Todo) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        })),
      updateTask: (id: string, newText: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, text: newText } : task,
          ),
        })),
      deleteTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      clearAllTasks: () => set(() => ({ tasks: [] })),
    }),
    {
      name: "tasks",
    },
  ),
);
