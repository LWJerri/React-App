import { Priority } from "@/enums/priority";
import { Store } from "@/interfaces/Store";
import { List } from "@/types/List";
import { Task } from "@/types/Task";
import { create } from "zustand";

export const store = create<Store>((set, get) => ({
  listId: "",
  getListId: () => get().listId,
  setListId: (listId: string) => set(() => ({ listId })),

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
  loadTasks: (newTasks: Task[]) =>
    set(({ tasks }) => ({
      tasks: tasks.filter((st) => !newTasks.map((nt) => nt.id).includes(st.id)).concat(newTasks),
    })),
  addTask: (task: Task) => {
    set(({ tasks }) => ({ tasks: [task, ...tasks] }));
    set(({ lists }) => ({
      lists: lists.map((list) => ({ ...list, task: get().getTasks(list.id).length })),
    }));
  },
  updateTask: (newTask: Task) => {
    set(({ tasks }) => ({
      tasks: tasks
        .map((task) => (task.id === newTask.id ? newTask : task))
        .sort((a, b) => {
          const timeA = new Date(a.createdAt).getTime();
          const timeB = new Date(b.createdAt).getTime();

          return timeB - timeA;
        }),
    }));

    set(({ lists }) => ({
      lists: lists.map((list) => ({ ...list, task: get().getTasks(list.id).length })),
    }));
  },
  removeTask: (taskId) => {
    set(({ tasks }) => ({ tasks: tasks.filter((task) => task.id !== taskId) }));
    set(({ lists }) => ({
      lists: lists.map((list) => ({ ...list, task: get().getTasks(list.id).length })),
    }));
  },

  reset: () => set({ listId: "", priority: Priority.LOW }),
}));
