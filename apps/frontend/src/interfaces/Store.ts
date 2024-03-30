import { Priority } from "@/enums/priority";
import { List } from "@/types/List";

export interface Store {
  listId: string;
  setList: (listId: string) => void;
  getList: () => string;

  dueAt: string;
  setDueAt: (dueAt: string) => void;
  getDueAt: () => string;

  priority: Priority;
  setPriority: (priority: Priority) => void;
  getPriority: () => Priority;

  lists: List[];
  setLists: (lists: List[]) => void;
  updateLists: (list: List) => void;
  getLists: () => List[];

  reset: () => void;
}
