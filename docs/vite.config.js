import { SimpleSearch } from "vitepress-plugin-simple-search";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
    plugins: [SimpleSearch('/')],
});
