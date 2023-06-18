// Refactored file
import { singleton } from "tsyringe";
import { existsSync } from "fs";

@singleton()
/**
 * The service is responsible for checking
 * whether folder by name not exists.
 */
export class FolderNotExistService {
  checkNotExist(folderPath: string): boolean {
    return !existsSync(folderPath);
  }
}
