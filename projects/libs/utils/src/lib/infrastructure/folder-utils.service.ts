import { singleton } from "tsyringe";
import { mkdirSync } from "fs";
import { EMPTY_STRING } from "@lib/const";
import { FileUtilsService } from "./file-utils.service";

@singleton()
/**
 * The service contains a group of utils to file manage.
 */
export class FolderUtilsService {
  constructor(private readonly fileUtils: FileUtilsService) {
  }

  createFolder(folderPath: string): void {
    mkdirSync(folderPath, { recursive: true });
  }

  isFolder(path: string): boolean {
    return this.fileUtils.getFileExtname(path) === EMPTY_STRING;
  }
}
