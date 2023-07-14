/**
 * The model contains all files from all project directly
 * from the disc.
 */

export interface WsFileProjectFileDtoModel {
  filePath: string;
  fileName: string;
  fileExtname: string;
}

export interface WsFileProjectDtoModel {
  projectName: string;
  projectFiles: Array<WsFileProjectFileDtoModel>;
}

export interface WsFileProjectsDtoModel {
  [projectName: string]: WsFileProjectDtoModel;
}

export interface WsFileDtoModel {
  projects: WsFileProjectsDtoModel;
}
