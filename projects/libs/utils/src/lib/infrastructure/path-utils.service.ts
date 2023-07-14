import { singleton } from "tsyringe";
import { existsSync } from "fs";
import process, { chdir } from "process";
import { join, parse } from "path";
import { WorkspaceFileEnum } from "@lib/repox-workspace";
import { EMPTY_STRING } from "@lib/const";

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

  isRootPath(path: string): boolean {
    const parsedPath = parse(path);
    return parsedPath.root === parsedPath.dir;
  }

  getPackageJsonPath(currentPath: string): string {
    const packageJsonPath = join(
      currentPath, WorkspaceFileEnum.packageJsonFile
    );
    if (this.existPath(packageJsonPath)) {
      return currentPath;
    }
    if (this.isRootPath(currentPath)) {
      return EMPTY_STRING;
    }
    const nextPath = join(currentPath, "../");
    return this.getPackageJsonPath(nextPath);
  }
}
