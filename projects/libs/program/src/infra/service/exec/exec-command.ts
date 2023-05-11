import { singleton } from "tsyringe";
import { execSync } from "child_process";
import { closeSync, existsSync, mkdirSync, openSync } from "fs";
import { chdir } from "process";

/**
 * Executive the command on the command line.
 */
@singleton()
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
}
// todo: refactor