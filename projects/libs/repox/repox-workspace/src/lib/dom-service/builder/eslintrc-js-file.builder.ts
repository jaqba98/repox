import { singleton } from 'tsyringe'

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder'
import { writeFileSync } from 'fs'
import { WorkspaceFileEnum } from '../../enum/workspace-file.enum'

@singleton()
/**
 * Create tsconfig.json file.
 */
export class EslintrcJsFileBuilder extends WorkspaceStructureAbstractBuilder {
  generate (): void {
    writeFileSync(WorkspaceFileEnum.eslintrcJs, this.buildDefaultEslintrcJsContent())
  }

  regenerate (): void {
    writeFileSync(WorkspaceFileEnum.eslintrcJs, this.buildDefaultEslintrcJsContent())
  }

  private buildDefaultEslintrcJsContent (): string {
    return `module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "standard-with-typescript",
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
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
      "max-lines": "error"
    }
}
`
  }
}
