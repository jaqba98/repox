import {singleton} from "tsyringe";
import {existsSync} from "fs";
import process, {chdir} from "process";
import {dirname, join, parse} from "path";
import {EMPTY_STRING} from "@lib/const";

@singleton()
/**
 * The service contains a group of utils to path manage.
 */
export class PathUtilsService {
    getRootPath(path: string, file: string): string {
        return this.normalizePath(path)
            .split(`/`)
            .map((): string => `..`)
            .join(`/`)
            .concat(`/`)
            .concat(file);
    }

    existPath(path: string): boolean {
        return existsSync(path);
    }

    notExistPath(path: string): boolean {
        return !this.existPath(path);
    }

    changePath(path: string): void {
        chdir(path);
    }

    createPath(...pathItems: string[]): string {
        return this.normalizePath(join(...pathItems));
    }

    normalizePath(path: string): string {
        return path.replace(/\\/g, `/`);
    }

    getCurrentPath(): string {
        return process.cwd();
    }

    isRootPath(path: string): boolean {
        const parsedPath = parse(path);
        return parsedPath.root === parsedPath.dir;
    }

    getDirname(path: string): string {
        return dirname(path);
    }

    getPackageJsonPath(currentPath: string): string {
        const packageJsonPath = join(currentPath, `package.json`);
        if (this.existPath(packageJsonPath)) {
            return currentPath;
        }
        if (this.isRootPath(currentPath)) {
            return EMPTY_STRING;
        }
        const nextPath = join(currentPath, `../`);
        return this.getPackageJsonPath(nextPath);
    }
}
