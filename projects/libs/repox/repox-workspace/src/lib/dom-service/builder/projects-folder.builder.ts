// done
import { singleton } from 'tsyringe';

import { createFolder } from '@lib/utils';

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder';
import { WorkspaceFolderEnum } from '../../enum/workspace-folder.enum';

@singleton()
/**
 * Create folder called projects.
 */
export class ProjectsFolderBuilder extends WorkspaceStructureAbstractBuilder {
  generate (): void {
    createFolder(WorkspaceFolderEnum.projects);
  }

  regenerate (): void {}
}
