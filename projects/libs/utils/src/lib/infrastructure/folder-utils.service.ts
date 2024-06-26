import { singleton } from "tsyringe";
import { mkdirSync, readdirSync, renameSync } from "fs";
import { EMPTY_STRING } from "@lib/core";
import { basename, extname } from "path";
import process from "process";
import { createPath, getCurrentPath, pathNotExist } from "./path-utils.service";

@singleton()
/**
 * The service contains a group of utils to file manage.
 */
export class FolderUtilsService {
    createFolder (folderPath: string): void {
        mkdirSync(folderPath, { recursive: true });
    }

    isFolder (path: string): boolean {
        return extname(path) === EMPTY_STRING;
    }

    isEmpty (folderPath: string): boolean {
        return readdirSync(folderPath).length === 0;
    }

    getCurrentFolderName (): string {
        return basename(process.cwd());
    }
}

export const createFolder = (...folderPath: string[]): void => {
    const path = createPath(...folderPath);
    mkdirSync(path, { recursive: true });
};

export const renameFolder = (folderPath: string[], folderName: string): boolean => {
    const oldFolderPath = createPath(...folderPath);
    const newFolderPath = createPath(...folderPath, "../", folderName);
    if (pathNotExist(oldFolderPath)) return false;
    renameSync(oldFolderPath, newFolderPath);
    return true;
};

export const oneFileInFolder = (folderPath: string): boolean => {
    return readdirSync(folderPath).length === 1;
};

export const isManyFilesInFolder = (folderPath: string): boolean => {
    return readdirSync(folderPath).length > 1;
};

export const getCurrentFolderName = (): string => basename(getCurrentPath());

export const isEmptyFolder = (folderPath: string): boolean => {
    return readdirSync(folderPath).length === 0;
};

export const isNotEmptyFolder = (folderPath: string): boolean => {
    return !isEmptyFolder(folderPath);
};

// todo: refactor the code
