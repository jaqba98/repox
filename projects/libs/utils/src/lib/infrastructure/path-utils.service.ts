import { singleton } from "tsyringe";
import { existsSync } from "fs";
import { chdir } from "process";
import { join } from "path";

@singleton()
/**
 * The service is responsible for checking
 * whether a given path exists in the system.
 */
export class PathUtilsService {
  checkExist(path: string): boolean {
    return existsSync(path);
  }

  checkNotExist(path: string): boolean {
    return !this.checkExist(path);
  }

  changePath(path: string): void {
    chdir(path);
  }

  createPath(pathItems: Array<string>): string {
    return join(...pathItems).replace(/\\/g, '/');
  }

  normalizePath(path: string): string {
    return path.replace(/\\/g, '/');
  }
}
// todo: refactor
