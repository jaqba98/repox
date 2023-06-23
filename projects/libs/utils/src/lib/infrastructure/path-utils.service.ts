import { singleton } from "tsyringe";
import { existsSync } from "fs";
import { chdir } from "process";
import { join } from "path";

@singleton()
/**
 * The service contains a group of utils to path manage.
 */
export class PathUtilsService {
  existPath(path: string): boolean {
    return existsSync(path);
  }

  noExistPath(path: string): boolean {
    return !this.existPath(path);
  }

  changePath(path: string): void {
    chdir(path);
  }

  createPath(pathItems: Array<string>): string {
    return this.normalizePath(join(...pathItems));
  }

  normalizePath(path: string): string {
    return path.replace(/\\/g, "/");
  }
}
