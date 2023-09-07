/**
 * All workspace structure entities to define
 * each element in the workspace.
 */

export enum WsStructureEnum {
  createFolder = `createFolder`,
  createEmptyFileWhenFolderEmpty = `createEmptyFileWhenFolderEmpty`,
  createPackageJsonFile = `createPackageJsonFile`,
  runCommand = `runCommand`,
  createEslintrcJsFile = `createEslintrcJsFile`,
  createGitignoreTextFile = `createGitignoreTextFile`,
  // todo: I am here
  removeFolder = `removeFolder`,
  removeFile = `removeFile`,
  createRootJestConfigTsFile = `createRootJestConfigTsFile`,
  createTsconfigJsonFile = `createTsconfigJsonFile`,
  createRepoxJsonFile = `createRepoxJsonFile`
}
