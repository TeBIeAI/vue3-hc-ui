import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginEslint from 'vite-plugin-eslint'
import DefineOptions from 'unplugin-vue-define-options/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vitePluginEslint(), DefineOptions()]
})
