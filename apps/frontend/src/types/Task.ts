import { paths } from "@/api";

export type Task = paths["/api/lists/{listId}/tasks"]["get"]["responses"]["200"]["content"]["application/json"][0];
