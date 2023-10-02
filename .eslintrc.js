/* eslint-env node */
module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint"
    ],
    root: true,
    ignorePatterns: [
        "**/*.js",
        "**/*.md"
    ],
    rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                "varsIgnorePattern": "^_",
                "argsIgnorePattern": "^_"
            }
        ]
    }
};
