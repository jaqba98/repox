import {singleton} from "tsyringe";
import {mkdirSync, readdirSync, renameSync} from "fs";
import {EMPTY_STRING} from "@lib/const";
import {basename, extname} from "path";
import process from "process";
import {createPath, existPath, pathNotExist} from "./path-utils.service";

@singleton()
/**
 * The service contains a group of utils to file manage.
 */
export class FolderUtilsService {
    createFolder(folderPath: string): void {
        mkdirSync(folderPath, {recursive: true});
    }

    isFolder(path: string): boolean {
        return extname(path) === EMPTY_STRING;
    }

    isEmpty(folderPath: string): boolean {
        return readdirSync(folderPath).length === 0;
    }

    getCurrentFolderName(): string {
        return basename(process.cwd());
    }
}

export const createFolder = (...folderPath: string[]): boolean => {
    const path = createPath(...folderPath);
    if (existPath(path)) return false;
    mkdirSync(path, {recursive: true});
    return true;
}

export const renameFolder = (folderPath: string[], folderName: string): boolean => {
    const oldFolderPath = createPath(...folderPath);
    const newFolderPath = createPath(...folderPath, "../", folderName);
    if (pathNotExist(oldFolderPath)) return false;
    renameSync(oldFolderPath, newFolderPath);
    return true;
}