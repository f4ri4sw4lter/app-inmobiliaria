import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';
dotenv.config();


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permitir acceso desde otras máquinas
    port: 5173, // Configurar el puerto
  },
})
