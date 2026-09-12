import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Pacotes que devem sair em um chunk próprio, agrupados pelo nome do chunk. */
const CHUNKS: Record<string, string[]> = {
  react: ["react", "react-dom", "scheduler"],
  motion: ["motion", "motion-dom", "motion-utils", "framer-motion"],
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        /**
         * Separa as dependências do código da aplicação. Elas mudam raramente,
         * então o navegador reaproveita esses chunks entre deploys — e na Vercel
         * ganham cache imutável por terem hash no nome.
         *
         * A comparação é pelo caminho dentro de node_modules: listar só
         * "react-dom" como id não pega "react-dom/client", que é o que o app
         * importa de fato.
         */
        manualChunks(id) {
          const caminho = id.split("\\").join("/");
          const i = caminho.lastIndexOf("node_modules/");
          if (i === -1) return;
          const pacote = caminho
            .slice(i + "node_modules/".length)
            .split("/")[0];
          for (const [chunk, pacotes] of Object.entries(CHUNKS)) {
            if (pacotes.includes(pacote)) return chunk;
          }
          return;
        },
      },
    },
  },
});
