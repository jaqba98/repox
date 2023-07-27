import { singleton } from "tsyringe";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  run(filePath: string): boolean {
    return true;
  }
}
