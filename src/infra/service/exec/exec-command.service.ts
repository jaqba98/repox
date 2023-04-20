import { singleton } from "tsyringe";
import { execSync } from "child_process";
import { chdir } from "process";
import { existsSync, mkdirSync } from "fs";

@singleton()
/**
 * The service responsible for exec the given command
 * in the command line.
 */
export class ExecCommandService {
  exec(cmd: string): void {
    try {
      execSync(cmd);
    } catch (err) {
      throw new Error(
        `Failed to execute command: ${cmd}, error: ${err}`
      );
    }
  }

  cd(path: string): void {
    try {
      chdir(path);
    } catch (err) {
      throw new Error(
        `Failed to change folder: ${path}, error: ${err}`
      );
    }
  }

  pathExist(path: string): boolean {
    return existsSync(path);
  }

  createFolder(path: string): void {
    try {
      mkdirSync(path);
    } catch (err) {
      throw new Error(
        `Failed to create folder: ${path}, error: ${err}`
      );
    }
  }
}
