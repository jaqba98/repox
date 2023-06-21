// Refactored file
import { singleton } from "tsyringe";
import { sync } from "command-exists";

@singleton()
/**
 * The service is responsible for checking
 * whether the given program is installed on system.
 */
export class ProgramInstalledService {
  check(program: string): boolean {
    return sync(program);
  }
}
// todo: refactor
