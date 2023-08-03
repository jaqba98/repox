import { singleton } from "tsyringe";
import { sync } from "command-exists";

@singleton()
/**
 * The service contains a group of utils to system manage.
 */
export class SystemUtilsService {
  checkProgramExist (program: string): boolean {
    return sync(program);
  }
}
