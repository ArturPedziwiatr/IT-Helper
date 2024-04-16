import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import vue from '@vitejs/plugin-vue'
import sass from 'sass'

export default defineConfig({
  resolve: {
    alias: {
      '@enum': path.resolve(__dirname, 'src/enums'),
      '@view': path.resolve(__dirname, 'src/views'),
      '@store': path.resolve(__dirname, 'src/stores'),
      '@constant': path.resolve(__dirname, 'src/constants'),
      '@component': path.resolve(__dirname, 'src/component'),
      '@interface': path.resolve(__dirname, 'src/interface'),
      '@composable': path.resolve(__dirname, 'src/composables'),
      
      '@Tree': path.resolve(__dirname, 'src/structure/Tree.ts'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  plugins: [
    vue(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],
})
