/**
 * All workspace structure entities to define
 * each element in the workspace.
 */

export enum WsStructureEnum {
  createFolder = `createFolder`,
  createEmptyFileWhenFolderEmpty = `createEmptyFileWhenFolderEmpty`,
  createPackageJsonFile = `createPackageJsonFile`,
  runCommand = `runCommand`,
  createGitignoreTextFile = `createGitignoreTextFile`,
  // todo: I am here
  removeFolder = `removeFolder`,
  removeFile = `removeFile`,
  createEslintrcJsFile = `createEslintrcTsFile`,
  createRootJestConfigTsFile = `createRootJestConfigTsFile`,
  createTsconfigJsonFile = `createTsconfigJsonFile`,
  createRepoxJsonFile = `createRepoxJsonFile`
}
