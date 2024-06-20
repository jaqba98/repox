// done
import { singleton } from "tsyringe";

import { writeFileSync } from "fs";

import { WorkspaceStructureAbstractBuilder } from "./workspace-structure-abstract.builder";
import { WorkspaceFileEnum } from "../../enum/workspace-file.enum";

@singleton()
/**
 * Create tsconfig.json file.
 */
export class EslintrcJsFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate (): void {
        writeFileSync(WorkspaceFileEnum.eslintrcJs, this.buildEslintrcJsContent());
    }

    regenerate (): void {
        writeFileSync(WorkspaceFileEnum.eslintrcJs, this.buildEslintrcJsContent());
    }

    private buildEslintrcJsContent (): string {
        return `module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": ["@typescript-eslint"],
    "rules": {
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"]
    }
};
`;
    }
}
