import { singleton } from "tsyringe";
import { execSync } from "child_process";
import { chdir } from "process";
import { closeSync, existsSync, mkdirSync, openSync } from "fs";

@singleton()
/**
 * The service responsible for exec the given command
 * in the command line.
 */
export class ExecCommandService {
  exec(cmd: string): string {
    return execSync(cmd, { encoding: "utf-8" });
  }

  cd(path: string): void {
    chdir(path);
  }

  pathExist(path: string): boolean {
    return existsSync(path);
  }

  createFolder(path: string): void {
    mkdirSync(path);
  }

  createFile(path: string): void {
    closeSync(openSync(path, "w"))
  }
}
