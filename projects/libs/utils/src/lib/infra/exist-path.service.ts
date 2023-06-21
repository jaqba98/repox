import { singleton } from "tsyringe";
import { existsSync } from "fs";

@singleton()
/**
 * The service is responsible for checking
 * whether a given path exists in the system.
 */
export class ExistPathService {
  checkExist(path: string): boolean {
    return existsSync(path);
  }
}
// todo: refactor
