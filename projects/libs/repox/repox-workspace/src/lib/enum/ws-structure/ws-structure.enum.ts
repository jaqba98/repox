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
  createJestConfigJsFile = `createJestConfigJsFile`,
  // todo: I am here
  removeFolder = `removeFolder`,
  removeFile = `removeFile`,
  createTsconfigJsonFile = `createTsconfigJsonFile`,
  createRepoxJsonFile = `createRepoxJsonFile`
}
