import { SimpleSearch } from "vitepress-plugin-simple-search";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [SimpleSearch({
        yregexForContentStripping: undefined
    })],
});
