// Refactored file
import { singleton } from "tsyringe";
import { chdir } from "process";

@singleton()
/**
 * The service is responsible for changing current path
 * to the given path.
 */
export class ChangePathService {
  change(path: string): void {
    chdir(path);
  }
}
