module.exports = {
  '*.json': ['prettier'],
  '*.{ts,tsx}': [
    /* https://github.com/okonet/lint-staged/issues/825 */
    () => 'yarn tsc --skipLibCheck --noEmit'
  ],
  '*.{js,jsx,ts,tsx}': ['yarn eslint --fix']
};
