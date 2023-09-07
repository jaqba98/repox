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
  createTsconfigJsonFile = `createTsconfigJsonFile`,
  // todo: I am here
  removeFolder = `removeFolder`,
  removeFile = `removeFile`,
  createRepoxJsonFile = `createRepoxJsonFile`
}
