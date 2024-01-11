module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "jsx-a11y", "prettier", "import", "simple-import-sort"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
  overrides: [
		// override "simple-import-sort" config
		{
			files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
			rules: {
				"simple-import-sort/imports": [
					"error",
					{
						groups: [
							// `react` first, then packages starting with a character and @
							["^react$", "^[a-z]", "^@[a-z]"],
							// Aliases starting with `@`
							["^@"],
							// Packages starting with `~`
							["^~"],
							// Imports starting with `../`
							["^\\.\\.(?!/?$)", "^\\.\\./?$"],
							// Imports starting with `./`
							["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
							// Style imports
							["^.+\\.s?css$"],
							// Side effect imports
							["^\\u0000"],
						],
					},
				],
			},
		},
	],
};
