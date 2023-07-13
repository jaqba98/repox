import { singleton } from "tsyringe";
import { existsSync } from "fs";
import { chdir } from "process";
import { join, sep } from "path";
import process from "process";

@singleton()
/**
 * The service contains a group of utils to path manage.
 */
export class PathUtilsService {
  existPath(path: string): boolean {
    return existsSync(path);
  }

  notExistPath(path: string): boolean {
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

  getCurrentPath(): string {
    return process.cwd();
  }

  getPathSep(): string {
    return sep;
  }

  getPackageJsonPath(currentPath: string): string {
    return "";
  }
}
