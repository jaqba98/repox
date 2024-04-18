// done
import { singleton } from 'tsyringe';

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder';

@singleton()
/**
 * Create .gitignore file.
 */
export class GitignoreFileBuilder extends WorkspaceStructureAbstractBuilder {
  generate (): void {
    this.createGitignoreContent();
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
