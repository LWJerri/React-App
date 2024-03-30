import { Priority } from "@/enums/priority";
import { Store } from "@/interfaces/Store";
import { List } from "@/types/List";
import { create } from "zustand";

export const store = create<Store>((set, get) => ({
  listId: "",
  setList: (listId: string) => set(() => ({ listId })),
  getList: () => get().listId,

  dueAt: "",
  setDueAt: (dueAt: string) => set(() => ({ dueAt })),
  getDueAt: () => get().dueAt,

  priority: Priority.LOW,
  setPriority: (value: Priority) => set(() => ({ priority: value })),
  getPriority: () => get().priority,

  lists: [],
  setLists: (lists: List[]) => set(() => ({ lists })),
  updateLists: (list: List) => set((state) => ({ lists: [...state.lists, list] })),
  getLists: () => get().lists,

  reset: () => set({ dueAt: "", listId: "", priority: Priority.LOW }),
}));
