import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    minify: 'esbuild',
    outDir: 'dist',

    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        },
        entryFileNames:  'assets/[name]-[hash].js',
        chunkFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',
      },
    },
  },

  envPrefix: 'VITE_',

  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  preview: { port: 4173, strictPort: true },
  optimizeDeps: { include: ['react', 'react-dom', 'react-router-dom'] },
}))
