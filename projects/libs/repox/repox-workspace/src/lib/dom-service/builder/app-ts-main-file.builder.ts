import { singleton } from 'tsyringe'

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder'
import { writeToFile } from '@lib/utils'
import { WorkspaceFileEnum } from '@lib/repox-workspace'

@singleton()
/**
 * Create app ts main file.
 */
export class AppTsMainFileBuilder extends WorkspaceStructureAbstractBuilder {
  generate () {
    const appTsMainFileContent = `console.log("Hello, World!");
`
    writeToFile(WorkspaceFileEnum.mainTs, appTsMainFileContent)
  }

  regenerate () {
  }
}
