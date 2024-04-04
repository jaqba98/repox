import { singleton } from 'tsyringe';

import { createFolder, pathExist } from '@lib/utils';

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder';
import { WorkspaceFolderEnum } from '../../enum/workspace-folder.enum';

@singleton()
/**
 * Create folder called apps.
 */
export class AppsFolderBuilder extends WorkspaceStructureAbstractBuilder {
  generate (): void {
    createFolder(WorkspaceFolderEnum.apps);
  }

  regenerate (): void {
    if (pathExist(WorkspaceFolderEnum.apps)) return;
    createFolder(WorkspaceFolderEnum.apps);
  }
}
