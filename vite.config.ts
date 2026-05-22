export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: '/app/',  // Replace 'app' with your chosen subfolder name 
    plugins: [react(), tailwindcss()],
    // ADD THIS BUILD BLOCK BELOW YOUR PLUGINS
    build: {
      outDir: 'dist', // Change this to 'build' if your deployment looks for a 'build' folder
      assetsDir: 'assets',
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    // ... rest of your resolve and server config remains exactly the same
  };
});
