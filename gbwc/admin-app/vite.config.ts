/// <reference types="vitest/config" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/admin/',
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react-router-dom': path.resolve(__dirname, './src/lib/react-router-dom-mock.tsx'),
    },
    dedupe: ['react', 'react-dom', 'react-i18next', 'i18next'],
  },
  css: {
    postcss: {},
  },
  server: {
    port: 5174,
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
      '/img': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        secure: false,
      },
      '/fonts': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
