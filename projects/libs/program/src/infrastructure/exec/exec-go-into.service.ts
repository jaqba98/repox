import { singleton } from "tsyringe";
import { chdir } from "process";

@singleton()
/**
 * The service is responsible for go into given folder.
 */
export class ExecGoIntoService {
  exec(folderName: string): void {
    chdir(folderName);
  }
}
// todo: refactor