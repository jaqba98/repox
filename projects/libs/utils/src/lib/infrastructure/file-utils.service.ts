import { singleton } from "tsyringe";
import {
  copyFileSync,
  existsSync,
  readFileSync,
  writeFileSync
} from "fs";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The service contains a group of utils to file manage.
 */
export class FileUtilsService {
  copyFile(input: string, output: string): void {
    copyFileSync(input, output);
  }

  existFile(filePath: string): boolean {
    return existsSync(filePath);
  }

  createEmptyFile(filePath: string): void {
    this.writeTextFile(filePath, EMPTY_STRING);
  }

  readJsonFile<T>(filePath: string): T {
    if (!this.existFile(filePath)) {
      throw new Error("The specified file does not exist!");
    }
    return <T>JSON.parse(readFileSync(filePath, "utf-8"));
  }

  writeTextFile(path: string, content: string): void {
    writeFileSync(path, content);
  }

  writeJsonFile<T>(path: string, content: T): void {
    writeFileSync(path, JSON.stringify(content, null, 2));
  }
}
