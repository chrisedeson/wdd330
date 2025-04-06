import { defineConfig } from "vite";

export default defineConfig({
    server: {
        proxy: {
          '/api': {
            target: 'https://api.chefgpt.xyz',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
    },
});