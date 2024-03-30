import { Priority } from "@/enums/priority";
import { List } from "@/types/List";
import { Task } from "@/types/Task";

export interface Store {
  listId: string;
  getListId: () => string;
  setListId: (listId: string) => void;

  dueAt: string;
  getDueAt: () => string;
  setDueAt: (dueAt: string) => void;

  priority: Priority;
  getPriority: () => Priority;
  setPriority: (priority: Priority) => void;

  lists: List[];
  getLists: () => List[];
  getList: (listId: string) => List;
  loadLists: (lists: List[]) => void;
  addList: (list: Omit<List, "task">) => void;
  updateList: (list: List) => void;
  removeList: (listId: string) => void;

  tasks: Task[];
  getTasks: (listId: string) => Task[];
  loadTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  removeTask: (taskId: string) => void;

  reset: () => void;
}
