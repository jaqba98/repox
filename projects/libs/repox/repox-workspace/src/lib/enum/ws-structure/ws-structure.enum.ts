/**
 * All workspace structure entities to define
 * each element in the workspace.
 */

export enum WsStructureEnum {
  createFolder = `createFolder`,
  createEmptyFileWhenFolderEmpty = `createEmptyFileWhenFolderEmpty`,
  createPackageJsonFile = `createPackageJsonFile`,
  runCommand = `runCommand`,
  // todo: I am here
  removeFolder = `removeFolder`,
  removeFile = `removeFile`,
  createGitignoreFile = `createGitignoreFile`,
  createEslintrcJsFile = `createEslintrcTsFile`,
  createRootJestConfigTsFile = `createRootJestConfigTsFile`,
  createTsconfigJsonFile = `createTsconfigJsonFile`,
  createRepoxJsonFile = `createRepoxJsonFile`
}
