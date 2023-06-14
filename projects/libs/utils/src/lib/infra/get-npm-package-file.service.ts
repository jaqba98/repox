import { singleton } from "tsyringe";
import { join } from "path";

@singleton()
/**
 * The service is responsible for getting package.json path
 * for npm.
 */
export class GetNpmPackageFileService {
  getPackageJsonPath(): string {
    const path: string = process.argv[1];
    if (path === undefined) {
      throw new Error("Not specified process argv");
    }
    return join(path, "../../../../", "package.json");
  }
}
