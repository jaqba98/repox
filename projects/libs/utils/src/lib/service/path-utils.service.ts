import { singleton } from "tsyringe";
import { join } from "path";

@singleton()
/**
 * The service gives utilities to work with paths.
 */
export class PathUtilsService {
  createPath(pathItems: Array<string>): string {
    return join(...pathItems).replace(/\\/g, '/');
  }
}
