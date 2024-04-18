// done
import { container, singleton } from 'tsyringe';

import { changePath } from '@lib/utils';

import { WORKSPACE_STRUCTURE } from '../const/workspace-structure.const';
import {
  type WorkspaceStructureBuilderModel
} from '../model/workspace/workspace-structure.model';

@singleton()
/**
 * The app service uses recursion to generate workspace.
 */
export class RunGenerateWorkspaceAppService {
  run (): boolean {
    this.runGenerateWorkspace(WORKSPACE_STRUCTURE.structure);
    return true;
  }

  private runGenerateWorkspace (children: WorkspaceStructureBuilderModel[]): void {
    for (const child of children) {
      container.resolve(child.builder).generate();
      changePath(child.path);
      this.runGenerateWorkspace(child.children);
      if (child.path === '.') continue;
      changePath('../');
    }
  }
}
