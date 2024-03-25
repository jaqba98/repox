import { singleton } from 'tsyringe'

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder'
import { runCommand } from '@lib/utils'

@singleton()
/**
 * Create eslint file.
 */
export class EslintJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
  generate (): void {
    runCommand('npm init @eslint/config')
  }

  regenerate (): void {
  }
}
