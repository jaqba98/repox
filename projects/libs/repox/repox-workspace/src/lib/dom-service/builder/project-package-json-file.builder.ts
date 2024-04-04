import { singleton } from 'tsyringe';

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder';

@singleton()
/**
 * Create a project package.json file.
 */
export class ProjectPackageJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
  generate (): void {
    // writeJsonToFile(WorkspaceFileEnum.packageJson, this.buildDefaultWorkspacePackageJson())
  }

  regenerate (): void {
  }

  // private buildDefaultWorkspacePackageJson (): Pick<PackageJsonDomainModel, 'name' | 'version'> {
  //   return {
  //     name: getCurrentFolderName(),
  //     version: '1.0.0'
  //   }
  // }
}
