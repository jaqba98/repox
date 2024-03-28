import { singleton } from 'tsyringe'

import { createFolder, pathExist } from '@lib/utils'

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder'
import { WorkspaceFolderEnum } from '../../enum/workspace-folder.enum'

@singleton()
/**
 * Create folder called libs.
 */
export class ToolsFolderBuilder extends WorkspaceStructureAbstractBuilder {
  generate (): void {
    createFolder(WorkspaceFolderEnum.tools)
  }

  regenerate (): void {
    if (pathExist(WorkspaceFolderEnum.tools)) return
    createFolder(WorkspaceFolderEnum.tools)
  }
}
