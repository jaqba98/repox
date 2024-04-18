// done
import { singleton } from 'tsyringe';

import { writeToFile } from '@lib/utils';

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder';
import { WorkspaceFileEnum } from '../../enum/workspace-file.enum';

@singleton()
/**
 * Create .gitignore file.
 */
export class GitignoreFileBuilder extends WorkspaceStructureAbstractBuilder {
  generate (): void {
    writeToFile(WorkspaceFileEnum.gitignore, this.createGitignoreContent());
  }

  regenerate (): void {}

  private createGitignoreContent (): string {
    return `# JetBrains tools
.idea

# Compilation output
dist

# Dependency directories
node_modules

# Temporary files and directories
tmp
`;
  }
}
