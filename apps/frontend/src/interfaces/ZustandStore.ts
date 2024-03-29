export interface ZustandStore {
  priority: string;
  setPriority: (value: string) => void;
  getPriority: () => string;

  list: string;
  setList: (value: string) => void;
  getList: () => string;

  date: string;
  setDate: (date: Date) => void;
  getDate: () => string;
}
