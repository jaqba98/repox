module.exports = {
    "root": true,
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "no-undef": "off",
        "max-lines": "error",
        "max-depth": "error",
        "@typescript-eslint/semi": ["error", "always"],
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-var-requires": "off"
    }
};
