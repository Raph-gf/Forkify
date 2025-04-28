import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    commonjsOptions: {
      exclude: ['fsevents'], // Exclure fsevents du traitement CommonJS
    },
    rollupOptions: {
      output: {
        hoistTransitiveImports: false,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['fsevents'], // Exclure fsevents de l'optimisation des dépendances
  },
  server: {
    hmr: false, // Désactiver le hot module replacement pour diagnostic
  },
});
