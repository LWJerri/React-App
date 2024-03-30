import { paths } from "@/api";
import createClient from "openapi-fetch";

const api = createClient<paths>({ baseUrl: "/" });

export default api;
