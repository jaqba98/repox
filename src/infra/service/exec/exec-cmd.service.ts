import { execSync } from "child_process";
import { singleton } from "tsyringe";
import { chdir } from "process";
import { closeSync, mkdirSync, openSync } from "fs";

@singleton()
/**
 * The service responsible for exec the given command
 * in the command line.
 */
export class ExecCmdService {
  exec(cmd: string): boolean {
    try {
      execSync(cmd);
      return true;
    } catch {
      return false;
    }
  }

  cd(path: string): boolean {
    try {
      chdir(path);
      return true;
    } catch {
      return false;
    }
  }

  createFile(path: string): boolean {
    try {
      closeSync(openSync(path, 'w'));
      return true;
    } catch {
      return false;
    }
  }

  createFolder(path: string): boolean {
    try {
      mkdirSync(path);
      return true;
    } catch {
      return false;
    }
  }
}
// todo: fix it