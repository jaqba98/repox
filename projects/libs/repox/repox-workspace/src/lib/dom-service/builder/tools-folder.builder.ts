import { singleton } from 'tsyringe'

import { createFolder, pathExist } from '@lib/utils'

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder'
import { WorkspaceFolderEnum } from '../../enum/workspace-folder.enum'

@singleton()
/**
 * Create folder called libs.
 */
export class ToolsFolderBuilder extends WorkspaceStructureAbstractBuilder {
  generate () {
    createFolder(WorkspaceFolderEnum.tools)
  }

  regenerate () {
    if (pathExist(WorkspaceFolderEnum.tools)) return
    createFolder(WorkspaceFolderEnum.tools)
  }
}
