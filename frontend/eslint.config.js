import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  { files: ['**/*.{js,mjs,cjs,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    rules: {
      'no-unused-vars': 'error',
      // array element 換行格式一致
      'array-element-newline': ['error', 'consistent'],
      // 不限制import順序
      'import/order': 'off',
      // vue元件轉pascal case
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        { registeredComponentsOnly: false },
      ],
      // 取消tag一定要換行
      'vue/singleline-html-element-content-newline': 'off',
      // 限制單,多行屬性數量
      'vue/max-attributes-per-line': ['error', { singleline: 20, multiline: 1 }],
    },
  },
]
