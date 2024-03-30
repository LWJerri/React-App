import { Priority } from "@/enums/priority";

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

  reset: () => void;
}
