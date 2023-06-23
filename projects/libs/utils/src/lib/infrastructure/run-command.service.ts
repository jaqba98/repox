// Refactored file
import { singleton } from "tsyringe";
import { execSync } from "child_process";

@singleton()
/**
 * The service is responsible for running the command in bash.
 */
export class RunCommandService {
  run(command: string): string {
    return execSync(command, { encoding: "utf-8" });
  }

  runNpm(command: string): void {
    execSync(`npx ${command}`);
  }
}
// todo: refactor
