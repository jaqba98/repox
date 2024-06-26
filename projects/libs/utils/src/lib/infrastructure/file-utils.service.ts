import { singleton } from "tsyringe";
import { copyFileSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { EMPTY_STRING } from "@lib/core";
import { pathExist, PathUtilsService } from "./path-utils.service";
import { globSync } from "glob";
import { basename } from "path";
import { FolderUtilsService } from "./folder-utils.service";

export const readJsonFile = <T>(filePath: string): T => {
  if (pathExist(filePath)) {
    const fileContent = readFileSync(filePath, "utf-8");
    return <T>JSON.parse(fileContent);
  }
  throw new Error(`Failed to read file with path ${filePath}. The file does not exist in the specified path.`);
};

// export const readJsonFile = <T>(filePath: string): T => {
//     if (!pathExist(filePath)) {
//     // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
//         return {} as T;
//     }
//     try {
//         return JSON.parse(readFileSync(filePath, "utf-8")) as T;
//     } catch {
//     // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
//         return {} as T;
//     }
// };

@singleton()
/**
 * The service contains a group of utils to file manage.
 */
export class FileUtilsService {
    constructor (
    private readonly pathUtils: PathUtilsService,
    private readonly folderUtils: FolderUtilsService
    ) {
    }

    copyFile (input: string, output: string): void {
        const fileName = this.getFileName(input);
        const outputPath = this.pathUtils.createPath(output, fileName);
        const destinationDir = this.pathUtils.getDirname(outputPath);
        if (this.pathUtils.notExistPath(destinationDir)) {
            this.folderUtils.createFolder(destinationDir);
        }
        copyFileSync(input, outputPath);
    }

    getFileName (path: string): string {
        return basename(path);
    }

    createEmptyFile (filePath: string): void {
        this.writeTextFile(filePath, EMPTY_STRING);
    }

    readJsonFile<T>(filePath: string): T {
        if (!this.pathUtils.existPath(filePath)) {
            throw new Error("The specified file does not exist!");
        }
        try {
            return JSON.parse(readFileSync(filePath, "utf-8")) as T;
        } catch {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            return {} as T;
        }
    }

    readJsonFileWithoutError<T>(filePath: string): T {
        try {
            return JSON.parse(readFileSync(filePath, "utf-8")) as T;
        } catch {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            return {} as T;
        }
    }

    readProjectFiles (pattern: string): string[] {
        const options = { cwd: "./", ignore: ["**/node_modules/**"] };
        return globSync(pattern, options)
            .map(path => this.pathUtils.normalizePath(path));
    }

    writeTextFile (path: string, content: string): void {
        writeFileSync(path, content);
    }

    writeJsonFile<T>(path: string, content: T): void {
        writeFileSync(path, JSON.stringify(content, null, 2));
    }

    getAllFiles (rootPath: string, fileName: string): string[] {
        const options = { cwd: rootPath, ignore: ["**/node_modules/**"] };
        return globSync(fileName, options)
            .map(path => this.pathUtils.normalizePath(path));
    }
}

export const writeJsonToFile = <T>(path: string, content: T): void => {
    writeFileSync(path, JSON.stringify(content, null, 2));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const writeToFile = (path: string, content: any): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    writeFileSync(path, content);
};

export const removeFile = (path: string): void => { unlinkSync(path); };

export const readTextFile = (filePath: string): string => {
    if (!pathExist(filePath)) {
        return "";
    }
    return readFileSync(filePath, "utf-8");
};

// todo: refactor the code

export const findAllFiles = (root: string, fileName: string) => {
  return globSync(`${root}/**/${fileName}`);
};
