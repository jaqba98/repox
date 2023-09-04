import { singleton } from "tsyringe";
import { mkdirSync, readdirSync, rmSync } from "fs";
import { EMPTY_STRING } from "@lib/const";
import { basename, extname } from "path";
import process from "process";

@singleton()
/**
 * The service contains a group of utils to file manage.
 */
export class FolderUtilsService {
  createFolder (folderPath: string): void {
    mkdirSync(folderPath, { recursive: true });
  }

  isFolder (path: string): boolean {
    return extname(path) === EMPTY_STRING;
  }

  isEmpty (folderPath: string): boolean {
    return readdirSync(folderPath).length === 0;
  }

  removeFolder (folderPath: string): void {
    rmSync(folderPath, { recursive: true, force: true });
  }
  getCurrentFolderName(): string {
    return basename(process.cwd());
  }
}
// todo: refactor the file
