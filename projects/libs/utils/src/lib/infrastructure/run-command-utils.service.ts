import { singleton } from "tsyringe";
import { execSync } from "child_process";

@singleton()
/**
 * The service is responsible for run command in bash
 * and return the result.
 */
export class RunCommandUtilsService {
  runCommand(command: string): string {
    return execSync(command, { encoding: "utf-8" });
  }

  runNpxCommand(command: string): string {
    return this.runCommand(`npx ${command}`);
  }
}
