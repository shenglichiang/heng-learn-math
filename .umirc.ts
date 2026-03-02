import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    // { path: "/docs", component: "docs" },
  ],
  npmClient: "yarn",

  publicPath: process.env.NODE_ENV === "production" ? "/heng-learn-math/" : "/",
  history: { type: "hash" },
  outputPath: "dist",
});
