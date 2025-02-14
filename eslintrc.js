extends: [
  'plugin:vue/vue3-essential',
  'plugin:vue/vue3-strongly-recommended',
  'eslint:recommended',
  '@vue/typescript/recommended'
]

rules: {
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/explicit-module-boundary-types': 'warn'
} 
