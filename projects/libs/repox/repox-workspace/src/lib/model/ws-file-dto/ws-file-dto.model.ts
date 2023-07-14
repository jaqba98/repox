/**
 * The model contains all files from all project directly
 * from the disc.
 */

export interface WsFileProjectFileDtoModel {
  filePath: string;
  fileName: string;
  fileExtname: string;
}

export interface WsFileDtoModel {
  projectName: string;
  projectFiles: Array<WsFileProjectFileDtoModel>;
}
