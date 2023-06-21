// Refactored file
import { singleton } from "tsyringe";
import { mkdirSync } from "fs";

@singleton()
/**
 * The service is responsible for creating an empty folder
 * in the given path.
 */
export class CreateFolderService {
  create(folderPath: string): void {
    mkdirSync(folderPath, { recursive: true });
  }
}
// todo: refactor
