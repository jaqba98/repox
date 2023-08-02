import { singleton } from "tsyringe";
import { copyFileSync, readFileSync, writeFileSync } from "fs";
import { EMPTY_STRING } from "@lib/const";
import { PathUtilsService } from "./path-utils.service";
import { globSync } from "glob";
import { basename, extname } from "path";
import { FolderUtilsService } from "./folder-utils.service";

@singleton()
/**
 * The service contains a group of utils to file manage.
 */
export class FileUtilsService {
  constructor(
    private readonly pathUtils: PathUtilsService,
    private readonly folderUtils: FolderUtilsService
  ) {
  }

  copyFile(input: string, output: string): void {
    const fileName = this.getFileName(input);
    const outputPath = this.pathUtils.createPath([output, fileName]);
    const destinationDir = this.pathUtils.getDirname(outputPath);
    if (this.pathUtils.notExistPath(destinationDir)) {
      this.folderUtils.createFolder(destinationDir);
    }
    copyFileSync(input, outputPath);
  }

  getFileName(path: string): string {
    return basename(path);
  }

  createEmptyFile(filePath: string): void {
    this.writeTextFile(filePath, EMPTY_STRING);
  }

  readTextFile(filePath: string): string {
    if (!this.pathUtils.existPath(filePath)) {
      throw new Error(
        `The specified file does not exist! Path: ${filePath}`
      );
    }
    return readFileSync(filePath, "utf-8");
  }

  readJsonFile<T>(filePath: string): T {
    if (!this.pathUtils.existPath(filePath)) {
      throw new Error("The specified file does not exist!");
    }
    return <T>JSON.parse(readFileSync(filePath, "utf-8"));
  }

  readProjectFiles(pattern: string): Array<string> {
    const options = { cwd: "./", ignore: ['**/node_modules/**'] };
    return globSync(pattern, options)
      .map(path => this.pathUtils.normalizePath(path));
  }

  readAllHtmlFiles(cwd: string): Array<string> {
    const options = { cwd, ignore: ['**/node_modules/**'] };
    return globSync("*.html", options)
      .map(path => this.pathUtils.createPath([cwd, path]))
      .map(path => this.pathUtils.normalizePath(path));
  }

  writeTextFile(path: string, content: string): void {
    writeFileSync(path, content);
  }

  writeJsonFile<T>(path: string, content: T): void {
    writeFileSync(path, JSON.stringify(content, null, 2));
  }

  changeExtname(filePath: string, newExtname: string): string {
    return basename(filePath, extname(filePath)).concat(newExtname);
  }
}
