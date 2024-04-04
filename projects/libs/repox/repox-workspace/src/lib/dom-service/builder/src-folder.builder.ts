import { singleton } from 'tsyringe';

import { createFolder, pathExist } from '@lib/utils';

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder';
import { WorkspaceFolderEnum } from '../../enum/workspace-folder.enum';

@singleton()
/**
 * Create folder called src.
 */
export class SrcFolderBuilder extends WorkspaceStructureAbstractBuilder {
  generate (): void {
    createFolder(WorkspaceFolderEnum.src);
  }

  regenerate (): void {
    if (pathExist(WorkspaceFolderEnum.src)) return;
    createFolder(WorkspaceFolderEnum.src);
  }
}
