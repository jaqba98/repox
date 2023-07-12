/**
 * The file model stores all files for a project.
 */

export interface FileItemModel {
  path: string;
  name: string;
  extname: string;
}

export interface FileModel {
  name: string;
  files: Array<FileItemModel>;
}
// todo: refactor
