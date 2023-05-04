import { singleton } from "tsyringe";
import { execSync } from "child_process";
import { chdir } from "process";
import {
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync
} from "fs";

@singleton()
/**
 * The service responsible for exec the given command
 * in the command line.
 */
export class ExecCommand {
  exec(cmd: string): string {
    return execSync(cmd, { encoding: "utf-8" });
  }

  cd(path: string): void {
    chdir(path);
  }

  pathExist(path: string): boolean {
    return existsSync(path);
  }

  pathNotExist(path: string): boolean {
    return !this.pathExist(path);
  }

  createFolder(path: string): void {
    mkdirSync(path);
  }

  createFile(path: string): void {
    closeSync(openSync(path, "w"))
  }

  readFile(path: string): string {
    return readFileSync(path, "utf-8");
  }
}
