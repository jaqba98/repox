import { singleton } from "tsyringe";
import { mkdirSync } from "fs";

@singleton()
/**
 * The service contains a group of utils to file manage.
 */
export class FolderUtilsService {
  createFolder(folderPath: string): void {
    mkdirSync(folderPath, { recursive: true });
  }
}
