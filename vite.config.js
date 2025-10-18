import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VueGlobalTranslator',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'pinia', 'axios'],
      output: {
        globals: {
          vue: 'Vue',
          pinia: 'Pinia',
          axios: 'axios'
        }
      }
    },
    outDir: 'dist',
    sourcemap: true, 
    emptyOutDir: true
  }
})
