module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint-config-prettier',
    'eslint:recommended', // 使用推荐的eslint
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended', // 使用插件支持vue3
    'plugin:vue/vue3-essential',
    //1.继承.prettierrc.js文件规则2.开启rules的 "prettier/prettier": "error"3.eslint fix的同时执行prettier格式化
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefault: 'readonly',
    defineOptions: 'readonly'
  },
  rules: {
    'no-var': 2,
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-debugger': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0
  }
}
