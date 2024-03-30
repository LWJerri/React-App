import { Priority } from "@/enums/priority";
import { Store } from "@/interfaces/Store";
import { List } from "@/types/List";
import { Task } from "@/types/Task";
import { create } from "zustand";

export const store = create<Store>((set, get) => ({
  listId: "",
  getListId: () => get().listId,
  setListId: (listId: string) => set(() => ({ listId })),

  dueAt: "",
  getDueAt: () => get().dueAt,
  setDueAt: (dueAt: string) => set(() => ({ dueAt })),

  priority: Priority.LOW,
  getPriority: () => get().priority,
  setPriority: (value: Priority) => set(() => ({ priority: value })),

  lists: [],
  getLists: () => get().lists,
  getList: (listId: string) => get().lists.find((list) => list.id === listId)!,
  loadLists: (lists: List[]) => set(() => ({ lists })),
  addList: (list: Omit<List, "task">) => set(({ lists }) => ({ lists: [{ ...list, task: 0 }, ...lists] })),
  updateList: (newList: List) => {
    set(({ lists }) => ({ lists: lists.map((list) => (list.id === newList.id ? newList : list)) }));
  },
  removeList: (listId) => set(({ lists }) => ({ lists: lists.filter((list) => list.id !== listId) })),

  tasks: [],
  getTasks: (listId: string) => get().tasks.filter((task) => task.listId === listId),
  loadTasks: (tasks: Task[]) => set(() => ({ tasks })),
  addTask: (task: Task) => set(({ tasks }) => ({ tasks: [task, ...tasks] })),
  updateTask: (newTask: Task) => {
    set(({ tasks }) => ({ tasks: tasks.map((task) => (task.id === newTask.id ? newTask : task)) }));
  },
  removeTask: (taskId) => set(({ tasks }) => ({ tasks: tasks.filter((task) => task.id !== taskId) })),

  reset: () => set({ listId: "", dueAt: "", priority: Priority.LOW }),
}));
