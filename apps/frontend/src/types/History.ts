import { paths } from "@/api";

export type History = paths["/api/audit"]["get"]["responses"]["200"]["content"]["application/json"][0];
