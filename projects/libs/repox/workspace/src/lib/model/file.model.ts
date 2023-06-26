/**
 * The file model store all files for project.
 */

export interface FileItemModel {
  filePath: string;
  fileName: string;
  fileExtname: string;
}

export interface FileModel {
  projectName: string;
  projectFiles: Array<FileItemModel>;
}
