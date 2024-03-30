import { paths } from "@/api";

export type List = paths["/api/lists"]["get"]["responses"]["200"]["content"]["application/json"][0];
