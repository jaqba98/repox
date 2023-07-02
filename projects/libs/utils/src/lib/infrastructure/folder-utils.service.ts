import { singleton } from "tsyringe";
import { existsSync, mkdirSync } from "fs";

@singleton()
/**
 * The service contains a group of utils to file manage.
 */
export class FolderUtilsService {
  createFolder(folderPath: string): void {
    mkdirSync(folderPath, { recursive: true });
  }

  checkNotExist(folderPath: string): boolean {
    return !existsSync(folderPath);
  }
}
