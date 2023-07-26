import { singleton } from "tsyringe";
import { mkdirSync } from "fs";
import { EMPTY_STRING } from "@lib/const";
import { FileUtilsService } from "./file-utils.service";
import { extname } from "path";

@singleton()
/**
 * The service contains a group of utils to file manage.
 */
export class FolderUtilsService {
  createFolder(folderPath: string): void {
    mkdirSync(folderPath, { recursive: true });
  }

  isFolder(path: string): boolean {
    return extname(path) === EMPTY_STRING;
  }
}
