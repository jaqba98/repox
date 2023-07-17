import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The app service is responsible for generate project structure
 * of files and folders.
 */
export class CreateProjectStructureAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  run(): boolean {
    this.simpleMessage.writePlain(
      `Creating a project workspace structure`
    );
    return true;
  }
}
