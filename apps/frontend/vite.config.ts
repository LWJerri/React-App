import react from "@vitejs/plugin-react";
import "dotenv/config";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": resolve(__dirname, "./src") } },
  server: { proxy: { "/api": { target: process.env.API_URL } } },
});
