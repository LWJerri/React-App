import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": resolve(__dirname, "./src") } },
  server: { proxy: { "/api": { target: process.env.VITE_API_URL ?? "http://localhost:3000" } } },
});
