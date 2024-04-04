import { singleton } from 'tsyringe';

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder';
import { WorkspaceDomainStore } from '../store/workspace-domain.store';

@singleton()
/**
 * Create a workspace package.json file.
 */
export class WorkspacePackageJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
  constructor (private readonly store: WorkspaceDomainStore) {
    super();
  }

  generate (): void {
    // if (this.store.workspaceDomain == null) return
    // this.store.workspaceDomain.workspacePackageJsonDomain =
    //         this.buildDefaultWorkspacePackageJson()
  }

  regenerate (): void {
    // if (this.store.workspaceDomain == null) return
    // this.store.workspaceDomain.workspacePackageJsonDomain = {
    //   ...this.store.workspaceDomain.workspacePackageJsonDomain,
    //   ...this.buildDefaultWorkspacePackageJson(),
    //   scripts: {
    //     ...this.store.workspaceDomain.workspacePackageJsonDomain.scripts,
    //     ...this.buildDefaultWorkspacePackageJson().scripts
    //   },
    //   dependencies: {
    //     ...this.store.workspaceDomain.workspacePackageJsonDomain.dependencies,
    //     ...this.buildDefaultWorkspacePackageJson().dependencies
    //   },
    //   devDependencies: {
    //     ...this.store.workspaceDomain.workspacePackageJsonDomain.devDependencies,
    //     ...this.buildDefaultWorkspacePackageJson().devDependencies
    //   }
    // }
  }

  // private buildDefaultWorkspacePackageJson (): PackageJsonDomainModel {
  //   return {
  //     name: getCurrentFolderName(),
  //     version: '1.0.0',
  //     private: true,
  //     scripts: {},
  //     dependencies: {
  //       '@types/core-js': '^2.5.8',
  //       '@types/node': '^20.11.30',
  //       repox: '^1.4.62',
  //       'tsc-alias': '^1.8.8'
  //     },
  //     devDependencies: {
  //       'core-js': '^3.36.1',
  //       tsyringe: '^4.8.0',
  //       typescript: '^5.4.3',
  //       '@typescript-eslint/eslint-plugin': '^7.4.0',
  //       eslint: '^8.0.1',
  //       'eslint-config-love': '^43.1.0',
  //       'eslint-plugin-import': '^2.25.2',
  //       'eslint-plugin-n': '^15.0.0 || ^16.0.0 ',
  //       'eslint-plugin-promise': '^6.0.0'
  //     }
  //   }
  // }
}
