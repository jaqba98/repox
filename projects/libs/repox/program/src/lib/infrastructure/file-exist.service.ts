// Refactored file
import { singleton } from "tsyringe";
import { existsSync } from "fs";

@singleton()
/**
 * The service is responsible for verify whether
 * file by name exists.
 */
export class FileExistService {
  exist(folderPath: string): boolean {
    return existsSync(folderPath);
  }
}
// todo: refactor
