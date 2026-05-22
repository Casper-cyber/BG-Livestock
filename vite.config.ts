import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // If your repository is named "my-app", change this to "/my-app/"
    base: '/', 
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        // Changed from '.' to './src' to avoid root resolution bugs
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // Fixed: Using the safely loaded 'env' variable instead of raw 'process.env'
      hmr: env.DISABLE_HMR !== 'true',
      watch: env.DISABLE_HMR === 'true' ? { ignored: ['**/*'] } : {},
    },
  };
});