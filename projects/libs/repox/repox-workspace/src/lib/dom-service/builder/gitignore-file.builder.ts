import { singleton } from 'tsyringe'

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder'
import { WorkspaceDomainStore } from '../store/workspace-domain.store'

@singleton()
/**
 * Create .gitignore file.
 */
export class GitignoreFileBuilder extends WorkspaceStructureAbstractBuilder {
  constructor (private readonly store: WorkspaceDomainStore) {
    super()
  }

  generate (): void {
    this.createDefaultGitignoreTextDomain()
  }

  regenerate (): void {
    this.createDefaultGitignoreTextDomain()
  }

  private createDefaultGitignoreTextDomain (): void {
    if (this.store.workspaceDomain == null) return
    this.store.workspaceDomain.gitignoreTextDomain = `# JetBrains tools
.idea

# Compilation output
dist

# Dependency directories
node_modules

# Temporary files and directories
tmp
`
  }
}
