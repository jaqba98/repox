import { singleton } from "tsyringe";
import { globSync } from "glob";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The service is responsible for real all files from project.
 */
export class ReadProjectFilesService {
  constructor(private readonly pathUtils: PathUtilsService) {
  }

  readFiles(projectPath: string): Array<string> {
    const pattern = `${projectPath}/**/*.ts`;
    const options = { cwd: "./", ignore: ['**/node_modules/**'] };
    return globSync(pattern, options)
      .map(path => this.pathUtils.normalizePath(path));
  }
}
