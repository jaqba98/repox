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

export const changePath = (path: string): void => chdir(path);

export const existPath = (path: string): boolean => existsSync(path);

export const isSystemRootPath = (path: string): boolean => {
    const parsedPath = parse(path);
    return parsedPath.root === parsedPath.dir;
}

export const getCurrentPath = (): string => process.cwd();

export const findWorkspacePath = (path: string): string => {
    const packageJsonPath = join(path, "repox.json");
    if (existPath(packageJsonPath)) return path;
    if (isSystemRootPath(packageJsonPath)) return EMPTY_STRING;
    const previousPath = join(path, "../");
    return findWorkspacePath(previousPath);
};

export const pathExist = (path: string): boolean => existsSync(path);

export const pathNotExist = (path: string): boolean => !pathExist(path);

export const normalizePath = (path: string): string => {
    return path.replace(/\\/g, `/`);
}

export const createPath = (...pathItems: string[]): string => {
    return normalizePath(join(...pathItems));
}

export const createParentPath = (path: string): string => createPath(path, "../");

// todo: refactor the code
