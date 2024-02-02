import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dotenv from "dotenv";

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode
  const env = dotenv.config({ path: `.env.${mode}` });
  let obj = {};
  if (mode === "development") {
    obj.global = {};
  }
  obj["process.env"] = env.parsed;
  return {
    plugins: [react()],
    define: obj,
    server: {
      port: 3000,
    },
  };
});
